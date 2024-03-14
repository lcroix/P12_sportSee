import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getUserDetails } from '../../services/callAPI';
import energyIcon from '../../assets/icons/energy.svg'
import chickenIcon from '../../assets/icons/chicken.svg'
import appleIcon from '../../assets/icons/apple.svg'
import cheeseburgerIcon from '../../assets/icons/cheeseburger.svg'
import './recap.css'

function Recap(props) {
    const userId = props.userId.id;
    
    const [calorieCount, setCalorieCount] = useState('');
    const [proteinCount, setProteinCount] = useState('');
    const [carbohydrateCount, setCarbohydrateCount] = useState('');
    const [lipidCount, setLipidCount] = useState('');
    let icon = '';
    let iconAlt = '';
    let valueLabel = '';

      useEffect(() => {
        async function getUserInfosOnLoad(id) {
          const userInfoData = await getUserDetails(id);
          setCalorieCount(userInfoData.keyData.calorieCount);
          setProteinCount(userInfoData.keyData.proteinCount);
          setCarbohydrateCount(userInfoData.keyData.carbohydrateCount);
          setLipidCount(userInfoData.keyData.lipidCount);
        }
    
        getUserInfosOnLoad(userId)
      }, []);

    if ( props.type === "Calories") {
        icon = energyIcon;
        iconAlt= 'icon calories';
        valueLabel = calorieCount + 'KCal'
    } else if( props.type === "Proteines" ) {
        icon = chickenIcon;
        iconAlt= 'icon proteines';
        valueLabel = proteinCount + 'g'
    } else if( props.type === "Glucides" ) {
        icon = appleIcon;
        iconAlt= 'icon glucides';
        valueLabel = carbohydrateCount + 'g'
    } else if( props.type === "Lipides" ) {
        icon = cheeseburgerIcon;
        iconAlt= 'icon lipides';
        valueLabel = lipidCount + 'g'
    }

  return (
    <div id='Recap'>
        <div className={'icon-'+props.type}>
            <img src={ icon } alt={ iconAlt } />
        </div>
        <div className='Recap-desc'>
            <p className='Recap-desc-value'>{ valueLabel }</p>
            <p className='Recap-desc-title'>{ props.type }</p>
        </div>
    </div>
  )
}
export default Recap

Recap.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.object,
  iconAlt: PropTypes.string,
  valueLabel: PropTypes.string,
};