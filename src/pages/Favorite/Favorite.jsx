import React, { useEffect, useState } from "react";
import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
import JobCard from "../../Components/JobCard/JobCard";
import Cookies from "universal-cookie";
import MyFavCard from "../../Components/MyFavCard/MyFavCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";

export default function Favorite() {
  const navigate = useNavigate();
  const [myFavourites, setMyFavourites] = useState([]);
  const cookies = new Cookies();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const { isSingedIn } = useIsLoggedInContext();

  useEffect(() => {
    if (!isSingedIn) {
      toast.warning("Please login first",{autoClose:1000});
      navigate("/signin");
    } else {
      collectData();
    }
    
    async function collectData() {
      try {
        const collectionRef = collection(db, "favourites");
        const q = query(
          collectionRef,
          where("favUserUID", "==", cookies.get("authInfo").uid)
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
        setMyFavourites(dataArray);
      } catch (error) {
        console.log(error);
      }
    }
    
  }, [isDeleteClicked]);

  return (
    <>
      {isSingedIn ? (
        <div
          className="favorite-container"
          style={{ background: "#15365b", minHeight: "70.8vh" }}
          onLoad={ThemeChanger("favorite-container", "className")}
        >
          <h1>My Favorites</h1>
          <div className="jobCards">
            {myFavourites
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((job) => (
                <MyFavCard
                  key={job.createdAt}
                  jobData={job}
                  deleteFunctions={{ isDeleteClicked, setIsDeleteClicked }}
                />
              ))}
          </div>
        </div>
      ) : (
        <h1>No Favourites Added Yet!</h1>
      )}
    </>
  );
}
