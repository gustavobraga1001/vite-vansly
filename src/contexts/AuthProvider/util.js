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
    const request = await Api.post("/sessions", 
      { email, password }, // Dados enviados no body
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*",
          "connection": "keep-alive",
        }
      }
    );
    return request.data;
  } catch (error) {
    return null;
  }
}

export async function RegisterRequest(name, email, password) {
  try {
    const request = await Api.post("/users", { name, email, password });

    console.log(request)
    return request;
  } catch (error) {
    console.log(error)
    return error;
  }
}