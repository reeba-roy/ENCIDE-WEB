import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutComponent from "./Pages/about/About.jsx";
import EventComponent from "./Pages/events/events";
import Hero from "./Pages/hero/page";
import Loader from "./Pages/loader/page";
import NavComponent from "./Pages/navbar/navbar";
import Practice from "./Pages/Practice/Practice";
import Teams from "./Pages/Teams/teams.jsx";
import LoginForm from "./Pages/login/Login.jsx";
import SignUpForm from "./Pages/signup/SignUp.jsx";
import RegistrationForm from "./Pages/Execom/execom.jsx";
import Dashboard from "./Pages/dashboard/Dashboard.jsx";
import ContactSection from "./Pages/contact-us/ContactSection.jsx";

function App() {
  const [load, setLoad] = useState(true);

  return (
    <Router>
      {load && <Loader />}
      <NavComponent />

      <Routes>
        <Route
          path='/'
          element={
            <>
              <Hero loading={() => setLoad(false)} />
              <AboutComponent />
              <EventComponent />
              <Teams />
              {/* <Practice /> */}
              <ContactSection/>
            </>
          }
        />
        <Route
          path='/login'
          element={<LoginForm onLoad={() => setLoad(false)} />}
        />
        <Route
          path='/signup'
          element={<SignUpForm onLoad={() => setLoad(false)} />}
        />
        <Route
          path='/registration'
          element={<RegistrationForm onLoad={() => setLoad(false)} />}
        />
        <Route
          path='/dashboard'
          element={<Dashboard onLoad={() => setLoad(false)} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
