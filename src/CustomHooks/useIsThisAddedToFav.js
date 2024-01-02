import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";

export async function useIsThisAddedToFav(docToBeChecked) {
  console.log(docToBeChecked)
  
    try {
      const collectionRef = collection(db, "favourites");
      const q = query(
        collectionRef,
        where("uniqueID", "==", docToBeChecked.uniqueID)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return false
      } else {
        console.log('yes it is in')
        return true
      }
      

      // you can query the collection to get the data of the document

      // querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      // });
    } catch (error) {
      toast.error("Error someting is going wrong:");
    }
}

