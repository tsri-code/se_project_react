import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__info">Developed by Sridhar Tiwari</p>
      <p className="footer__copyright">&copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
