import React, { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';

const Signout = () => {
  const { exec } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => window.location = '/Signin',
  });

  useEffect(() => {
    exec();
  }, []);
  return <div>Signing out ...</div>;
};

export default Signout;
