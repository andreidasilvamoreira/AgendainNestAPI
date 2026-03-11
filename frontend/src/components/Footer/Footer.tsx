import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

import "./footer.css";

const Footer = () => {
  return (
    <section className="menu-align">
      <div className="menu">
        <div >
          <h2 className="titulo-rodape">Fale Conosco</h2>
        </div>
        <nav>
          <ul className="menu-position">
            <li><FaInstagram /></li>
            <li><FaFacebook /></li>
            <li><FaTiktok /></li>
            <li><FaWhatsapp /></li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Footer;