import { useState } from "react";
import { useUser } from "~/context/UserContext";
import { useActivity } from "~/hooks/useActivity";
import styles from "./dashboard.module.scss";
import PageLayout from "~/components/PageLayout/PageLayout";
import UserIdentity from "~/components/UserIdentity/UserIdentity";
import Achievement from "~/components/Achievement/Achievement";
import StatsKm from "~/components/StatsKm/StatsKm";
import StatsBpm from "~/components/StatsBpm/StatsBpm";
import WeeklyGoal from "~/components/WeeklyGoal/WeeklyGoal";
import StatCard from "~/components/StatCard/StatCard";
import StatusMessage from "~/components/StatusMessage/StatusMessage";
import { formatNumericDate } from "~/utils/date";
import {
  addDays,
  formatNumber,
  getLatestSessionDate,
  getSessionsInPeriod,
  getTotalDistance,
  getTotalDuration,
  startOfWeek,
} from "~/utils/stats";
import type { Route } from "./+types/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sportsee Tableau de bord" },
    { name: "description", content: "Tableau de bord" },
  ];
}

export default function Dashboard() {
  const { user } = useUser();
  const { sessions, isLoading, error } = useActivity();
  const [kmOffset, setKmOffset] = useState(0);
  const [bpmOffset, setBpmOffset] = useState(0);

  if (!user) return null;

  const currentWeek = startOfWeek(getLatestSessionDate(sessions) ?? new Date());
  const kmStart = addDays(currentWeek, -21 + kmOffset * 28);
  const bpmStart = addDays(currentWeek, bpmOffset * 7);
  const weekSessions = getSessionsInPeriod(sessions, currentWeek, 7);

  return (
    <PageLayout>
      <div className={styles.content}>
        <section className={styles.hero}>
          <UserIdentity userInfos={user.userInfos} />
          <div className={styles.traveled}>
            <span className={styles.traveledLabel}>
              Distance totale parcourue
            </span>
            <Achievement
              sessions={isLoading ? undefined : sessions}
              icon={<img src="/img/icon/achievement.png" alt="" />}
            />
          </div>
        </section>

        {isLoading && (
          <StatusMessage>Chargement de vos performances…</StatusMessage>
        )}

        {error && <StatusMessage variant="error">{error}</StatusMessage>}

        {!isLoading && !error && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                Vos dernières performances
              </h2>
              <div className={styles.grid}>
                <StatsKm
                  sessions={sessions}
                  startDate={kmStart}
                  onPrevious={() => setKmOffset(kmOffset - 1)}
                  onNext={
                    kmOffset < 0 ? () => setKmOffset(kmOffset + 1) : undefined
                  }
                />
                <StatsBpm
                  sessions={sessions}
                  startDate={bpmStart}
                  onPrevious={() => setBpmOffset(bpmOffset - 1)}
                  onNext={
                    bpmOffset < 0
                      ? () => setBpmOffset(bpmOffset + 1)
                      : undefined
                  }
                />
              </div>
            </section>

            <section className={styles.section}>
              <div>
                <h2 className={styles.sectionTitle}>Cette semaine</h2>
                <p className={styles.sectionSubtitle}>
                  Du {formatNumericDate(currentWeek)} au{" "}
                  {formatNumericDate(addDays(currentWeek, 6))}
                </p>
              </div>
              <div className={styles.grid}>
                <WeeklyGoal
                  sessions={sessions}
                  weeklyGoal={user.weeklyGoal}
                  startDate={currentWeek}
                />
                <div className={styles.weekStats}>
                  <StatCard
                    label="Durée d'activité"
                    value={getTotalDuration(weekSessions)}
                    unit="minutes"
                  />
                  <StatCard
                    label="Distance"
                    value={formatNumber(getTotalDistance(weekSessions))}
                    unit="kilomètres"
                    accent="orange"
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </PageLayout>
  );
}
