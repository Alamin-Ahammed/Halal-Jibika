import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useThemeContext } from "../../Context/themeContext";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";
import { toast } from "react-toastify";

export default function MyJobPost({ jobData, deleteJobs: {isDeleted,setIsDeleted } }) {
  const { theme } = useThemeContext();
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
        <small>Posted At: {createdAtDateTime}</small>
        <p>Company Name: {companyName}</p>
        <p>Job Position: {jobPosition}</p>
        <div className="detailsBtn">
          <button>Edit Post</button>
        </div>
      </div>
    </div>
  );
}
