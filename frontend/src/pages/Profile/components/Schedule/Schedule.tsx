import ScheduleCard from "./ScheduleCard";

const Schedule = () => {
  return (
 <section className="information-user">
  <div className="information-user-area">
    <div className="information-user-title">
      <h2 className="title">Meus Agendamentos</h2>
    </div>
    <div className="information-user-area-data">
     <div className="warp">
       <ScheduleCard />
       <ScheduleCard />
     </div>

    </div>
  </div>
 </section>
    
  );
};

export default Schedule;