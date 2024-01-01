import "./Home.css";
import hero from "../../assets/heroImage.webp";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../Context/themeContext";
export default function Home() {
  const { theme } = useThemeContext();
  return (
    <div
      style={{
        minHeight: "90vh",
        backgroundColor: theme === "dark" ? "#15365b" : "#fff",
      }}
    >
      <div className="hero-container">
        <div className="banner">
          <h1>Your Dream Job Awaits</h1>
          <p style={{ color: theme === "dark" ? "#fff" : "#15365b" }}>
            Explore various types of jobs and apply for your desired positions.
          </p>
          <Link
            className="explore-btn"
            to="/jobs"
            style={{
              backgroundColor: theme === "dark" && "#fff",
              color: theme === "dark" ? "#15365b" : "#f58020",
            }}
          >
            Explore Now
          </Link>
        </div>
        <img className="banner-img" src={hero} alt="Banner" />
      </div>

      <div className="latest-job">
        <div className="heading">
          <h1>Latest Jobs</h1>
          <p>Here are the top five latest jobs.</p>
        </div>
        <div className="all-new-jobs">
          <div>
            <div className="newJobs-container">
              <div className="newJobs-details">
            <i className="posted-time">Posted: 12s ago</i>
                <h1>Latest Jobs 1</h1>
                <h5>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.amet
                  consectetur adipisicing elit.
                </h5>
              </div>
              <div>
                <button>See Details</button>
              </div>
            </div>
          </div>

          <div style={{ margin: "5rem 0 2rem 0", textAlign: "center" }}>
            <Link to="/jobs">
              <button>Explore All</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
