import axios from 'axios';

export default axios.create({
  baseURL: "http://cccm:8000",
  transformRequest: [(data) => JSON.stringify(data || undefined)],
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
