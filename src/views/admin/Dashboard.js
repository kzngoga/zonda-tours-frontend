import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }
    return undefined;
  });
  return (
    <div>
      <p className="text-center">Welcome to the dashboard</p>
    </div>
  );
};

export default Dashboard;
