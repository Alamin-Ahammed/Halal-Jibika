import React from "react";
import { useLocation } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { useThemeContext } from "../../Context/themeContext";
import './ShowDetailsOfAJob.css'
import { useAddToFav } from "../../CustomHooks/useAddToFav";
import { useIsThisAddedToFav } from "../../CustomHooks/useIsThisAddedToFav";

export default function ShowDetailsOfAJob() {
  // const {id,otherParams} = route.params;
  const { state } = useLocation();
  const { jobData } = state || {};
  const {
    companyLogo,
    jobPosition,
    Authoruid,
    jobTitle,
    companyName,
    jobDescription,
    createdAtDateTime,
    createdAt,
    uniqueID,
    Authoremail,
  } = jobData || {};
  const { theme } = useThemeContext();
  return (
    <div style={{ minHeight: "70.8vh" }}>
      <div
        className="jobCardDetails"
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
      >
        <div className="imgAndTitleFav">
          <div className="imgAndTitle">
            <img src={companyLogo} alt="Company Logo" />
            <h2>{jobTitle}</h2>
          </div>
          <MdFavorite onClick={() => useAddToFav(jobData)} className="favIcon" />
        </div>
        <div className="extraDetails">
          <p>{createdAtDateTime}</p>
          <br />
          <h3>Company Name: {companyName}</h3>
          <p className="jobPosition">Job Position: {jobPosition}</p>
          <p className="jobDescription">Job Description: {jobDescription}</p>
          <p>Author Email: {Authoremail}</p>
          <div className="detailsBtn">
            <button>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
