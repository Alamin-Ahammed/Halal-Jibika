import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Context/themeContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import JobCard from "../../Components/JobCard/JobCard";
import "./Jobs.css";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const { theme } = useThemeContext();
  const { isSingedIn } = useIsLoggedInContext();
  const [isPostClicked, setIsPostClicked] = useState(false);
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [isNeedRender, setIsNeedRender] = useState(false);

  const handlePostJob = () => {
    setIsPostClicked(!isPostClicked);
  };

  const handleJobPostSubmition = async (e) => {
    const cookies = new Cookies();
    const { uid, email } = cookies.get("authInfo");
    e.preventDefault();
    const job = {
      jobTitle: e.target.jobTitle.value,
      companyLogo: e.target.companyLogo.value,
      companyName: e.target.companyName.value,
      jobPosition: e.target.jobPosition.value,
      jobDescription: e.target.jobDescription.value,
    };

    if (
      job.jobTitle &&
      job.companyLogo &&
      job.companyName &&
      job.jobPosition &&
      job.jobDescription
    ) {
      try {
        const createAtMiliSec = Date.now();
        await addDoc(collection(db, "allJobs"), {
          ...job,
          Authoruid: uid,
          Authoremail: email,
          createdAt: createAtMiliSec,
          timestamp: serverTimestamp(),
          uniqueID: (auth.currentUser.uid || "") + createAtMiliSec,
        });
        toast.success("Job posted successfully!", { autoClose: 1000 });
        setIsPostClicked(!isPostClicked);
        // clear form
        e.target.reset();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }

    setIsNeedRender(!isNeedRender);
  };

  useEffect(() => {
    const allJobsRef = collection(db, "allJobs");
    async function getJobCollections() {
      const querySnapshot = await getDocs(allJobsRef);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push(doc.data());
      });
      setAllJobs(jobs);
    }
    getJobCollections();
  }, [isPostClicked]);

  useEffect(() => {
    if (!isSingedIn) {
      toast.warning("Please login first", { autoClose: 1000 });
      navigate("/signin");
    }
  }, [isSingedIn]);

  return (
    <div
      style={{
        background: theme === "dark" ? "#15365b" : "#fff",
        minHeight: "70.8vh",
      }}
      className="jobs-main-container"
    >
      <div
        className="post-job-container"
        style={{
          border: theme === "dark" ? "1px solid #fff" : "1px solid #15365b",
        }}
      >
        <h2
          className="postJobHeading"
          style={{ color: theme === "dark" ? "#fff" : "#15365b" }}
        >
          Wanna Post A Job? Click Below...
        </h2>
        {isSingedIn ? (
          <button className="post-job" onClick={handlePostJob}>
            Post A Job
          </button>
        ) : (
          "Login to Post A Job!"
        )}
      </div>
      <div className="post-jobs-container">
        {isPostClicked && (
          <div className="form-container">
            <form onSubmit={handleJobPostSubmition}>
              <label htmlFor="jobTitle">Job Title:</label>
              <input type="text" id="jobTitle" name="jobTitle" required />

              <label htmlFor="companyLogo">Company Logo URL:</label>
              <input type="text" id="companyLogo" name="companyLogo" required />

              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" name="companyName" required />

              <label htmlFor="jobPosition">Job Position:</label>
              <select id="jobPosition" name="jobPosition">
                <option value="Intern">Intern</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>

              <label htmlFor="jobDescription">Job Description:</label>
              <textarea id="jobDescription" name="jobDescription" required />

              <button type="submit">Post Job</button>
            </form>
          </div>
        )}
      </div>
      <div
        className="all-jobs-container"
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
      >
        <h1>All Jobs</h1>
        <div className="jobCards">
          {allJobs.length > 0 &&
            allJobs
              .sort((a = 0, b = 0) => b.createdAt - a.createdAt)
              .map((job) => (
                <JobCard
                  key={job.createdAt}
                  jobData={{
                    ...job,
                    uniqueID: (auth.currentUser.uid || "") + job.createdAt,
                  }}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
