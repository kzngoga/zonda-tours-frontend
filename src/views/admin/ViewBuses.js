import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/Sidebar';

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
              All Registered Buses
            </h4>
            <div className="container-fluid mt-5">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Firstname</th>
                      <th scope="col">Lastname</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John</td>
                      <td>Doe</td>
                      <td>john@example.com</td>
                    </tr>
                    <tr>
                      <td>Mary</td>
                      <td>Moe</td>
                      <td>mary@example.com</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
