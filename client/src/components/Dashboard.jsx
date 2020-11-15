import React from 'react';
import { getCurrentUser } from '../services/authService';

const Dashboard = () => {
  return (
    <div>
      <h1>You are {getCurrentUser() ? '' : 'not'} signed in.</h1>
    </div>
  );
};

export default Dashboard;
