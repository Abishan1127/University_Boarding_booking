import Home from "./Components/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
// import Universities from "./Components/Universitylists/Universitylist";
import RoomBooking from "./Components/Roombooking/Roombooking";
import Booking from "./Components/Booking/Booking";
import "../src/App.css"

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navigation />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/" element={<Universities />} /> */}
            <Route path="/" element={<Home />} />
   <Route path="/roombooking" element={<RoomBooking />} />
   <Route path="/booking" element={<Booking />} />
           
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;


