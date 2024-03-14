import "./home.css";
import WelcomeUser from "../Component/welcomeUser/welcome-user";
import BarUserActivity from "../Component/barUserActivity/barUserActivity";
import LineSession from "../Component/linesession/lineSession";
import RadarActivity from "../Component/radarActivity/radarActivity";
import RadioScore from "../Component/radioScore/radioScore";
import Recap from "../Component/recap/recap";
import { useParams } from "react-router-dom";

const HomePage = () => {
  let params = useParams();
  return (
    <main className="container">
      <WelcomeUser userId={params}></WelcomeUser>
      <div className="data-recap">
        <div className="charts-div">
          <BarUserActivity userId={params}></BarUserActivity>
          <div className="charts-div-line-2">
            <LineSession userId={params}></LineSession>
            <RadarActivity userId={params}></RadarActivity>
            <RadioScore userId={params}></RadioScore>
          </div>
        </div>
          <div className='recaps-div'>
            <Recap type="Calories" userId={ params }/>
            <Recap type="Proteines" userId={ params }/>
            <Recap type="Glucides" userId={ params }/>
            <Recap type="Lipides" userId={ params }/>
          </div>
      </div>
    </main>
  );
};
export default HomePage;
