async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("token");
  const headers = Object.assign(
    { "Content-Type": "application/json" },
    options.headers || {},
  );
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }
  return res.json();
}
