import React from 'react'
import MDashboard from '../components/Dashboard/mentor_dashboard/MDashboard';
import SDashboard from '../components/Dashboard/student_dashboard/SDashboard';
const Home = () => {
  return (
    <div>
      {/* <MDashboard classroom={false}/> */}

      <SDashboard/>
    </div>

  )
}

export default Home;