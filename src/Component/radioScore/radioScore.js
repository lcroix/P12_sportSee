import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getUserDetails } from '../../services/callAPI';
import { Navigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './radioScore.css'

function RadioScore(props) {
    const userId = props.userId.id;
    const [userScore, setUserScore] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
      
      async function getUserInfosOnLoad(id) {
          try {
            if (id) {
          const userInfoData = await getUserDetails(id);
          setUserScore(userInfoData.score)
            }
            else {
              throw new Error("Aucune donnée disponible.");
          }
        }catch (error) {
          setError(error.message);
        }
      }
  
      getUserInfosOnLoad(userId)
    }, [userId]);
    if (error) return <Navigate to="/Error" />;

    const CustomLegend = ({ payload }) => (
        <div className="custom-legend">
          <div className="label">{payload[0].payload.value * 100}%</div>
          <div className="label"><p>de votre objectif</p></div>
        </div>
      );

  return (
    <div id='pie-charts'>
        <p>Score</p>
        <ResponsiveContainer width="100%" aspect={1.3}>
        <PieChart width={400} height={400}>
          <Pie data={[
            { name: "score", value: userScore },
            { name: "total", value: 1 - userScore },
          ]} 
          dataKey='value' cx="50%" cy="50%" outerRadius="100%" innerRadius="90%" startAngle={90} endAngle={450} fill="#FF0000">
            <Cell fill="#FF0000" stroke="#FF0000" cornerRadius="50%"/>
            <Cell fill="#FFFFFF" stroke="#FFFFFF" />
          </Pie>
          <Pie
            cx={"50%"}
            cy={"50%"}
            outerRadius={"90%"}
            fill="#FFF"
            data={[{ name: "shadow-circle", value: 100 }]}
            dataKey="value"
          />
          <Legend
            verticalAlign="middle"
            align="center"
            content={CustomLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default RadioScore

RadioScore.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string
};
