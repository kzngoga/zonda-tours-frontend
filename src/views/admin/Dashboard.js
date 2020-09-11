import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/Sidebar';
import StatCard from '../../components/StatCard';

const Dashboard = () => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('ZONDA_TOURS_TOKEN')) {
      return history.push('/');
    }
    return undefined;
  });

  return (
    <div className="wrapper" style={{ backgroundColor: '#f6f5fa' }}>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <main
            role="main"
            className="col-md-9 ml-sm-auto col-lg-10 main-content pb-4"
            style={{ backgroundColor: '#f6f5fa' }}
          >
            <h4 className=" font-weight-bold mt-4" style={{ fontSize: 18 }}>
              Quick Statistics
            </h4>
            <div className="container-fluid mt-5">
              <div className="row">
                <StatCard
                  title="All Buses"
                  count={30}
                  iconHead="fas"
                  icon="user-lock"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
