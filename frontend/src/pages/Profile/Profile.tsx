import History from "./components/History/History";
import InformationUser from "./components/InformationUser/InformationUser";
import Schedule from "./components/Schedule/Schedule";

const Profile = () => {
  return (
 <div className="full-height">
  <InformationUser />
  <Schedule />
  <History />
 </div>
    
  );
};

export default Profile;