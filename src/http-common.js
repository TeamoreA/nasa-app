import axios from "axios";

export default axios.create({
  baseURL: "https://api.nasa.gov/neo",
  headers: {
    "Content-type": "application/json"
  }
});
