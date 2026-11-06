import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { RunningSession } from "~/types/user";
import { getSessionsInPeriod } from "~/utils/stats";
import ChartCard from "../ChartCard/ChartCard";
import "./WeeklyGoal.scss";

type WeeklyGoalProps = {
  sessions: RunningSession[];
  weeklyGoal: number;
  startDate: Date;
};

export default function WeeklyGoal({
  sessions,
  weeklyGoal,
  startDate,
}: WeeklyGoalProps) {
  const done = getSessionsInPeriod(sessions, startDate, 7).length;
  const remaining = Math.max(weeklyGoal - done, 0);

  const data = [
    {
      id: "done",
      name: "réalisées",
      value: done,
      color: "var(--color-blue-100)",
    },
    {
      id: "remaining",
      name: "restants",
      value: remaining,
      color: "var(--color-blue-30)",
    },
  ];

  return (
    <ChartCard
      className="weekly-goal"
      title={
        <>
          x{done}{" "}
          <span className="weekly-goal__goal">
            sur objectif de {weeklyGoal}
          </span>
        </>
      }
      subtitle="Courses hebdomadaire réalisées"
    >
      <div className="weekly-goal__chart">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={40}
              outerRadius={80}
              startAngle={0}
              endAngle={-360}
              stroke="none"
            >
              {data.map(({ id, color }) => (
                <Cell key={id} fill={color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {data.map(({ id, name, value, color }) => (
          <p
            key={id}
            className={`weekly-goal__label weekly-goal__label--${id}`}
          >
            <span style={{ backgroundColor: color }} />
            {value} {name}
          </p>
        ))}
      </div>
    </ChartCard>
  );
}
