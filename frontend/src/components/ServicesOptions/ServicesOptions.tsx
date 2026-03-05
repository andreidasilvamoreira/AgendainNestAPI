import CardServices from "../CardServices/CardServices";
import "./servicesOptions.css"

const ServicesOptions = () => {
  return (

<section className="services-options-position">
  <h2 className="title"> Nosso Serviços</h2>
 <div className="services-options">
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />
   <CardServices servico="servico" caminho="*" preco="20" tempo="30"  />

   
 </div>
</section>


  );
};

export default ServicesOptions;