import { useEffect, useState, type ChangeEvent } from "react";
import type { Route } from "./+types/home";
import Input from "~/components/Input/Input";
import Button from "~/components/Button/Button";
import { useUser } from "~/context/UserContext";
import styles from "./home.module.scss";
import backgroundImg from "/img/Background picture.png";
import logoWithText from "/img/icon/LogoWithText.png";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sportsee" },
    { name: "description", content: "Bienvenue sur Sportsee" },
  ];
}

export default function Home() {
  const { login, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate("/dashboard", { replace: true });
  }, [isAuthenticated, isLoading, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(form.username, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.formContainer}>
          <img src={logoWithText} alt="Sportsee" className={styles.logo} />
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={styles.title}>Transformez vos stats en résultats</h1>
            <h2 className={styles.subtitle}>Se connecter</h2>
            <Input
              label="Identifiant"
              id="username"
              name="username"
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
            />
            <Input
              label="Mot de passe"
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Connexion…" : "Se connecter"}
            </Button>
            <button type="button" className={styles.forgotPassword}>
              Mot de passe oublié ?
            </button>
            {error && (
              <span role="alert" className={styles.error}>
                {error}
              </span>
            )}
          </form>
        </div>
      </div>
      <div className={styles.right}>
        <img src={backgroundImg} alt="" />
      </div>
    </div>
  );
}
