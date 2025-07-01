import React from "react";

const LoginForm = () => {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input 
        type="email" 
        placeholder="Email" 
        style={styles.input} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        style={styles.input} 
      />
      <button type="submit" style={styles.button}>SIGN IN</button>
    </form>
  );
};

const styles = {
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    color: 'black',  // input text color black
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default LoginForm;
