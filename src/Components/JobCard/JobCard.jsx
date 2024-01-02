import React, { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import "./JobCard.css";
import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import { useThemeContext } from "../../Context/themeContext";
import { useNavigate } from "react-router-dom";
import { useAddToFav } from "../../CustomHooks/useAddToFav";
import { auth, db } from "../../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useIsThisAddedToFav } from "../../CustomHooks/useIsThisAddedToFav";
import { toast } from "react-toastify";

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
  }, [favourites]);

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
            <MdFavorite
              onClick={() => {
                useAddToFav({
                  companyLogo,
                  jobPosition,
                  Authoruid,
                  jobTitle,
                  companyName,
                  jobDescription,
                  createdAtDateTime: getLocalTimeFromSeconds(timestamp.seconds),
                  createdAt,
                  favUserUID: auth.currentUser.uid,
                  uniqueID: auth.currentUser.uid + createdAt,
                  Authoremail,
                });
              }}
              className="favIcon"
              style={{
                color: favourites.find((fav) => fav.uniqueID === uniqueID)
                  ? "red"
                  : "black",
              }}
            />
          </div>
        </div>
        <div className="extraDetails">
          <small>Posted At: {getLocalTimeFromSeconds(timestamp.seconds)}</small>
          <p>Company Name: {companyName}</p>
          <p>Job Position: {jobPosition}</p>
          <div className="detailsBtn">
            <button>Apply Now</button>
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

/**
 * 
        <p className="jobDescription">Job Description: {jobDescription}</p>
        <p>Author Email: {Authoremail}</p>
 */
