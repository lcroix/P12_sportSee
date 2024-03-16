import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserAverageSessions } from '../../services/callAPI';
import { Navigate } from "react-router-dom";
import './lineSession.css'

function LineSession(props) {
    const userId = props.userId.id;

  const [userAverageSessions, setUserAverageSessions] = useState('');
  const [error, setError] = useState(null);
  let formatedUserAverageSessions = [];

  useEffect(() => {
    async function getUserAverageSessionOnLoad(id) {
      try {
        if (id) {
        const userData = await getUserAverageSessions(id);
        setUserAverageSessions(userData.sessions)
        }
        else {
					throw new Error("Aucune donnée disponible.");
      }
      } catch (error) {
        setError(error.message);
      }
    }

    getUserAverageSessionOnLoad(userId);
  }, [userId]);
  if (error) return <Navigate to="/Error" />;

  function CustomDatas(userSessions) {
    const daysOfTheWeek = {
      1: "L",
      2: "M",
      3: "M",
      4: "J",
      5: "V",
      6: "S",
      7: "D"
    }

    if (userSessions) {
      const FormatedSessions = userSessions.map((session) => {
        return {
          sessionLength: session.sessionLength,
          day: session.day,
          dayLetter: daysOfTheWeek[session.day]
        }
      })


      const sessions = [
        { day: 0, sessionLength: 0, dayLetter : ' ' },
        ...FormatedSessions,
        { day: FormatedSessions.length + 1, sessionLength: FormatedSessions[FormatedSessions.length - 1].sessionLength + 1, dayLetter : ' ' },
      ]

      formatedUserAverageSessions = sessions;
    }
  }
  CustomDatas(userAverageSessions);

  const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p className="label">{`${payload[0].value} min`}</p>
          </div>
        );
      }
    
      return null;
    };

    const CustomHover = ({ points }) => {
      return (
        <rect x={points[0].x} y="0" height='100%' width="100%" fill="rgba(0, 0, 0, 0.1)"/>  
      ) 
    }

  return (
    <div id='line-charts'>
      <p className='line-charts-title'>Durée moyenne des sessions</p>
      <ResponsiveContainer width="100%" height='100%' aspect={1}>
        <LineChart margin={{ top: 85, bottom: 40, left: -20, right: -20}} data={ formatedUserAverageSessions }>
          <XAxis dataKey="dayLetter" tickMargin={20} tickSize={0} axisLine={false} stroke="#FF8080"/>
          <YAxis dataKey="sessionLength" hide />
          <Tooltip content={<CustomTooltip />} cursor={<CustomHover />}/>
          <Line dataKey="sessionLength" type="natural" stroke="#FFFFFF" activeDot={{ r: 5 }} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
    export default LineSession;
    LineSession.propTypes = {
        formatedUserAverageSessions: PropTypes.array
      };