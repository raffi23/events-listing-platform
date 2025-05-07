export const fetchAPI = (input: string, init: RequestInit) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return fetch(`${backendUrl + input}`, init);
};
