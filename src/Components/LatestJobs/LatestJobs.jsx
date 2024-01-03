import React from "react";
import { TimeDelayCalculation } from "../../CustomHooks/TimeDelayCalculation";
import './LatestJobs.css'
import { useNavigate } from "react-router-dom";

export default function LatestJobs({ jobData }) {
  const navigate = useNavigate();
  const {
    createdAt,
    companyLogo,
    companyName,
    jobPosition,
    jobTitle,
    jobDescription,
  } = jobData;

  const handleSeeDetails = (CurrentJobDetail) => {
    navigate("/ShowDetailsOfAJob", { replace: true, state: { jobData } });
  };
  return (
    <div className="latestJobsParent">
      <div className="newJobs-details">
        <i className="posted-time">Posted: {TimeDelayCalculation(createdAt)}</i>
        <h1>Latest Jobs 1</h1>
        <h5>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.amet
          consectetur adipisicing elit.
        </h5>
      </div>
      <div>
        <button onClick={()=> handleSeeDetails(jobData)}>See Details</button>
      </div>
    </div>
  );
}

/**
 * {
    "Authoremail": "ahammedalamin420@gmail.com",
    "companyName": "Ahammed Coporate",
    "timestamp": {
        "seconds": 1704214708,
        "nanoseconds": 758000000
    },
    "Authoruid": "wWN4yP8PQrUUevtygglOhZKT07c2",
    "companyLogo": "https://images.unsplash.com/photo-1562307534-a03738d2a81a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "jobDescription": "asdfsadf sa fasdfh sfhskjh afksnf khaskjfhklsflk hsiof m,s.nfikhaw saoi fksadhn fiofknsdoflskajfiopjljio hfok ,ksaokfjsdoifoi f",
    "jobPosition": "Senior",
    "jobTitle": "Need A Java Developer",
    "createdAt": 1704214708974
}
 */
