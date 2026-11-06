import { useUser } from "~/context/UserContext";
import { useActivity } from "~/hooks/useActivity";
import styles from "./profile.module.scss";
import PageLayout from "~/components/PageLayout/PageLayout";
import UserIdentity from "~/components/UserIdentity/UserIdentity";
import ProfileData from "~/components/ProfileData/ProfileData";
import StatusMessage from "~/components/StatusMessage/StatusMessage";
import { formatDate } from "~/utils/date";
import {
  getRestDays,
  getTotalCalories,
  getTotalDistance,
  getTotalDuration,
  parseDate,
} from "~/utils/stats";
import type { Route } from "./+types/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sportsee Profile" },
    { name: "description", content: "Sportsee Profile" },
  ];
}

const formatHeight = (height: number) =>
  `${Math.floor(height / 100)}m${String(height % 100).padStart(2, "0")}`;

export default function Profile() {
  const { user } = useUser();
  const { sessions, isLoading, error } = useActivity();

  if (!user) return null;

  const { userInfos } = user;
  const totalMinutes = getTotalDuration(sessions);

  return (
    <PageLayout>
      <div className={styles.content}>
        <div className={styles.column}>
          <section className={styles.card}>
            <UserIdentity userInfos={userInfos} />
          </section>
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Votre profil</h2>
            <ul className={styles.details}>
              <li>Âge : {userInfos.age}</li>
              <li>Genre : {userInfos.gender}</li>
              <li>Taille : {formatHeight(userInfos.height)}</li>
              <li>Poids : {userInfos.weight}kg</li>
            </ul>
          </section>
        </div>

        <section className={styles.column}>
          <div>
            <h2 className={styles.title}>Vos statistiques</h2>
            <p className={styles.subtitle}>
              depuis le {formatDate(userInfos.createdAt)}
            </p>
          </div>

          {isLoading && (
            <StatusMessage>Chargement de vos statistiques…</StatusMessage>
          )}

          {error && <StatusMessage variant="error">{error}</StatusMessage>}

          {!isLoading && !error && (
            <div className={styles.stats}>
              <ProfileData
                label="Temps total couru"
                value={`${Math.floor(totalMinutes / 60)}h`}
                unit={`${totalMinutes % 60}min`}
              />
              <ProfileData
                label="Calories brûlées"
                value={getTotalCalories(sessions)}
                unit="cal"
              />
              <ProfileData
                label="Distance totale parcourue"
                value={Math.round(getTotalDistance(sessions))}
                unit="km"
              />
              <ProfileData
                label="Nombre de jours de repos"
                value={getRestDays(
                  sessions,
                  parseDate(userInfos.createdAt),
                  new Date(),
                )}
                unit="jours"
              />
              <ProfileData
                label="Nombre de sessions"
                value={sessions.length}
                unit="sessions"
              />
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
}
