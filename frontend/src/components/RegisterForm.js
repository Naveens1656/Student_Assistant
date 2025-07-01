import React from "react";

const RegisterForm = () => {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">SIGN UP</button>
    </form>
  );
};

export default RegisterForm;
