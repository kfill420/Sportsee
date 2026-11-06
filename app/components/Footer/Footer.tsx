import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        <span>©Sportsee</span>
        <span>Tous droits réservés</span>
      </p>
      <ul className="footer__links">
        <li>Conditions générales</li>
        <li>Contact</li>
        <li>
          <img src="/img/icon/logo1.png" alt="" />
        </li>
      </ul>
    </footer>
  );
}
