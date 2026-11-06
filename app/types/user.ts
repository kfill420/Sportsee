export type HeartRate = {
  min: number;
  max: number;
  average: number;
};

export type RunningSession = {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
};

export type UserInfos = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female";
  profilePicture: string;
  height: number;
  weight: number;
  createdAt: string;
};

export type UserStatistics = {
  totalDistance: number;
  totalSessions: number;
  totalDuration: number;
};

export type UserProfile = {
  weeklyGoal: number;
  userInfos: UserInfos;
  statistics: UserStatistics;
};

export type LoginResponse = {
  token: string;
  userId: string;
};
