import { Link } from "react-router";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>404 Page non trouvée</h1>
      <p className={styles.text}>La page que vous recherchez n'existe pas.</p>
      <Link to="/" className={styles.link}>
        Retourner à l'accueil
      </Link>
    </main>
  );
}
