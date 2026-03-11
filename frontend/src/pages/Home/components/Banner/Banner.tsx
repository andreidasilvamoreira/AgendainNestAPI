import DropDown from "../../../../components/DropDown/DropDown";
import "./banner.css";




const Banner = () => {
  return (
  <header className="banner">
    <h2>Agende seu Horário</h2>
    <p>Escolha um serviço e encontre o melhor horário para você.</p>

    <div className="drops-down-position">
      <DropDown></DropDown>
      <DropDown></DropDown>
    </div>
  
  </header>
  );
};

export default Banner;