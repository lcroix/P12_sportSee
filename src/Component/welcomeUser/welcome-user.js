import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./welcome-user.css";
import { getUserDetails } from "../../services/callAPI";

function WelcomeUser(props) {
  const userId = props.userId.id;
  const [user, setUser] = useState({ firstName: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData(id) {
      try {
        const data = await getUserDetails(id);
        if (data) { 
          setUser(data);
        } else {
          throw new Error("Aucune donnée disponible.");
        }
      } catch (error) {
        setError(error.message);
      }
    }
    fetchData(userId);
  }, [props]); // Assurez-vous que c'est la bonne dépendance

  if (error) return <Navigate to="/Error" />;
  return (
    <div>
      <p className="hello-text">
        Bonjour <span>{user.firstName}</span>
      </p>
      <p className="motivation-text">
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
}

export default WelcomeUser;
