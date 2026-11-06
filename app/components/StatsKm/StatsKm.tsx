import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { RunningSession } from "~/types/user";
import {
  formatNumber,
  formatPeriod,
  formatShortDate,
  getTotalDistance,
  getWeeklyDistances,
  type WeeklyDistance,
} from "~/utils/stats";
import ChartCard from "../ChartCard/ChartCard";
import "./StatsKm.scss";

const WEEKS = 4;

type StatsKmProps = {
  sessions: RunningSession[];
  startDate: Date;
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function StatsKm({
  sessions,
  startDate,
  onPrevious,
  onNext,
}: StatsKmProps) {
  const weeks = getWeeklyDistances(sessions, startDate, WEEKS);
  const total = weeks.reduce((sum, week) => sum + week.distance, 0);
  const average = Math.round(total / WEEKS);
  const maxDistance = Math.max(10, ...weeks.map((week) => week.distance));
  const yMax = Math.ceil(maxDistance / 10) * 10;
  const yTicks = Array.from(
    { length: yMax / 10 + 1 },
    (_, index) => index * 10,
  );

  return (
    <ChartCard
      className="stats-km"
      title={`${average}km en moyenne`}
      subtitle={`Total des kilomètres ${WEEKS} dernières semaines`}
      period={formatPeriod(startDate, WEEKS * 7)}
      onPrevious={onPrevious}
      onNext={onNext}
      legend={[{ label: "Km", color: "var(--color-blue-50)" }]}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={weeks} barSize={14}>
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={{ stroke: "var(--color-grey-40)" }}
          />
          <YAxis
            width={32}
            ticks={yTicks}
            tickCount={10}
            tickLine={false}
            axisLine={{ stroke: "var(--color-grey-40)" }}
          />
          <Tooltip
            cursor={false}
            content={({ active, payload }) => {
              const week: WeeklyDistance | undefined = payload?.[0]?.payload;
              if (!active || !week) return null;
              return (
                <div className="stats-km__tooltip">
                  <span>
                    {formatShortDate(week.start)} au {formatShortDate(week.end)}
                  </span>
                  <strong>{formatNumber(week.distance)} km</strong>
                </div>
              );
            }}
          />
          <Bar dataKey="distance" fill="var(--stats-km-bar)" radius={7} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
