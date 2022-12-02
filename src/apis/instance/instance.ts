import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

export const instance = axios.create({
  baseURL: BASE_URL
})