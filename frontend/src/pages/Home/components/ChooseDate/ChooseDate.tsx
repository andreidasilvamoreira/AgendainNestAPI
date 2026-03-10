
import Button from "../../../../components/Button/Button";
import "./chooseDate.css";

const ChooseDate = () => {
  return (
    <section className="choose-date-button-position">
      <div className="choose-date-position">
        <div className="choose-date">
          <div>
            <h2 className="title"> Escolha o dia </h2>
            <ul className="choose-date-week">
              <li className="choose-date-day">
                <p>segunda</p>
                <p>1</p>
              </li>
              <li className="choose-date-day">
                <p>terça</p>
                <p>2</p>
              </li>
              <li className="choose-date-day">
                <p>quarta</p>
                <p>3</p>
              </li>
              <li className="choose-date-day">
                <p>quinta</p>
                <p>4</p>
              </li>
              <li className="choose-date-day">
                <p>sexta</p>
                <p>6</p>
              </li>
              <li className="choose-date-day">
                <p>sabado</p>
                <p>6</p>
              </li>
              <li className="choose-date-day">
                <p>domingo</p>
                <p>7</p>
              </li>
            </ul>
          </div>
          <div className="schedule">
            <h2 className="title">horarios disponiveis</h2>
            <ul className="schedule-time">
              <li>10:30</li>
              <li>11:00</li>
              <li>13:00</li>
              <li>13:30</li>
            </ul>
          </div>
        </div>
      </div>
        <Button>Ver Horários Disponiveis</Button>
        
      
    </section>
  );
};

export default ChooseDate;