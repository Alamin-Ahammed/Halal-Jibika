import React from "react";

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
      <div className="jobCard">
        <h2>{jobTitle}</h2>
        <img src={companyLogo} alt="Company Logo" />
        <p>{companyName}</p>
        <p>{jobPosition}</p>
        <p>{jobDescription}</p>
        <p>{Authoremail}</p>
        <p>{getLocalTimeFromSeconds(timestamp.seconds)}</p>
      </div>
    </div>
  );
}
