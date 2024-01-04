import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../Context/themeContext";
import { Link } from "react-router-dom";
import { db } from "../../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";
import Cookies from "universal-cookie";
import MyJobPost from "../../Components/MyJobPost/MyJobPost";
import "./MyJobPosts.css";

export default function MyJobPosts() {
  const { theme } = useThemeContext();
  const [myJobPost, setMyJobPost] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const { isSingedIn } = useIsLoggedInContext();
  const cookies = new Cookies();

  useEffect(() => {
    if (!isSingedIn) {
      toast.warning("Please login first", { autoClose: 1000 });
      navigate("/signin");
    } else {
      collectData();
    }

    async function collectData() {
      try {
        const collectionRef = collection(db, "allJobs");
        const q = query(
          collectionRef,
          where("Authoruid", "==", cookies.get("authInfo").uid)
        );

        const querySnapshot = await getDocs(q);

        // you can query the collection to get the data of the document
        const dataArray = [];
        querySnapshot.forEach((doc) => {
          dataArray.push({
            ...doc.data(),
            uniqueID: cookies.get("authInfo").uid + doc.data().createdAt,
          });
        });
        setMyJobPost(dataArray);
      } catch (error) {
        console.log(error);
      }
    }
  }, [isDeleted]);

  // console.log(myJobPost)

  return (
    <div
      style={{
        minHeight: "90vh",
        backgroundColor: theme === "dark" ? "#15365b" : "#fff",
      }}
    >
      <div>
        <div
          className="myjobpost-container"
          style={{ color: theme === "dark" ? "#fff" : "#15365b" }}
        >
          <h1>My Job Posts</h1>
          <p>Here are the Job Posts you have created.</p>

          <div className="myJobs">
            {myJobPost.length === 0 ? <h2 style={{textAlign:"center",paddingTop:"10px"}}>No Job Posted Yet.</h2> :myJobPost.map((job) => (
              <MyJobPost key={job.createdAt} jobData={job} deleteJobs={{isDeleted,setIsDeleted}} />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
