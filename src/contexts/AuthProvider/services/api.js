import axios from "axios";

const API_URL = import.meta.env.API_URL;


const Api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Envia cookies automaticamente
  headers:{
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Função para obter o token de acesso do localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Função para definir o token de acesso no localStorage
const setAccessToken = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

// Interceptor de requisição para adicionar o token de acesso
Api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// Interceptor de resposta
Api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("Erro 401 detectado. Tentando atualizar o token...");
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await axios.patch(
            `${Api.defaults.baseURL}/token/refresh`,
            {},
            { withCredentials: true } // Envia o cookie de refresh
          );

          const { token } = response.data;

          // Verifique se o token foi retornado corretamente
          console.log("Novo token recebido:", token);

          // Salva o novo token no localStorage
          setAccessToken(token);

          // Atualiza o token nas requisições subsequentes
          Api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          onRefreshed(token);

          isRefreshing = false;
          return Api(originalRequest); // Reenvia a requisição original com o novo token
        } catch (refreshError) {
          console.error("Refresh token is invalid", refreshError);

          // Redireciona para a tela de login em caso de erro
          window.location.href = '/login';

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // Caso já tenha iniciado o processo de refresh, aguarda o token
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(Api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default Api;
