import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth, storage } from "../../config/firebase-config";
import { toast } from "react-toastify";
import "./SignUp.css";
import Cookies from "universal-cookie";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";

const SignUp = () => {
  const cookies = new Cookies(null);
  const navigate = useNavigate();
  const { isSingedIn, setIsSingedIn } = useIsLoggedInContext();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
      photoURL: "",
    };
    const image = e.target.profileImage.files[0];
    const { fullName, email, password } = userInfo;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Send verification email
      await sendEmailVerification(auth.currentUser);
      toast.warning(
        "Verification email has been sent! you have 30 seconds to verify, otherwise account will be deleted.",
        { autoclose: 1200 }
      );

      // storing image and giving photoURL
      const getPhotoURL = async () => {
        try {
          if (image.type.startsWith("image/")) {
            if (image) {
              const storageRef = ref(
                storage,
                `profile-images/${auth.currentUser.uid}`
              );
              await uploadBytes(storageRef, image);

              const downloadURL = await getDownloadURL(storageRef);
              return downloadURL;
            }
          } else {
            toast.warn("Please choose an image only.");
          }
        } catch (error) {
          console.error("Error uploading image:", error.message);
          toast.error("Error uploading image.");
        }

        return null;
      };

      // Update user profile
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: (await getPhotoURL()) || "",
      });

      // Clear form fields
      e.target.fullName.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.confirmPassword.value = "";

      let reNavigate;
      reNavigate = setInterval(() => {
        signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // navigate if email has been verified
            if (userCredential.user.emailVerified) {
              const { displayName, email, photoURL, uid } = userCredential.user;
              cookies.set("authInfo", { displayName, email, photoURL, uid });
              clearInterval(reNavigate);
              setIsSingedIn(true);
              navigate("/");
            }
          }
        );
      }, 2000);

      setTimeout(() => {
        signInWithEmailAndPassword(auth, email, password).then(
          (userCredential) => {
            // Delete the user account
            if (!userCredential.user.emailVerified) {
              const imageRef = ref(
                storage,
                `profile-images/${auth.currentUser.uid}`
              );
              deleteObject(imageRef);
              userCredential.user.delete();
              clearInterval(reNavigate);
              console.log("account deleted");
            }
          }
        );
      }, 30 * 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" name="fullName" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" />

        <label htmlFor="profileImage">Select Profile Image</label>
        <input
          type="file"
          accept="image/*"
          id="profileImage"
          name="profileImage"
        />

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
