import Api from "./services/api";

export function setUserLocalStorage(user) {
  localStorage.setItem("u", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("accessToken");

  return json ?? null;
}

export async function LoginRequest(email, password) {
  try {
    const request = await Api.post("/sessions", { email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}

export async function RegisterRequest(name, email, password) {
  try {
    const request = await Api.post("/users", { name, email, password });
    return request.data;
  } catch (error) {
    return null;
  }
}