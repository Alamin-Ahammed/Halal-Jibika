import React, { useState } from "react";
import { useThemeContext } from "../../Context/themeContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Jobs.css";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function Jobs() {
  const { theme, setTheme } = useThemeContext();
  const [isPostClicked, setIsPostClicked] = useState(false);

  const handlePostJob = () => {
    setIsPostClicked(!isPostClicked);
  };

  const handleJobPostSubmition = async (e) => {
    const cookies = new Cookies();
    const {uid,email} = cookies.get("authInfo");
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
        toast.success('Job posted successfully!')
        // clear form
        e.target.reset();
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  

  return (
    <div
      style={{
        background: theme === "dark" ? "#15365b" : "#fff",
        minHeight: "70.8vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="post-jobs-container">
        <button className="post-job" onClick={handlePostJob}>
          Post A Job
        </button>
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
      <div className="all-jobs-container">
        <h1>All Jobs</h1>
        <div className="jobCards">
          <div className="jobCard">

          </div>
        </div>
      </div>
    </div>
  );
}
