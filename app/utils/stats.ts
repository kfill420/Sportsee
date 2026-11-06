import type { RunningSession } from "~/types/user";

const DAY_LABELS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

export const parseDate = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
};

export const toIsoDate = (date: Date): string => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

const formatDayMonth = (date: Date): string =>
  date.toLocaleDateString("fr-FR", { day: "2-digit", month: "long" });

export const formatShortDate = (date: Date): string =>
  date
    .toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
    .replace("/", ".");

export const formatPeriod = (start: Date, days: number): string =>
  `${formatDayMonth(start)} - ${formatDayMonth(addDays(start, days - 1))}`;

export const formatNumber = (value: number): string =>
  value.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

export const getSessionsInPeriod = (
  sessions: RunningSession[],
  start: Date,
  days: number,
): RunningSession[] => {
  const from = addDays(start, 0);
  const to = addDays(start, days);
  return sessions.filter((session) => {
    const date = parseDate(session.date);
    return date >= from && date < to;
  });
};

export const getTotalDistance = (sessions: RunningSession[]): number =>
  sessions.reduce((total, session) => total + session.distance, 0);

export type WeeklyDistance = {
  label: string;
  distance: number;
  start: Date;
  end: Date;
};

export const getWeeklyDistances = (
  sessions: RunningSession[],
  start: Date,
  weeks = 4,
): WeeklyDistance[] =>
  Array.from({ length: weeks }, (_, index) => {
    const weekStart = addDays(start, index * 7);
    return {
      label: `S${index + 1}`,
      distance: getTotalDistance(getSessionsInPeriod(sessions, weekStart, 7)),
      start: weekStart,
      end: addDays(weekStart, 6),
    };
  });

export type DailyHeartRate = {
  day: string;
  min?: number;
  max?: number;
  average?: number;
};

export const getDailyHeartRates = (
  sessions: RunningSession[],
  start: Date,
): DailyHeartRate[] =>
  Array.from({ length: 7 }, (_, index) => {
    const date = addDays(start, index);
    const day = DAY_LABELS[date.getDay()];
    const rates = getSessionsInPeriod(sessions, date, 1).map(
      (session) => session.heartRate,
    );
    if (rates.length === 0) return { day };

    return {
      day,
      min: Math.min(...rates.map((rate) => rate.min)),
      max: Math.max(...rates.map((rate) => rate.max)),
      average: Math.round(
        rates.reduce((total, rate) => total + rate.average, 0) / rates.length,
      ),
    };
  });

export const startOfWeek = (date: Date): Date =>
  addDays(date, -((date.getDay() + 6) % 7));

export const getLatestSessionDate = (
  sessions: RunningSession[],
): Date | undefined => {
  if (sessions.length === 0) return undefined;
  const latest = sessions.reduce((max, session) =>
    session.date > max.date ? session : max,
  );
  return parseDate(latest.date);
};

export const getTotalDuration = (sessions: RunningSession[]): number =>
  sessions.reduce((total, session) => total + session.duration, 0);

export const getTotalCalories = (sessions: RunningSession[]): number =>
  sessions.reduce((total, session) => total + session.caloriesBurned, 0);

export const getRestDays = (
  sessions: RunningSession[],
  start: Date,
  end: Date,
): number => {
  const days = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  const activeDays = new Set(sessions.map((session) => session.date)).size;
  return Math.max(days - activeDays, 0);
};
