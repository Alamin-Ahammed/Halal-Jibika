import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "./SignIn.css";
import Cookies from "universal-cookie";
import { auth } from "../../config/firebase-config";
import { toast } from "react-toastify";
import { useIsLoggedInContext } from "../../Context/IsLoggedInContext";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const SignIn = () => {
  const { setIsSingedIn } = useIsLoggedInContext();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Helper function to check valid email format
    const isValidEmail = (email) => {
      // Basic email format validation using a regular expression
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateSignIn = (email, password) => {

      if (!email.trim()) {
        toast.warning("Email is required",{autoClose:1000});
        return false;
      } else if (!isValidEmail(email)) {
        toast.error("Invalid email format",{autoClose:1000});
        return false;
      }

      if (!password.trim()) {
        toast.warning("Password is required",{autoClose:1000});
        return false;
      }

      return true
    };

    if (validateSignIn(email, password)) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const { displayName, email, photoURL, uid } = user;
        cookies.set("authInfo", { displayName, email, photoURL, uid });
        toast.success("Sign in successful!");
        setIsSingedIn(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
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
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />

        <button type="submit">Sign In</button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
      <p style={{ textAlign: "center" }}>Or</p>
      <p style={{ textAlign: "center" }}>Sign In With Google Or Github</p>
      <div className="otherAuthentications">
        <FaGoogle className="fagoogle" onClick={handleGoogleSignIn} />
        <FaGithub className="faGithub" onClick={handleGithubSignIn}/>
      </div>
    </div>
  );
};

export default SignIn;
