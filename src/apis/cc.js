import axios from 'axios';
const protocol = "http";
const port = "8000";

export default axios.create({
  baseURL: `${protocol}://${window.location.hostname}:${port}`,
  transformRequest: [(data) => JSON.stringify(data || undefined)],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
