import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import "./Contact.css";

export default function Contact() {
  return (
    <div
    className="contact-main-container"
      style={{
        background: "#15365b",
        minHeight: "70.8vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onLoad={ThemeChanger("contact-main-container","className")}
    >
      <div className="contact-container" onLoad={ThemeChanger("contact-container","className")}>
        <h1>Contact Us</h1>
        <p>
          Have questions or suggestions? Reach out to us, and we'll be happy to
          assist you.
        </p>
        <form>
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            required
          />

          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />

          <label htmlFor="message">Your Message:</label>
          <textarea
            id="message"
            name="message"
            placeholder="Type your message here..."
            rows="4"
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
