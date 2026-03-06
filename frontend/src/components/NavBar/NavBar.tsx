import Button from "../Button/Button";
import "./navBar.css";

const NavBar = () => {
  return (
    <section className="menu-align">
      <div className="menu">
        <div >
          <h1>SALÃO 10</h1>
        </div>
        <nav>
          <ul className="menu-position">
            <li><a href="/services">Serviços</a></li>
            <li><a href="/home">Agendar</a></li>
            <li><a href="/profile">Perfil</a></li>
            <li><Button>Sair</Button></li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;