import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Context/themeContext";
import { FaTrashAlt } from "react-icons/fa";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "./MyFavCard.css";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyFavCard({ jobData, deleteFunctions }) {
  const navigate = useNavigate();
  const {
    jobTitle,
    createdAtDateTime,
    jobDescription,
    companyName,
    Authoremail,
    jobPosition,
    companyLogo,
    uniqueID,
    createdAt,
    Authoruid,
  } = jobData;
  const {isDeleteClicked,setIsDeleteClicked} = deleteFunctions;
  const { theme } = useThemeContext();

  const handleSeeDetails = (jobData) => {
    // its inner jobData variable because we are passing it in another function
    navigate("/ShowDetailsOfAJob", { replace: true, state: { jobData } });
  };

  const handleDelete = async (docToBeAdded) => {
    try {
      const collectionRef = collection(db, "favourites");
      const q = query(
        collectionRef,
        where("uniqueID", "==", docToBeAdded.uniqueID)
      );
      const querySnapshot = await getDocs(q);
      const docRef = doc(collectionRef, querySnapshot.docs[0].id);
      await deleteDoc(docRef);
      toast.success("Removed from favourites!", { autoClose: 1000 });
      setIsDeleteClicked(!isDeleteClicked);
    } catch (error) {
      console.log(error);
      toast.error("Error removing form favorites:", { autoClose: 1000 });
    }
  };

  const handleApplyNow = () => {
    // // this jobData is coming from event handler not from the props
    navigate("/ApplyNow", { replace: true, state: { jobData } });
  }

  return (
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
          <div
            onClick={() => {
              handleDelete(jobData);
              setIsDeleteClicked(!isDeleteClicked);
            }}
          >
            <FaTrashAlt className="faTrash" />
          </div>
        </div>
      </div>
      <div className="extraDetails">
        <small>Posted At: {createdAtDateTime}</small>
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
                createdAtDateTime,
                createdAt,
                uniqueID,
                Authoremail,
              })
            }
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}
/**
 * {
    "favUserUID": "wWN4yP8PQrUUevtygglOhZKT07c2",
    "jobDescription": "Hi Ahammedalamin420,\n\nCongratulations on being a member of the world's #1 creative marketplace! The entire Designhill team welcomes you, and we look forward to having a rewarding association with you for mutual growth! Welcome aboard!\n \t\nAre you ready to get started?\nBefore you begin your journey, here's a quick tour of the different services Designhill offers. You can pick any services below to meet your specific graphic design requirements.\nHire a designer\nPick any of the services given below according to your needs if you want your job to be done by a professional graphic designer:\n\nDesign Contests Design Contests - Best for when you want to crowdsource ideas. All you have to do is fill out a brief and get dozens of custom-made design options to choose from—all this with a 100% money-back guarantee.\nFreelance Jobs Freelance Jobs - Post a job with your requirements, get custom quotes from interested freelancers and hire the right talent for the right price.\nOne To One One-to-one Projects & Creative Services - Under this service, you can directly hire a freelancer by viewing their portfolios and the services they offer. It is a curated collection of pre-defined services that allows you to browse and buy in a few clicks. In addition, you can collaborate with freelancers for a specific period or beyond, chat, and exchange deliverables for the price suiting your budget.",
    "companyName": "Ahammed",
    "Authoruid": "wWN4yP8PQrUUevtygglOhZKT07c2",
    "createdAt": 1704193474077,
    "companyLogo": "https://picsum.photos/200",
    "Authoremail": "ahammedalamin420@gmail.com",
    "createdAtDateTime": "5:04 PM Tue Jan 02 2024",
    "uniqueID": "kr3HfrEjN3XFPmt0Ad5gSQM3g9f21704193474077",
    "jobTitle": "Django develpoer",
    "jobPosition": "Senior"
}
 */

/**
 * for mypost 
 * <div>
  <div
    className="jobCard"
    style={{ color: theme === "dark" ? "#fff" : "#000" }}
  >
    <div className="imgAndTitleFav">
      <div className="imgAndTitle">
        <img src={companyLogo} alt="Company Logo" />
        <h2>{jobTitle}</h2>
      </div>
    </div>
    <div className="extraDetails">
      <small>Posted At: {createdAtDateTime}</small>
      <p>Company Name: {companyName}</p>
      <p>Job Position: {jobPosition}</p>
      <div className="detailsBtn">
        <button>Edit Post</button>
        <button>Delete Post</button>
      </div>
    </div>
  </div>
</div>;
 */
