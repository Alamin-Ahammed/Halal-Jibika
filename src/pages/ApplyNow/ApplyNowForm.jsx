import React, { useState, useRef } from 'react';
import { useThemeContext } from '../../Context/themeContext';
import './ApplyNowForm.css';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const ApplyNowForm = () => {
  const {state} = useLocation();
  const {jobData:{jobPosition,jobTitle,companyName}} = state;
  const { theme } = useThemeContext();
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    image: null,
    cv: null,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    image: '',
    cv: '',
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    setErrors({
      ...errors,
      [name]: '', // Clear the error message when the user starts typing or selects a file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation here
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, you can proceed with form submission
    toast.success('Form submitted successfully!', { autoClose: 1000 });
    console.log('Form submitted:', formData);

    // Reset form fields after successful submission
    setFormData({
      name: '',
      email: '',
      image: null,
      cv: null,
    });

    // Clear the file input using useRef
    if (imageInputRef.current && imageInputRef.current.value) {
      imageInputRef.current.value = '';
      fileInputRef.current.value = '';
    }
  };

  const validateForm = (data) => {
    // Returning an object with error messages for invalid fields
    let errors = {};

    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    // email validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div
      className="apply-now-container"
      style={theme === 'dark' ? { color: '#fff' } : { color: '#000' }}
    >
      <h1 className="apply-now-heading">Please Fill This Form To Apply</h1>
      <p>At {companyName} as {jobPosition}</p>
      <small>JobTitle: {jobTitle}</small>
      <br />
      <form className="apply-now-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <span className="error-message">{errors.name}</span>
          )}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            accept=".jpg"
            name="image"
            onChange={handleInputChange}
            ref={imageInputRef}
          />
          <i style={{ color: '#ba0f0f', fontSize: '0.8rem' }}>
            ( image type must be .jpg )
          </i>
          {errors.image && (
            <span className="error-message">{errors.image}</span>
          )}
        </div>

        <div className="form-group">
          <label>CV (PDF):</label>
          <input
            type="file"
            accept=".pdf"
            name="cv"
            onChange={handleInputChange}
            ref={fileInputRef}
          />
          {errors.cv && <span className="error-message">{errors.cv}</span>}
        </div>

        <div>
          <button type="submit" className="submit-button">
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyNowForm;
