import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,          // 10 usuários virtuais simultâneos
  duration: '30s',  // roda por 30 segundos
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% das requisições < 500ms
    http_req_failed: ['rate<0.01'],     // menos de 1% de falhas
  },
};

export default function () {
  const payload = JSON.stringify({
    orderId: 'PERF-' + Date.now(),
    customer: 'Load Test User',
    total: 299.90
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post('https://httpbin.org/post', payload, params);

  check(res, {
    'status é 200': (r) => r.status === 200,
    'resposta tem orderId': (r) => r.json('json.orderId') !== null,
  });

  sleep(1);  // 1 segundo entre cada requisição
}