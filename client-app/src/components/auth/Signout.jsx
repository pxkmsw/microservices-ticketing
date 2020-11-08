import React, { useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import { logout } from '../../services/authService';
import httpService from '../../services/httpService';

const Signout = () => {
  useEffect(async () => {
    await httpService.post('/api/users/signout', {});
    logout();
    window.location = '/Signin';
  }, []);
  return <div>Signing out ...</div>;
};

export default Signout;
