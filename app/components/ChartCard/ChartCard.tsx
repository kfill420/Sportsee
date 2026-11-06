import ChevronButton from "../Button/ChevronButton";
import "./ChartCard.scss";

type ChartCardProps = {
  title: React.ReactNode;
  subtitle: string;
  period?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  legend?: { label: string; color: string }[];
  className?: string;
  children: React.ReactNode;
};

export default function ChartCard({
  title,
  subtitle,
  period,
  onPrevious,
  onNext,
  legend,
  className,
  children,
}: ChartCardProps) {
  return (
    <section className={className ? `chart-card ${className}` : "chart-card"}>
      <header className="chart-card__header">
        <div>
          <h3 className="chart-card__title">{title}</h3>
          <p className="chart-card__subtitle">{subtitle}</p>
        </div>
        {period && (
          <div className="chart-card__period">
            <ChevronButton
              direction="left"
              aria-label="Période précédente"
              onClick={onPrevious}
            />
            <span>{period}</span>
            <ChevronButton aria-label="Période suivante" onClick={onNext} />
          </div>
        )}
      </header>
      {children}
      {legend && (
        <ul className="chart-card__legend">
          {legend.map(({ label, color }) => (
            <li key={label}>
              <span
                className="chart-card__legend-dot"
                style={{ backgroundColor: color }}
              />
              {label}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
