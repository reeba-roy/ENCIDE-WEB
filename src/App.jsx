import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./Pages/hero/page";
import Loader from "./Pages/loader/page";
import NavComponent from "./Pages/navbar/navbar";
import LoginForm from "./Pages/login/Login.jsx";
import SignUpForm from "./Pages/signup/SignUp.jsx";
import RegistrationForm from "./Pages/Execom/execom.jsx";
import ContactSection from "./Pages/contact-us/ContactSection.jsx";
import TeamSection from "./Pages/Teams/TeamSection.jsx";
import AboutComponent from "./Pages/about/About.jsx";
import Footer from "./Pages/Footer/Footer.jsx";
import EventsSection from "./Pages/events/events.jsx";
import PastEventsSection from "./Pages/past-events/PastEvents.jsx";
import Dashboard from "./Pages/dashboard/Dashboard.jsx";

import { AuthContext } from "./contexts/AuthContext.jsx";

function App() {
  const [load, setLoad] = useState(true);

  const { user } = useContext(AuthContext);

  return (
    <Router>
      {load && <Loader />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavComponent />
              <Hero loading={() => setLoad(false)} />
              <AboutComponent />
              <EventsSection />
              <PastEventsSection />
              <TeamSection />
              <ContactSection />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={<LoginForm onLoad={() => setLoad(false)} />}
        />
        <Route
          path="/signup"
          element={<SignUpForm onLoad={() => setLoad(false)} />}
        />
        <Route
          path="/registration"
          element={<RegistrationForm onLoad={() => setLoad(false)} />}
        />
          <Route
            path="/dashboard"
            element={user ? <Dashboard onLoad={() => setLoad(false)} /> : <></>}
          />

      </Routes>
    </Router>
  );
}

export default App;

