import React from "react";
import './verticalNavBar.css'
import iconZen from '../../assets/icons/zen.png'
import iconSwim from '../../assets/icons/swim.png';
import iconBike from '../../assets/icons/bike.png';
import iconWorkout from '../../assets/icons/workout.png';

function VerticalNavBar() {
    return (
      <div id='NavBar-vertical'>
        <div className='all-btns'>
          <div className='btn-icon'><img src={iconZen} alt="icon Zen" /></div>
          <div className='btn-icon'><img src={iconSwim} alt="icon Swim" /></div>
          <div className='btn-icon'><img src={iconBike} alt="icon bike" /></div>
          <div className='btn-icon'><img src={iconWorkout} alt="icon workout" /></div>
        </div>
        <p>Copiryght, SportSee 2020</p>
      </div>
    )
  }
  
  export default VerticalNavBar