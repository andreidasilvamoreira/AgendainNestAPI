import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import MainLayout from "./components/MainLayout/MainLayout";
import Profile from "./pages/Profile/Profile";
import Services from "./pages/Services/Services";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
      </Route>
    </Routes>
  );
}

export default App;