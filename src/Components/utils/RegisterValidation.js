export const nameRegex = /^[A-Za-z\s]+$/; // Letters and spaces only
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email format
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Password validation


export const validateFirstName = (value) => {
    if (!nameRegex.test(value)) {
      return "First name can only contain letters and spaces.";
    }
    return "";
  };
  
  export const validateLastName = (value) => {
    if (!nameRegex.test(value)) {
      return "Last name can only contain letters and spaces.";
    }
    return "";
  };
  
  export const validateEmail = (value) => {
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address.";
    }
    return "";
  };
  
  export const validatePassword = (value) => {
    if (!passwordRegex.test(value)) {
      return "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.";
    }
    return "";
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };