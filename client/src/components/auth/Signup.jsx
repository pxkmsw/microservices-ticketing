import React, { useState } from 'react';
import { register } from '../../services/authService';

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await await register({ email, password });
      window.location = '/Dashboard';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errObj = {};
        ex.response.data.errors.forEach(error => (errObj[error.field] = error.message));
        setErrors(errObj);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            className={`form-control w-50 ${errors.email && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className={`form-control w-50 ${errors.password && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
