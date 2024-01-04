import { toast } from "react-toastify";
import { ThemeChanger } from "../../CustomHooks/ThemeChanger";
import "./Contact.css";

export default function Contact() {
  const isValidName = (name) => {
    // Basic check using a regular expression to allow only alphabetical characters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  // Helper function to check valid email format
  const isValidEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignIn = (name, email, message) => {
    if (!email.trim()) {
      toast.warning("Email is required", { autoClose: 1000 });
      return false;
    } else if (!isValidEmail(email)) {
      toast.error("Invalid email format", { autoClose: 1000 });
      return false;
    }

    if (!name.trim() || !isValidName(name)) {
      toast.warning("Name is required", { autoClose: 1000 });
      return false;
    }
    if (!message.trim() || message.slice(0, 2).length < 2) {
      toast.warning("Please write a message!", { autoClose: 1000 });
      return false;
    }

    return true;
  };

  const handleContactMe = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    if (validateSignIn(name, email, message)) {
      toast.success("Your message has been successfully sent", {
        autoClose: 1000,
      });
      e.target.reset()
    }
  };

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
      onLoad={ThemeChanger("contact-main-container", "className")}
    >
      <div
        className="contact-container"
        onLoad={ThemeChanger("contact-container", "className")}
      >
        <h1>Contact Us</h1>
        <p>
          Have questions or suggestions? Reach out to us, and we'll be happy to
          assist you.
        </p>
        <form onSubmit={handleContactMe}>
          <label htmlFor="name">Your Name:</label>
          <input type="text" id="name" name="name" placeholder="Your Name" />

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
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
