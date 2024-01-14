import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import "./JobCard.css";
import { useThemeContext } from "../../Context/themeContext";
import { useNavigate } from "react-router-dom";
import { useAddToFav } from "../../CustomHooks/useAddToFav";
import { auth, db } from "../../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

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
    uniqueID,
    Authoremail,
  } = jobData;

  const [isFavIconClicked, setIsFavIconClicked] = useState(false);
  const [favourites, setfavourites] = useState([]);
  const { theme } = useThemeContext();
  const navigate = useNavigate();

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
    // this jobData is coming from event handler not from the props
    navigate("/ShowDetailsOfAJob", { replace: true, state: { jobData } });
  };

  useEffect(() => {
    async function collectData() {
      try {
        const collectionRef = collection(db, "favourites");
        const q = query(
          collectionRef,
          where("favUserUID", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);

        // you can query the collection to get the data of the document
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
        setfavourites(dataArray);
      } catch (error) {
        console.log(error);
      }
    }

    collectData();
  }, [isFavIconClicked]);
  const handleApplyNow = () => {
    // // this jobData is coming from event handler not from the props
    navigate("/ApplyNow", { replace: true, state: { jobData } });
  }

  return (
    <div>
      <div
        className="jobCard"
        style={{ color: theme === "dark" ? "#fff" : "#000" }}
      >
        <div className="imgAndTitleFav">
          <div className="imgAndTitle">
            <img src={companyLogo} alt="Company Logo" />
            <h2>{jobTitle}</h2>
          </div>
          <div>
            {/*Here is adding to favourites */}
            <MdFavorite
              onClick={async () => {
                try {
                  await useAddToFav({
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
                  });
                  setIsFavIconClicked((prevIsFavIconClicked) => !prevIsFavIconClicked);
                } catch (error) {
                  console.log(error);
                }
              }}
            
              className="favIcon"
              style={
                favourites.find((fav) => fav.uniqueID === uniqueID)
                  ? {
                      color: "red",
                      boxShadow: "rgba(184, 15, 15,0.7) 0px 8px 24px",
                    }
                  : { color: "rgba(90, 26, 26, 0.8)" }
              }
            />
          </div>
        </div>
        <div className="extraDetails">
          <small>
            Posted At: {getLocalTimeFromSeconds(timestamp.seconds || 0)}
          </small>
          <p>Company Name: {companyName}</p>
          <p>Job Position: {jobPosition}</p>
          <div className="detailsBtn">
            <button onClick={handleApplyNow}>Apply Now</button>
            <button
              // here directly passing the values for optimazation purpose
              onClick={() =>
                handleSeeDetails({
                  companyLogo,
                  jobPosition,
                  Authoruid,
                  jobTitle,
                  companyName,
                  jobDescription,
                  createdAtDateTime: getLocalTimeFromSeconds(timestamp.seconds),
                  createdAt,
                  uniqueID: auth.currentUser.uid + createdAt,
                  Authoremail,
                })
              }
            >
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}