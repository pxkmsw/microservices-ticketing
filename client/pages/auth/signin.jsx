import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { exec, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: data => Router.push('/'),
  });

  const onSubmit = async event => {
    event.preventDefault();
    await exec();
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
        {errors}
        <button className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
};

export default signin;
