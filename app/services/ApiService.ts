import type { LoginResponse, RunningSession, UserProfile } from "~/types/user";
import { parseDate } from "~/utils/stats";
import {
  mapRunningSession,
  mapUserInfo,
  type ApiRunningSession,
  type ApiUserInfo,
} from "./mappers";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const MOCK_URL = "/mocks";

const DEFAULT_ERRORS: Record<number, string> = {
  0: "Impossible de contacter le serveur.",
  400: "La requête est invalide.",
  401: "Votre session a expiré, veuillez vous reconnecter.",
  403: "Votre session n'est plus valide, veuillez vous reconnecter.",
  404: "Les données demandées sont introuvables.",
  500: "Le serveur a rencontré une erreur, veuillez réessayer plus tard.",
};

const LOGIN_ERRORS: Record<number, string> = {
  400: "Veuillez renseigner votre identifiant et votre mot de passe.",
  401: "Identifiant ou mot de passe incorrect.",
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, messages: Record<number, string> = {}) {
    super(
      messages[status] ?? DEFAULT_ERRORS[status] ?? "Une erreur est survenue.",
    );
    this.name = "ApiError";
    this.status = status;
  }
}

export const isAuthError = (error: unknown): boolean =>
  error instanceof ApiError && (error.status === 401 || error.status === 403);

async function request<T>(
  url: string,
  init?: RequestInit,
  messages?: Record<number, string>,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, init);
  } catch {
    throw new ApiError(0, messages);
  }

  if (!res.ok) throw new ApiError(res.status, messages);
  return res.json();
}

const authHeaders = (token: string) => ({ Authorization: `Bearer ${token}` });

const filterMockSessions = (
  sessions: RunningSession[],
  startWeek: string,
  endWeek: string,
): RunningSession[] => {
  const startDate = parseDate(startWeek);
  const endDate = parseDate(endWeek);
  const now = new Date();

  return sessions
    .filter((session) => {
      const sessionDate = parseDate(session.date);
      return (
        sessionDate >= startDate && sessionDate <= endDate && sessionDate <= now
      );
    })
    .sort((a, b) => a.date.localeCompare(b.date));
};

export const ApiService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    if (!username || !password) throw new ApiError(400, LOGIN_ERRORS);

    if (USE_MOCK) {
      return request<LoginResponse>(`${MOCK_URL}/login.json`);
    }

    return request<LoginResponse>(
      `${API_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
      LOGIN_ERRORS,
    );
  },

  async getUserInfo(token: string): Promise<UserProfile> {
    const url = USE_MOCK ? `${MOCK_URL}/userinfo.json` : `${API_URL}/user-info`;
    const data = await request<ApiUserInfo>(url, {
      headers: authHeaders(token),
    });
    return mapUserInfo(data);
  },

  async getUserActivity(
    token: string,
    startWeek: string,
    endWeek: string,
  ): Promise<RunningSession[]> {
    if (USE_MOCK) {
      const data = await request<ApiRunningSession[]>(
        `${MOCK_URL}/useractivity.json`,
      );
      return filterMockSessions(
        data.map(mapRunningSession),
        startWeek,
        endWeek,
      );
    }

    const url = new URL(`${API_URL}/user-activity`, window.location.origin);
    url.searchParams.append("startWeek", startWeek);
    url.searchParams.append("endWeek", endWeek);

    const data = await request<ApiRunningSession[]>(url.toString(), {
      headers: authHeaders(token),
    });
    return data.map(mapRunningSession);
  },
};
