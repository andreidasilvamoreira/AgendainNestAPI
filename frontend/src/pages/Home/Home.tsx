import Banner from "../../components/Banner/Banner";
import ChooseDate from "../../components/ChooseDate/ChooseDate";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";
import ServicesOptions from "../../components/ServicesOptions/ServicesOptions";



const Home = () => {
  return (
 <div>
  <NavBar />
  <Banner />
  <ServicesOptions />
  <ChooseDate />
  <Footer />
  
 </div>
    
  );
};

export default Home;