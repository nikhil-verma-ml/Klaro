const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const getToken = () => localStorage.getItem("klaro_token");

const logoutAndRedirect = () => {
  localStorage.removeItem("klaro_token");
  window.location.href = "/login";
};

const parseResponse = async (response) => {
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }
  return data;
};

const request = async (path, options = {}) => {
  const token = getToken();
  const headers = { ...(options.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    logoutAndRedirect();
    throw new Error("Unauthorized");
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    const message =
      data?.detail || data?.error || response.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
};

export const api = {
  get: (path, options = {}) => request(path, { method: "GET", ...options }),
  post: (path, body, options = {}) =>
    request(path, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
      ...options,
    }),
  delete: (path, options = {}) => request(path, { method: "DELETE", ...options }),
  upload: (path, formData, options = {}) =>
    request(path, { method: "POST", body: formData, ...options }),
};
