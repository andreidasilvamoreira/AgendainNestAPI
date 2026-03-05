import Button from "../Button/Button";
import DropDown from "../DropDown/DropDown";
import "./banner.css";



const Banner = () => {
  return (
  <section className="banner">
    <h2>Agende seu Horário</h2>
    <p>Escolha um serviço e encontre o melhor horário para você.</p>

    <div className="drops-down-position">
      <DropDown></DropDown>
      <DropDown></DropDown>
    </div>
    <Button>Ver Horários Disponiveis</Button>
  </section>
  );
};

export default Banner;