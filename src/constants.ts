import axios from 'axios';

export const CHAT_API = axios.create({
  baseURL: 'http://146.185.154.90:8000',
});