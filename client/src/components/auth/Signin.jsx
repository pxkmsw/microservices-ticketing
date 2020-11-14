import React, { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { login } from '../../services/authService';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { exec, errors } = useRequest({
  //   url: '/api/users/signin',
  //   method: 'post',
  //   body: { email, password },
  //   onSuccess: data => (window.location = '/Dashboard'),
  // });

  const onSubmit = async event => {
    event.preventDefault();

    await login({ email, password });

    window.location = '/Dashboard';
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
        <div className="form-group">
          <labal>Email Address</labal>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <labal>Password</labal>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        {/* {errors} */}
        <button className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;
