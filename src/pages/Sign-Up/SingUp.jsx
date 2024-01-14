import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
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
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

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
    const { fullName, email, password, confirmPassword } = userInfo;

    // Helper function to check valid email format
    const isValidEmail = (email) => {
      // Basic email format validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Function to validate sign-up form
    const validateSignUp = (name, email, password, confirmPassword, image) => {
      const errors = {};
      const isValidName = (name) => {
        // Basic check using a regular expression to allow only alphabetical characters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;
        return nameRegex.test(name);
      };

      console.log(isValidName(name));

      if (!name.trim() || !isValidName(name)) {
        errors.name = "Valid Name is required";
        toast.error("Valid Name is required", { autoClose: 3000 });
        return false;
      }

      if (!email.trim()) {
        errors.email = "Email is required";
        toast.error("Email is required", { autoClose: 3000 });
        return false;
      } else if (!isValidEmail(email)) {
        errors.email = "Invalid email format";
        toast.error("Invalid email format", { autoClose: 3000 });
        return false;
      }

      if (!password.trim()) {
        errors.password = "Password is required";
        toast.error("Password is required", { autoClose: 3000 });
        return false;
      } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
        toast.error("Password must be at least 6 characters", {
          autoClose: 3000,
        });
        return false;
      }

      if (!confirmPassword.trim()) {
        errors.confirmPassword = "Confirm Password is required";
        toast.error("Confirm Password is required", { autoClose: 3000 });
        return false;
      } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
        toast.error("Passwords do not match", { autoClose: 3000 });
        return false;
      }

      if (!image) {
        errors.image = "Image is required";
        toast.error("Image is required", { autoClose: 3000 });
        return false;
      }

      return true;
    };

    if (!validateSignUp(fullName, email, password, confirmPassword, image)) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Send verification email
      await sendEmailVerification(auth.currentUser);
      toast.warning(
        "Verification email has been sent! you have 60 seconds to verify, otherwise account will be deleted.",
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
      e.target.reset();

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
      }, 60 * 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { displayName, email, photoURL, uid } = user;
      cookies.set("authInfo", { displayName, email, photoURL, uid });
      toast.success('Sign up with Google is Successful!', { autoClose: 1000 });
      setIsSingedIn(true);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const { displayName, email, photoURL, uid } = user;
      cookies.set("authInfo", { displayName, email, photoURL, uid });
      setIsSingedIn(true);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
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
      <p style={{ textAlign: "center" }}>Or</p>
      <p style={{ textAlign: "center" }}>Sign In With Google Or Github</p>
      <div className="otherAuthentications">
        <FaGoogle className="fagoogle" onClick={handleGoogleSignIn} />
        <FaGithub className="faGithub" onClick={handleGithubSignIn}/>
      </div>
    </div>
    </>
  );
};

export default SignUp;
