import axios from 'axios';

export default axios.create({ baseURL: 'https://zonda-api.herokuapp.com' });

export const config = {
  headers: {
    ContentType: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('ZONDA_TOURS_TOKEN')}`,
  },
};
