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
            onClick={async () => {
              await handleDelete(jobData);
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
