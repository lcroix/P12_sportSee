import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUserActivity } from "../../services/callAPI";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./barUserActivity.css";

function BarUserActivity(id) {
  const userId = id.userId.id;
  const [userSessions, setUserSessions] = useState("");
  const [error, setError] = useState(null);
  let formatedUserSession = [];
  useEffect(() => {
    async function getUserSessionOnLoad(id) {
      try {
        if (id) {
          const userData = await getUserActivity(id);
          setUserSessions(userData.sessions);
        }
        else {
					throw new Error("Aucune donnée disponible.");
      }
    }catch (error) {
      setError(error.message);
    }
  }
    getUserSessionOnLoad(userId);
  }, [userId]);

  if (error) return <Navigate to="/Error" />;
  function CustomDatas(data) {
    if (userSessions) {
      const FormatedSessions = data.map((session, index) => {
        return {
          label: index + 1,
          day: index + 1,
          kilogram: session.kilogram,
          calories: session.calories,
        };
      });

      formatedUserSession = FormatedSessions;
    }
  }
  CustomDatas(userSessions);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value} kg`}</p>
          <p className="label">{`${payload[1].value} kcal`}</p>
        </div>
      );
    }

    return null;
  };
  return (
    <div id="bar-charts">
      <div className="bar-charts-header">
        <p>Activité quotidienne</p>
        <ul className="bar-charts-header-legend">
          <li>Poids (kg)</li>
          <li>Calories brûlées (kcal)</li>
        </ul>
      </div>
      <ResponsiveContainer height="100%" width="100%" aspect={4}>
        <BarChart data={formatedUserSession}>
          <CartesianGrid strokeDasharray="4" vertical={false} />
          <XAxis dataKey="day" stroke="#9B9EAC" tickMargin={20} tickSize={0} />

          <YAxis
            yAxisId="calories"
            dataKey="calories"
            hide="true"
            orientation="left"
            stroke="#9B9EAC"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            allowDataOverflow={true}
            minTickGap={10}
            allowDecimals={false}
          />
          <YAxis
            dataKey="kilogram"
            yAxisId="kilogram"
            orientation="right"
            stroke="#9B9EAC"
            tickLine={false}
            axisLine={false}
            tickMargin={30}
            allowDataOverflow={true}
            minTickGap={10}
            allowDecimals={false}
            domain={["dataMin -1", "dataMax +1"]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="kilogram"
            yAxisId="kilogram"
            fill="#282D30"
            barSize={9}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="calories"
            yAxisId="calories"
            fill="#E60000"
            barSize={9}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
BarUserActivity.propTypes = {
  formatedUserSession: PropTypes.array,
};
export default BarUserActivity;
