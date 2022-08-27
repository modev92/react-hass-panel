import React from 'react';
import Card from './components/Card';
import useLight from './hass/useLight';

const Dashboard = () => {
  const light = useLight('light.seitenlicht');

  return (
    <Card>
      <h1>Test Switch with Metering</h1>
      {light?.state}
      <button onClick={light?.service?.toggle}>toggle</button>
    </Card>
  );
};

export default Dashboard;
