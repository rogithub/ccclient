import axios from 'axios';

export default axios.create({
  //baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
  baseURL: "http://roazure.southcentralus.cloudapp.azure.com:8000",
  transformRequest: [(data) => JSON.stringify(data || undefined)],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
