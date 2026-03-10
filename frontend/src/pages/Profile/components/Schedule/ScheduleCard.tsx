
import Button from "../../../../components/Button/Button";
import "./schedule.css"


const ScheduleCard = () => {
  return (
 <div className="schedule-area">
      <div className="information-user-area-position">
        <p>Manicure</p>
        <p>12/04/2026 as 10:30</p>
        <p> Status: <strong>Confirmado</strong></p>
      </div>
      <div className="information-user-button-position">
        <Button>Cancelar</Button>
      </div>
     

    </div>
    
  );
};

export default ScheduleCard;