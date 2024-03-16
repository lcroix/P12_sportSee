import axios from "axios";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "./Mock";
import UserPerf from "./models/userPerf";
import UserInfo from "./models/userInfo";
import UserActivity from "./models/userModel";
import UserSession from "./models/userSession";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const usedMocks = process.env.REACT_APP_API_MOCK;

// Fonction pour obtenir les détails de l'utilisateur à partir des données mockées
export async function getUserDetailsFromMocks(id) {
  id = parseInt(id);
  try {
    let userInfoData;
            const mockedData = USER_MAIN_DATA;
            for (var i = 0; i < mockedData.length; i++) {
                if (mockedData[i].id === id) {
                    userInfoData = new UserInfo(mockedData[i]);
                    break;
                }
            }
            return userInfoData;
  } catch (error) {
    console.error(
      "Il y a eu une erreur lors de la récupération des détails de l'utilisateur à partir des mocks:",
      error
    );
    throw error;
  }
}

// Fonction pour obtenir les détails de l'utilisateur à partir de l'API
export async function getUserDetailsFromAPI(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${id}`);
    let userInfoData = new UserInfo(data.data);
    return userInfoData;
  } catch (error) {
    console.error(
      "Il y a eu une erreur lors de la récupération des détails de l'utilisateur à partir de l'API:",
      error
    );
    throw error;
  }
}

// Fonction principale pour décider quelle méthode utiliser
export async function getUserDetails(id) {
  if (usedMocks === "true") {
    return getUserDetailsFromMocks(id);
  } else {
    return getUserDetailsFromAPI(id);
  }
}

async function getUserActivityWithMocks(id) {
  id = parseInt(id);
  try {
    let userSession;
            const mockedData = USER_ACTIVITY;
            for (var i = 0; i < mockedData.length; i++) {
                if (mockedData[i].userId === id) {
                    userSession = new UserActivity(mockedData[i]);
                    break;
                }
            }
            return userSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir l'activité de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserActivityWithoutMocks(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${id}/activity`);
    let userSession = new UserActivity(data.data);
    return userSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction principale qui décide quelle fonction appeler basée sur la condition d'utilisation des mocks
export async function getUserActivity(id) {
  if (usedMocks === "true") {
    return getUserActivityWithMocks(id);
  } else {
    return getUserActivityWithoutMocks(id);
  }
}

// Fonction pour obtenir les sessions moyennes de l'utilisateur en utilisant les mocks
async function getUserAverageSessionsWithMocks(id) {
  id = parseInt(id);
  try {
    let userAverageSession;
    const mockedData = USER_AVERAGE_SESSIONS;
    for (var i = 0; i < mockedData.length; i++) {
        if (mockedData[i].userId === id) {
            userAverageSession = new UserSession(mockedData[i]);
            break;
        }
    }
    return userAverageSession;  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir les sessions moyennes de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserAverageSessionsWithoutMocks(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${id}/average-sessions`);
    let userAverageSession = new UserSession(data.data);
    return userAverageSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction principale qui décide quelle fonction appeler basée sur la condition d'utilisation des mocks
export async function getUserAverageSessions(id) {
  if (usedMocks === "true") {
    return getUserAverageSessionsWithMocks(id);
  } else {
    return getUserAverageSessionsWithoutMocks(id);
  }
}


async function getUserPerformanceWithMocks(id) {
  id = parseInt(id);
  try {
    let userSession;
    const mockedData = USER_PERFORMANCE;
    for (var i = 0; i < mockedData.length; i++) {
      if (mockedData[i].userId === id) {
          userSession = new UserPerf(mockedData[i]);
          break;
      }
  }
  return userSession;  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir la performance de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserPerformanceWithoutMocks(id) {
  try {
    const { data } = await axios.get(`${baseUrl}/user/${id}/performance`);
    let userSession = new UserPerf(data.data);
    return userSession;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction principale qui décide quelle fonction appeler basée sur la condition d'utilisation des mocks
export async function getUserPerformance(id) {
  if (usedMocks === "true") {
    return getUserPerformanceWithMocks(id);
  } else {
    return getUserPerformanceWithoutMocks(id);
  }
}
