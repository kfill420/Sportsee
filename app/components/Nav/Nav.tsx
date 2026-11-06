import { NavLink, useNavigate } from "react-router";
import { useUser } from "~/context/UserContext";
import "./Nav.scss";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/profile", label: "Mon profil" },
];

export default function Nav() {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="nav" aria-label="Menu principal">
      <ul className="nav__list">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="nav__logout">
          <button type="button" className="nav__link" onClick={handleLogout}>
            Se déconnecter
          </button>
        </li>
      </ul>
    </nav>
  );
}
