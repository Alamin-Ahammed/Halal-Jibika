import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { useThemeContext } from "../../Context/themeContext";
import "./ShowDetailsOfAJob.css";
import { useAddToFav } from "../../CustomHooks/useAddToFav";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export default function ShowDetailsOfAJob() {
  const [isFavIconClicked, setIsFavIconClicked] = useState(false);
  const [favourites, setFavourites] = useState([]);
  const { state } = useLocation();
  const navigate = useNavigate();
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

  const collectData = useCallback(async () => {
    try {
      const collectionRef = collection(db, 'favourites');
      const q = query(
        collectionRef,
        where('uniqueID', '==', uniqueID)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const firstDoc = querySnapshot.docs[0];
        setFavourites([firstDoc.data()]);
      } else {
        setFavourites([]);
      }
    } catch (error) {
      console.error('Error querying document:', error);
    }
  }, [uniqueID]);

  useEffect(() => {
    collectData();
  }, [isFavIconClicked, collectData,favourites]);

  const handleApplyNow = () => {
    // // this jobData is coming from event handler not from the props
    navigate("/ApplyNow", { replace: true, state: { jobData } });
  }

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
          <MdFavorite
              onClick={() => {
                useAddToFav(jobData);
                setIsFavIconClicked(!isFavIconClicked)
              }}
              className="favIcon"
              style={favourites.find((fav) => fav.uniqueID === uniqueID) ? {color:'red',boxShadow: 'rgba(184, 15, 15,0.7) 0px 8px 24px'} : {color:'rgba(90, 26, 26, 0.8)'}}
            />
        </div>
        <div className="extraDetails">
          <p>{createdAtDateTime}</p>
          <br />
          <h3>Company Name: {companyName}</h3>
          <p className="jobPosition">Job Position: {jobPosition}</p>
          <p className="jobDescription">Job Description: {jobDescription}</p>
          <p>Author Email: {Authoremail}</p>
          <div className="detailsBtn">
            <button onClick={handleApplyNow}>Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
