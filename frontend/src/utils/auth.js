export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const logout = () => localStorage.removeItem("token");
export const isAuthenticated = () => !!localStorage.getItem("token");


export const getTokenEmail = () => {
  const token = localStorage.getItem("token");
  if (!token) return "";

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    console.log(payload);
    return payload.email || ""; 
  } catch (err) {
    console.error("Failed to decode token:", err);
    return "";
  }
};

