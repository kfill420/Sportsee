import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import "./PageLayout.scss";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-layout">
      <header className="page-layout__header">
        <img src="/img/icon/LogoWithText.png" alt="Sportsee" />
        <Nav />
      </header>
      <main className="page-layout__main">{children}</main>
      <Footer />
    </div>
  );
}
