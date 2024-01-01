import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import "./About.css";

export default function About() {
  ThemeChanger('about-main-container','className')
  return (
    <div className="about-main-container" style={{background: '#15365b', minHeight: "70.8vh" ,display:'flex',alignItems: 'center',justifyContent:'center'}}>
      <div className="about-container" onLoad={ThemeChanger('about-container','className')}>
        <h1>About Us</h1>
        <p>
          "HALAL JIBIKA" is a platform that simplifies the job application
          process. We believe in hard work, patience, and readiness for
          opportunities.
        </p>
        <p>
          Our mission is to connect job seekers with their dream jobs and make
          the job application process seamless.
        </p>
      </div>
    </div>
  );
}

