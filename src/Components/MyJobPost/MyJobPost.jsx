import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useThemeContext } from "../../Context/themeContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";
import "./MyJobPost.css";

export default function MyJobPost({
  jobData,
  deleteJobs: { isDeleted, setIsDeleted },
}) {
  const { theme } = useThemeContext();
  const {
    jobTitle,
    jobDescription,
    companyName,
    Authoremail,
    jobPosition,
    companyLogo,
    uniqueID,
    createdAt,
    Authoruid,
    timestamp,
  } = jobData;
  const [isEdited, setEdited] = useState(false);

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

  const handleDeleteMyPost = async () => {
    try {
      const collectionRef = collection(db, "allJobs");
      const q = query(collectionRef, where("uniqueID", "==", uniqueID));
      // now delete the doc
      const querySnapshot = await getDocs(q);

      const docRef = doc(collectionRef, querySnapshot.docs[0].id);
      await deleteDoc(docRef);

      const collectionfavJobRef = collection(db, "favourites");
      const favq = query(
        collectionfavJobRef,
        where("uniqueID", "==", uniqueID)
      );

      const querySnapshotfav = await getDocs(favq);

      if (!querySnapshotfav.empty) {
        const favDocRef = doc(collectionfavJobRef, querySnapshotfav.docs[0].id);
        await deleteDoc(favDocRef);
      }
      toast.success("Post Deleted Successfully", { autoClose: 1000 });
    } catch (error) {
      console.log(error);
      toast.error(error.code, { autoClose: 2000 });
    }
  };

  const handleEditPost = () => {
    setEdited(!isEdited);
  };

  const handleUpdateSubmition = async (e) => {
    const jobTitle = e.target.jobTitle.value;
    const jobPosition = e.target.jobPosition.value;
    const jobDescription = e.target.jobDescription.value;
  
    const allJobsQuery = query(
      collection(db, "allJobs"),
      where("uniqueID", "==", uniqueID)
    );
    const favJobsQuery = query(
      collection(db, "favourites"),
      where("uniqueID", "==", uniqueID)
    );
  
    // Fetch data from the queries
    const allJobsSnapshot = await getDocs(allJobsQuery);
    const favJobsSnapshot = await getDocs(favJobsQuery);
  
    // Get the document references from the snapshots
    const updateDocFromAllJobsRef = doc(db, "allJobs", allJobsSnapshot.docs[0]?.id);
    const updateDocFromFavJobsRef = doc(db, "favourites", favJobsSnapshot.docs[0]?.id);
  
    await updateDoc(updateDocFromFavJobsRef, {
      jobTitle,
      jobDescription,
      jobPosition,
    });
  
    await updateDoc(updateDocFromAllJobsRef, {
      jobTitle,
      jobDescription,
      jobPosition,
    });
  };
  

  return (
    <div>
      <div className="imgAndTitleFav">
        <div className="imgAndTitle">
          <img src={companyLogo} alt="Company Logo" />
          <h2>{jobTitle}</h2>
        </div>
        <div>
          <div>
            <FaTrashAlt
              className="faTrash"
              onClick={() => {
                handleDeleteMyPost();
                setIsDeleted(!isDeleted);
              }}
            />
          </div>
        </div>
      </div>
      <div className="extraDetails">
        <small>Posted At: {getLocalTimeFromSeconds(timestamp.seconds)}</small>
        <p>Company Name: {companyName}</p>
        <p>Job Position: {jobPosition}</p>
        <p id="jobDescription">Job Descrtiption : {jobDescription}</p>
        <div className="detailsBtn">
          <button onClick={handleEditPost}>Edit Post</button>
        </div>
        {isEdited && (
          <form onSubmit={handleUpdateSubmition} className="editForm">
            <label htmlFor="jobTitle">Job Title: </label>
            <input type="text" name="jobTitle" />
            <label htmlFor="jobPosition">Job Position:</label>
            <select id="jobPosition" name="jobPosition">
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
            <label htmlFor="jobDescription">Job Description: </label>
            <input type="text" name="jobDescription" />
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}
