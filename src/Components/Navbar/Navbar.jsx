import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { FaBars, FaTimes } from "react-icons/fa";
import { useThemeContext } from "../../Context/themeContext";
import logo3 from "../../assets/logo3.png";
import logo from "../../assets/halal_jibika_logo.png";
import logo2 from "../../assets/halal_jibika_logo.png_1.png";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  const { theme, setTheme } = useThemeContext();
  const { isSingedIn, setIsSingedIn } = useIsLoggedInContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isThreeDotsClicked, setIsThreeDotsClicked] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies(null);
  const { displayName, photoURL, email } = cookies.get("authInfo") || {};

  useEffect(() => {
    const navbar = document.querySelector(".bg-container");
    const navbarContainer = document.querySelector(".navbar-container");
    const allAnchorTags = navbar.querySelectorAll('a, [data-rb="NavLink"]');

    allAnchorTags.forEach((tag) => {
      if (theme === "dark") {
        tag.style.color = "#fff";
        navbarContainer.style.backgroundColor = "#15365b";
        navbar.style.backgroundColor = "#15365b";
      } else {
        tag.style.color = "#f58020";
        navbarContainer.style.backgroundColor = "#fff";
        navbar.style.backgroundColor = "#fff";
      }
    });

    // Set background color based on theme
    document.body.style.backgroundColor = theme === "dark" ? "#15365b" : "#fff";
  }, [theme]);

  const handleHamburgerMenu = () => {
    // const navLinks = document.querySelector(".navLinks");
    // if (!showMenu) {
    //   // navLinks.style.display = "block";
    //   navLinks.style.color = "green";
    // } else {
    //   // navLinks.style.display = "none";
    //   navLinks.style.color = "red";
    // }
    setShowMenu(!showMenu);
  };

  // user now loged in so show the logout option and profile icon
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This function will be called whenever the authentication state changes
      if (user) {
        if (cookies.get("authInfo")) {
          setIsSingedIn(true);
        }
      } else {
        // User is signed out
        toast.dismiss("Signed out successful!");
      }
    });

    // Cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  // signing out here
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        cookies.remove("authInfo");
        toast.info("Sign out successful!");
        setIsSingedIn(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error);
      });
    setIsSingedIn(false);
  };

  return (
    <div className="bg-container">
      <div className="navbar-container">
        <img className="logo" src={logo3} alt="Halal Job" />
        {/* <h1 style={{color: '#f58020',fontSize: '1.5rem'}}>HALAL JIBIKA</h1> */}
        <div className="navbar" onLoad={ThemeChanger("navLinks", "className")}>
          <div className="navLinks">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/favorites">My Favorite</NavLink>
            {isSingedIn && <NavLink to="/myjobpost">My Job Post</NavLink>}
            {!isSingedIn && <NavLink to="/signin">Sign In</NavLink>}
            {!isSingedIn && <NavLink to="/signup">Sign Up</NavLink>}
            {isSingedIn && (
              <BsThreeDotsVertical
                onClick={() => setIsThreeDotsClicked(!isThreeDotsClicked)}
                className="three-dots"
              />
            )}
          </div>

          {/* for small screens */}
          <div className="small-screenLinks">
            {!isSingedIn && (
              <NavLink id="small-screen-signin" to="/signin">
                Sign In
              </NavLink>
            )}
            {!isSingedIn && (
              <NavLink id="small-screen-signup" to="/signup">
                Sign Up
              </NavLink>
            )}
          </div>

          {isSingedIn && isThreeDotsClicked && (
            <div
              className="dropdown"
              style={
                theme === "dark"
                  ? { backgroundColor: "#15365b" }
                  : { backgroundColor: "#fff" }
              }
            >
              {isSingedIn && (
                <div className="profile-container">
                  <div className="profile">
                    <img src={photoURL} alt="logo" />
                  </div>
                  <h5 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                    {displayName}
                  </h5>
                  <i
                    style={{
                      color: theme === "dark" ? "#fff" : "#000",
                      fontSize: "0.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {email}
                  </i>
                </div>
              )}
              {isSingedIn && (
                <button className="signoutBtn" onClick={handleSignOut}>
                  Sign Out
                </button>
              )}
            </div>
          )}

          {theme === "dark" ? (
            <IoIosSunny
              style={{ color: "#f58020", cursor: "pointer", fontSize: "2rem" }}
              onClick={() => setTheme("light")}
            />
          ) : (
            <IoIosMoon
              style={{ color: "#f58020", cursor: "pointer", fontSize: "2rem" }}
              onClick={() => setTheme("dark")}
            />
          )}
          <div className="bars-icon">
            <FaBars
              onClick={handleHamburgerMenu}
              style={{
                color: theme === "dark" ? "#fff" : "#000",
                cursor: "pointer",
                fontSize: "2rem",
              }}
            />
          </div>
          {showMenu && (
            <div
              id="hamburger-menu-small-screen"
              style={
                theme === "dark"
                  ? {
                      backgroundColor: "#15365b",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }
                  : { backgroundColor: "rgba(0,0,0,0.24)" }
              }
            >
              <div className="hamburger-menu-small-screen-profile">
                {isSingedIn && (
                  <div className="profile-container">
                    <div className="profile">
                      <img src={photoURL} alt="logo" />
                    </div>
                    <h6 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                      {displayName}
                    </h6>
                  </div>
                )}
              </div>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/favorites">My Favorite</NavLink>
              {isSingedIn && <NavLink to="/myjobpost">My Job Post</NavLink>}
              {isSingedIn && (
                <button className="signoutBtn" onClick={handleSignOut}>
                  Sign Out
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
