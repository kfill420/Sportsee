import type { RunningSession, UserProfile } from "~/types/user";

export const DEFAULT_WEEKLY_GOAL = 2;
export const DEFAULT_GENDER = "female";

export type ApiUserInfo = {
  profile: {
    firstName: string;
    lastName: string;
    createdAt: string;
    age: number;
    weight: number;
    height: number;
    profilePicture: string;
  };
  statistics: {
    totalDistance: string | number;
    totalSessions: number;
    totalDuration: number;
  };
};

export type ApiRunningSession = {
  date: string;
  distance: number | string;
  duration: number | string;
  heartRate: {
    min: number | string;
    max: number | string;
    average: number | string;
  };
  caloriesBurned: number | string;
};

export const mapUserInfo = ({
  profile,
  statistics,
}: ApiUserInfo): UserProfile => ({
  weeklyGoal: DEFAULT_WEEKLY_GOAL,
  userInfos: {
    firstName: profile.firstName,
    lastName: profile.lastName,
    age: Number(profile.age),
    gender: DEFAULT_GENDER,
    profilePicture: profile.profilePicture,
    height: Number(profile.height),
    weight: Number(profile.weight),
    createdAt: profile.createdAt.slice(0, 10),
  },
  statistics: {
    totalDistance: Number(statistics.totalDistance),
    totalSessions: Number(statistics.totalSessions),
    totalDuration: Number(statistics.totalDuration),
  },
});

export const mapRunningSession = (
  session: ApiRunningSession,
): RunningSession => ({
  date: session.date.slice(0, 10),
  distance: Number(session.distance),
  duration: Number(session.duration),
  heartRate: {
    min: Number(session.heartRate.min),
    max: Number(session.heartRate.max),
    average: Number(session.heartRate.average),
  },
  caloriesBurned: Number(session.caloriesBurned),
});
