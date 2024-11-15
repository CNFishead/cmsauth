import axios from 'axios';

/**
 * @description   - Creates an axios instance with the base url of the api if we are in production
 *
 * @possible      - development http://localhost:5000/api/v1
 * @possible       
 */
export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_URL
      : 'http://localhost:5000/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
});
