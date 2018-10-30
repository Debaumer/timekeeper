import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://zeit-4b081.firebaseio.com/'
});

export default instance;
