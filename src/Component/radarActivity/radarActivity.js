import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { getUserPerformance } from '../../services/callAPI';
import { Navigate } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import './radarActivity.css'

function RadarActivity(props) {

    const userId = props.userId.id;

    const [userPerf, setUserPerf] = useState('');
    const [error, setError] = useState(null);
    let formatedUserPerf = [];
  
      useEffect(() => {
        async function getUserPerfOnLoad(id) {
          try {
            if (id) {
          const userData = await getUserPerformance(id);
          setUserPerf(userData)
            }else {
            throw new Error("Aucune donnée disponible.");
        }
          } catch (error) {
            setError(error.message);
          }
        }
    
        getUserPerfOnLoad(userId);
      }, [userId]);
      if (error) return <Navigate to="/Error" />;
      function CustomDatasPerf(props) {
        const labels = {
          1: "Cardio",
          2: "Energie",
          3: "Endurance",
          4: "Force",
          5: "Vitesse",
          6: "Intensité",
        }
    
        if (userPerf) {
          const FormatedSessions = props.data.map((perf) => {
            return {
              valuePerf: parseInt(perf.value),
              kind: parseInt(perf.kind),
              label: labels[perf.kind],
            }
          })
    
          formatedUserPerf = FormatedSessions;
        }
      }
      CustomDatasPerf(userPerf);
  
    return (
      <div id='radar-charts'>
          <ResponsiveContainer height="100%" width="100%" aspect={1}>
              <RadarChart data={ formatedUserPerf } margin={{ top: 0, bottom: 0, left: 25, right: 25}} outerRadius="80%" startAngle={210} endAngle={570}>
                  <PolarGrid radialLines={false}/>
                  <PolarAngleAxis dataKey="label" tickLine={false} axisLine={true} stroke="#FFFFFF"/>
                  <Radar name="valuePerf" dataKey="valuePerf" stroke="transparent" fill="#FF0101" fillOpacity={0.7} />
              </RadarChart>
          </ResponsiveContainer>
      </div>
    )
}

export default RadarActivity
RadarActivity.propTypes = {
    formatedUserPerf: PropTypes.object  
  };