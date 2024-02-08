import axios from "axios";

const API_BASE_URL = "http://localhost:8080/flashy"; //process.env.BASE_URL;
const HEADERS = {
  Accept: "*",
  "Content-Type": "*",
  "Access-Control-Allow-Origin": "*",
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: HEADERS,
});
