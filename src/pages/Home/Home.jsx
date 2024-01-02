import "./Home.css";
import hero from "../../assets/heroImage.webp";
import { Link } from "react-router-dom";
import { useThemeContext } from "../../Context/themeContext";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
import LatestJobs from "../../Components/LatestJobs/LatestJobs";
export default function Home() {
  const { theme } = useThemeContext();
  const [latestJob, setLatestJob] = useState([]);

  useEffect(() => {
    const allJobsRef = collection(db, "allJobs");
    async function getJobCollections() {
      const querySnapshot = await getDocs(allJobsRef);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      const fiveLatestJobs = jobs
        .sort((a = 0, b = 0) => b.createdAt - a.createdAt)
        .slice(0, 5);
      setLatestJob([...fiveLatestJobs]);
    }
    getJobCollections();
  }, []);

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
              {latestJob.map((job) => {
                return <LatestJobs key={job.createdAt} jobData={{...job}} />;
              })}
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
