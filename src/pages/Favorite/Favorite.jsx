import React, { useEffect, useState } from 'react'
import { ThemeChanger } from '../../CustomHooks/ThemeChanger'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase-config';

export default function Favorite() {
  const [myFavourites,setMyFavourites] = useState([]);
  useEffect(()=> {
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
        setMyFavourites(dataArray);
      } catch (error) {
        console.log(error);
      }
    }

    collectData();
  },[myFavourites])
  return (
    <div className="favorite-container" style={{background: '#15365b', minHeight: "70.8vh" ,display:'flex',alignItems: 'center',justifyContent:'center'}} onLoad={ThemeChanger("favorite-container","className")}>
        <h1>Favorite</h1>
    </div>
  )
}
