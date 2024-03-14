import axios from "axios";
import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from "./Mock";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const usedMocks = process.env.REACT_APP_API_MOCK;

// Fonction pour obtenir les détails de l'utilisateur à partir des données mockées
export async function getUserDetailsFromMocks(id) {
  id = parseInt(id);
  try {
    return USER_MAIN_DATA.find((user) => user.id === id);
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
    const response = await axios.get(`${baseUrl}/user/${id}`);
    return response.data.data;
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
    return USER_ACTIVITY.find((user) => user.userId === id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir l'activité de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserActivityWithoutMocks(id) {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}/activity`);
    return response.data.data;
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
    return USER_AVERAGE_SESSIONS.find((user) => user.userId === id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir les sessions moyennes de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserAverageSessionsWithoutMocks(id) {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}/average-sessions`);
    return response.data.data;
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
    return USER_PERFORMANCE.find((user) => user.userId === id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Fonction pour obtenir la performance de l'utilisateur sans utiliser les mocks (requête réelle)
async function getUserPerformanceWithoutMocks(id) {
  try {
    const response = await axios.get(`${baseUrl}/user/${id}/performance`);
    return response.data.data;
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
