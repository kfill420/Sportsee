import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { RunningSession } from "~/types/user";
import {
  formatPeriod,
  getDailyHeartRates,
  getSessionsInPeriod,
} from "~/utils/stats";
import ChartCard from "../ChartCard/ChartCard";
import "./StatsBpm.scss";

const DAYS = 7;
const DEFAULT_DOMAIN = [130, 190];

type StatsBpmProps = {
  sessions: RunningSession[];
  startDate: Date;
  onPrevious?: () => void;
  onNext?: () => void;
};

export default function StatsBpm({
  sessions,
  startDate,
  onPrevious,
  onNext,
}: StatsBpmProps) {
  const weekSessions = getSessionsInPeriod(sessions, startDate, DAYS);
  const days = getDailyHeartRates(weekSessions, startDate);

  const average = weekSessions.length
    ? Math.round(
        weekSessions.reduce(
          (total, session) => total + session.heartRate.average,
          0,
        ) / weekSessions.length,
      )
    : 0;

  const domain = weekSessions.length
    ? [
        Math.min(...weekSessions.map((session) => session.heartRate.min)) - 10,
        Math.max(...weekSessions.map((session) => session.heartRate.max)) + 5,
      ]
    : DEFAULT_DOMAIN;

  return (
    <ChartCard
      className="stats-bpm"
      title={`${average} BPM`}
      subtitle="Fréquence cardiaque moyenne"
      period={formatPeriod(startDate, DAYS)}
      onPrevious={onPrevious}
      onNext={onNext}
      legend={[
        { label: "Min", color: "var(--color-orange-30)" },
        { label: "Max BPM", color: "var(--color-orange-100)" },
        { label: "Moy BPM", color: "var(--color-blue-100)" },
      ]}
    >
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={days} barSize={12} barGap={4}>
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={{ stroke: "var(--color-grey-40)" }}
          />
          <YAxis
            width={32}
            domain={domain}
            tickCount={4}
            tickLine={false}
            axisLine={false}
          />
          <Bar dataKey="min" fill="var(--color-orange-30)" radius={6} />
          <Bar dataKey="max" fill="var(--color-orange-100)" radius={6} />
          <Line
            type="monotone"
            dataKey="average"
            stroke="var(--stats-bpm-line)"
            strokeWidth={2}
            dot={{ r: 3, fill: "var(--color-blue-100)", stroke: "none" }}
            activeDot={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
