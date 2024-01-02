import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Context/themeContext";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import JobCard from "../../Components/JobCard/JobCard";
import "./Jobs.css";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
  const { theme, setTheme } = useThemeContext();
  const { isSingedIn, setIsSingedIn } = useIsLoggedInContext();
  const [isPostClicked, setIsPostClicked] = useState(false);
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const {
    companyLogo,
    jobPosition,
    Authoruid,
    jobTitle,
    companyName,
    jobDescription,
    timestamp,
    createdAt,
    Authoremail,
  } = allJobs;

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
        const docRef = await addDoc(collection(db, "allJobs"), {
          ...job,
          Authoruid: uid,
          Authoremail: email,
          createdAt: Date.now(),
          timestamp: serverTimestamp(),
        });
        toast.success("Job posted successfully!");
        setIsPostClicked(!isPostClicked);
        // clear form
        e.target.reset();
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
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

  useEffect(()=> {
    if (!isSingedIn) {
    navigate("/signin")
    }
  },[isSingedIn])

  return (
    <div
      style={{
        background: theme === "dark" ? "#15365b" : "#fff",
        minHeight: "70.8vh",
      }}
      className="jobs-main-container"
    >
      <div className="post-jobs-container">
        {isSingedIn ? (
          <button className="post-job" onClick={handlePostJob}>
            Post A Job
          </button>
        ) : (
          'Login to Post A Job!'
        )}
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
          {allJobs.map((job) => (
            <JobCard key={job.createdAt} jobData={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
