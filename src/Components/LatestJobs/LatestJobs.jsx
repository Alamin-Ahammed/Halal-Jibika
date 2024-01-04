import React from "react";
import { TimeDelayCalculation } from "../../CustomHooks/TimeDelayCalculation";
import "./LatestJobs.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

export default function LatestJobs({ jobData }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const isLoggedIn = cookies.get("authInfo");
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

  const handleSeeDetails = (jobData) => {
    // its inner jobData variable because we are passing it in another function
    if (isLoggedIn) {
      navigate("/ShowDetailsOfAJob", { replace: true, state: { jobData } });
    }
  };
  return (
    <div className="latestJobsParent">
      <div className="newJobs-details">
        <i className="posted-time">Posted: {TimeDelayCalculation(createdAt)}</i>
        <h1>{jobTitle}</h1>
        <h5>{jobDescription.slice(0, 40) + "......."}</h5>
      </div>
      <div>
        <button
          onClick={() =>
            isLoggedIn
              ? handleSeeDetails({
                  companyLogo,
                  jobPosition,
                  Authoruid,
                  jobTitle,
                  companyName,
                  jobDescription,
                  createdAtDateTime: getLocalTimeFromSeconds(
                    timestamp.seconds || 0
                  ),
                  createdAt,
                  favUserUID: auth.currentUser.uid,
                  uniqueID: auth.currentUser.uid + createdAt,
                  Authoremail,
                })
              : toast.warning("Please Sign In To See Details!", {
                  autoClose: 1000,
                })
          }
        >
          See Details
        </button>
      </div>
    </div>
  );
}
