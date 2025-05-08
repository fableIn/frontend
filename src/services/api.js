const API_HOST = (process.env.VUE_APP_API_BASE_URL || 'http://fawkesguyd.ru')
  .replace(/\/+$/, '');
const API_URL = `${API_HOST}/api/v1`;

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function login(email, password) {
  // OAuth2PasswordRequestForm ждет поле username=email
  const body = new URLSearchParams({ username: email, password });
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  }).then(res => res.json());
}

export function register(username, email, password) {
  return request('/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export function getCurrentUser() {
  return request('/users/me');
}
