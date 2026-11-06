import "./StatCard.scss";

type StatCardProps = {
  label: string;
  value: React.ReactNode;
  unit: string;
  accent?: "blue" | "orange";
};

export default function StatCard({
  label,
  value,
  unit,
  accent = "blue",
}: StatCardProps) {
  return (
    <div className={`stat-card stat-card--${accent}`}>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value">
        {value} <span className="stat-card__unit">{unit}</span>
      </p>
    </div>
  );
}
