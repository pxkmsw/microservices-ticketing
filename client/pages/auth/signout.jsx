import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const signout = () => {
  const { exec } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    exec();
  }, []);
  return <div>Signing out ...</div>;
};

export default signout;
