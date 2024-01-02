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
    toast.error("Error adding to favorites:");
  }
}

// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../config/firebase-config";
// import { toast } from "react-toastify";

// export function useAddToFav(docToBeAdded) {
//   async function addToFave() {
//     const collectionRef = collection(db, "favourites");
//     const q = query(collectionRef, where('createdAt', "==", docToBeAdded.createdAt));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//         if (!doc.exists()) {
//             console.log('trying to add doc to favourites')
//             async function add() {
//                 await addDoc(collectionRef, docToBeAdded);
//                 toast.success('Added to favourites!')
//             }
//             add();
//         }else {
//             toast('Already added to favourites!')
//         }
//         console.log(doc.data())
//     })

//   }
//   addToFave();
// }
