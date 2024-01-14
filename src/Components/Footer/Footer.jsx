import {
  FaHome,
  FaBriefcase,
  FaInfoCircle,
  FaEnvelope,
  FaHeart,
  FaUser,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../../assets/halal_jibika_logo.png_1.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";

const Footer = () => {
  const { isSingedIn } = useIsLoggedInContext();
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="Halal Job" />
        </div>
        <div>
          <div className="footer-links">
            <Link to="/">
              <FaHome />
            </Link>
            <Link to="/jobs">
              <FaBriefcase />
            </Link>
            <Link to="/about">
              <FaInfoCircle />
            </Link>
            <Link to="/contact">
              <FaEnvelope />
            </Link>
            <Link to="/favorites">
              <FaHeart />
            </Link>
            {!isSingedIn && (
              <>
                <Link to="/signup">
                  <FaUser />
                </Link>
                <Link to="signout">
                  <FaSignOutAlt />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com/profile.php?id=100092370190637"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Halal Jibika. All Rights Reserved.</p>
      </div>
      <p style={{ fontSize: "0.7rem", opacity: "0.7" }}>
        Developed by: Alamin Ahammed
      </p>
    </div>
  );
};

export default Footer;
