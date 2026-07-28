import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Terrence Tegegne</p>
      <p className="footer__text">{currentYear}</p>
    </footer>
  );
}

export default Footer;
