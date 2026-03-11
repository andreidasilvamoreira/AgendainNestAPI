import Button from "../Button/Button";
import "./cardServices.css"

type CardProps = {
  servico: string;
  tempo: string;
  preco: string;
  caminho: string;
};

const CardServices = ({ servico, tempo, preco, caminho }: CardProps) => {
  return (

<div className="card-services">
  <div className="upper-card">
    <div className="info-card">
      <h2 className="title-card">{servico}</h2>
      <p className="time-card">{tempo} minutos</p>
      <p className="price-card">R$ {preco}</p>
    </div>
    <div>
      <img className="img-card" src={caminho} alt={servico}/>
    </div>
  </div>
  <div className="button-card">
    <Button>Agendar</Button>
  </div>
 
</div>


  );
};

export default CardServices;