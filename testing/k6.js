import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '30s', target: 1000 },
  ],
};

export default function () {
  http.get(`http://localhost:3000/api/shoes/${Math.ceil(Math.random() * 10000000)}/reviews`);
  sleep(1);
}
