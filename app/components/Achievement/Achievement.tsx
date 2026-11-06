import type { RunningSession } from "~/types/user";
import { getTotalDistance } from "~/utils/stats";
import "./Achievement.scss";

type AchievementProps = {
  icon?: React.ReactNode;
  sessions?: RunningSession[];
};

export default function Achievement({ icon, sessions }: AchievementProps) {
  return (
    <div className="achievement">
      {icon}
      {sessions && (
        <span className="achievement__value">
          {Math.round(getTotalDistance(sessions))} km
        </span>
      )}
    </div>
  );
}
