import { useEffect, useState } from "react";
import { useUser } from "~/context/UserContext";
import { ApiService, isAuthError } from "~/services/ApiService";
import type { RunningSession } from "~/types/user";
import { toIsoDate } from "~/utils/stats";

type ActivityState = {
  sessions: RunningSession[];
  isLoading: boolean;
  error: string | null;
};

export function useActivity(): ActivityState {
  const { token, user, logout } = useUser();
  const [sessions, setSessions] = useState<RunningSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !user) return;

    let ignore = false;
    setIsLoading(true);
    setError(null);

    ApiService.getUserActivity(
      token,
      user.userInfos.createdAt,
      toIsoDate(new Date()),
    )
      .then((data) => {
        if (!ignore) setSessions(data);
      })
      .catch((err) => {
        if (ignore) return;
        if (isAuthError(err)) {
          logout();
          return;
        }
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue.",
        );
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [token, user, logout]);

  return { sessions, isLoading, error };
}
