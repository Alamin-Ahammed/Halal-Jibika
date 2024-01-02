import React from "react";
import { MdFavorite } from "react-icons/md";
import "./JobCard.css";
import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import { useThemeContext } from "../../Context/themeContext";

export default function JobCard({ jobData }) {
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
  } = jobData;
  const {theme} = useThemeContext()

  function getLocalTimeFromSeconds(seconds) {
    const time = new Date(seconds * 1000);
    time.toISOString(seconds * 1000);
    const postDateTime =
      time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }) +
      " " +
      time.toDateString();
    return postDateTime;
  }
  return (
    <div>
      <div className="jobCard" style={{color: theme === 'dark' ? '#fff' : '#000'}}>
        <div className="imgAndTitleFav">
          <div className="imgAndTitle">
            <img src={companyLogo} alt="Company Logo" />
            <h2>{jobTitle}</h2>
          </div>
          <MdFavorite className="favIcon" />
        </div>
        <div className="extraDetails">
          <p>Company Name: {companyName}</p>
          <p>Job Position: {jobPosition}</p>
          <p>{getLocalTimeFromSeconds(timestamp.seconds)}</p>
          <div className="detailsBtn">
            <button>Apply Now</button>
            <button>See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 
        <p className="jobDescription">Job Description: {jobDescription}</p>
        <p>Author Email: {Authoremail}</p>
 */
