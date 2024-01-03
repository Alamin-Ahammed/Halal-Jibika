import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { toast } from "react-toastify";

export async function useAddToFav(docToBeAdded) {
  try {
    const collectionRef = collection(db, "favourites");
    const q = query(
      collectionRef,
      where("uniqueID", "==", docToBeAdded.uniqueID)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(collectionRef, docToBeAdded);
      toast.success("Added to favourites!",{autoClose: 1000});
    } else {
      const docRef = doc(collectionRef, querySnapshot.docs[0].id);
      await deleteDoc(docRef)
      toast("Removed from favourites!",{autoClose: 1000});
    }

    // you can query the collection to get the data of the document

    // querySnapshot.forEach((doc) => {
    //   console.log(doc.data());
    // });
  } catch (error) {
    toast.error("Error adding to favorites! Check If need to login", { autoClose: 2000 });
  }
}
