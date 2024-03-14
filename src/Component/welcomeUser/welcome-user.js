import React from "react";
import { useState, useEffect } from "react";
import "./welcome-user.css";
import { getUserDetails } from "../../services/callAPI";

function WelcomeUser(props) {
  const [user, setUser] = useState({
    firstName: "",
  });
  const userId = props.userId.id;

  useEffect(() => {
    getUserDetails(userId).then((userInfoData) => {
      setUser({
        firstName: userInfoData.userInfos.firstName,
      });
    });
  }, [userId]);
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
