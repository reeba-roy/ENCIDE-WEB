import { useState, useEffect, useContext, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { 
  Home, 
  Info, 
  Calendar, 
  Users, 
  Phone, 
  LayoutDashboard, 
  LogOut, 
  LogIn,
  User
} from "lucide-react";
import "./navbar.css";

function NavComponent() {
  const [scrollDirection, setScrollDirection] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef(null);

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      section?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/login") {
      setActiveSection("login");
    } else if (location.pathname === "/dashboard") {
      setActiveSection("dashboard");
    } else if (location.pathname === "/") {
      const sections = document.querySelectorAll("section");
      const observerOptions = {
        root: null,
        threshold: 0.3,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      sections.forEach((section) => {
        observer.observe(section);
      });

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }
  }, [location]);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setIsScrolling(true);
    setIsAtTop(currentScroll < 20);

    if (currentScroll > lastScrollTop.current) {
      setScrollDirection("down");
    } else {
      setScrollDirection("up");
    }
    lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const handleLogout = () => {
    logout().finally(() => navigate("/"));
  };

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <div
        className={`navbar-container mobile-nav-container ${
          scrollDirection === "up" || !isScrolling
            ? "scrolled-up"
            : "scrolled-down"
        } ${isAtTop ? "at-top" : "scrolled"}`}
      >
        <nav className="MobileNav">
          <Link
            to="/#home"
            className={`mob nav_link ${
              activeSection === "home" ? "active" : ""
            }`}
          >
            <Home className="icons" />
            <p className="icontext">Home</p>
          </Link>
          <Link
            to="/#about"
            className={`mob nav_link ${
              activeSection === "about" ? "active" : ""
            }`}
          >
            <Info className="icons" />
            <p className="icontext">About</p>
          </Link>
          <Link
            to="/#events"
            className={`mob nav_link ${
              activeSection === "events" ? "active" : ""
            }`}
          >
            <Calendar className="icons" />
            <p className="icontext">Events</p>
          </Link>
          <Link
            to="/#team"
            className={`mob nav_link ${
              activeSection === "team" ? "active" : ""
            }`}
          >
            <Users className="icons" />
            <p className="icontext">Team</p>
          </Link>
          <Link
            to="/#contact"
            className={`mob nav_link ${
              activeSection === "contact" ? "active" : ""
            }`}
          >
            <Phone className="icons" />
            <p className="icontext">Contact</p>
          </Link>

          {user ? (
            <Link
              to="/dashboard"
              className={`mob nav_link ${
                activeSection === "dashboard" ? "active" : ""
              }`}
            >
              <User className="icons" />
              <p className="icontext">Profile</p>
            </Link>
          ) : (
            <Link
              to="/login"
              className={`mob nav_link ${
                activeSection === "login" ? "active" : ""
              }`}
            >
              <LogIn className="icons" />
              <p className="icontext">Login</p>
            </Link>
          )}
        </nav>
      </div>

      {/* Desktop Navbar */}
      <div
        className={`navbar-container desktop-nav-container ${
          scrollDirection === "up" || !isScrolling
            ? "scrolled-up"
            : "scrolled-down"
        } ${isAtTop ? "at-top" : "scrolled"}`}
      >
        <nav className="p-4 px-4 navbar sm:px-16 bg-transparent">
          <div className="text-2xl font-bold logo">
            <Link to="/#home" className="transition-all duration-300 hover:opacity-90">
              ENCIDE <span className="bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent font-extrabold tracking-wide">MACE</span>
            </Link>
          </div>
          <ul className="nav_main">
            <li className={activeSection === "home" ? "active" : ""}>
              <Link to="/#home">HOME</Link>
            </li>
            <li className={activeSection === "about" ? "active" : ""}>
              <Link to="/#about">ABOUT</Link>
            </li>
            <li className={activeSection === "team" ? "active" : ""}>
              <Link to="/#team">TEAM</Link>
            </li>
            <li className={activeSection === "contact" ? "active" : ""}>
              <Link to="/#contact">CONTACT</Link>
            </li>
            <li className="nav_btn_item">
              <Link
                to="/#events"
                className={`nav_events_btn ${
                  activeSection === "events" ? "active" : ""
                }`}
              >
                EVENTS
              </Link>
            </li>
            <li className="nav_btn_item">
              {user ? (
                <Link to="/dashboard" className="navbar_profile_btn" title="Dashboard">
                  <User className="w-5 h-5" />
                </Link>
              ) : (
                <Link to="/login" className="navbar_login_btn">
                  <span>LOGIN</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default NavComponent;
