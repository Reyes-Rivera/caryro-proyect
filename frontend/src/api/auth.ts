import { User, UserLogin } from "@/types/User";
import axios from "./axios";

export const getCsrfToken = async () => {
   const response = await axios.get('/auth/csrf-token', {
      withCredentials: true,
   });
   return response.data.csrfToken;
};

export const verifyToken = async () => {
   const csrfToken = await getCsrfToken();
   const res = await axios.get("/auth/verifyToken", {
      withCredentials: true,
      headers: {
         'CSRF-Token': csrfToken,
      }
   });
   return res;
}

export const loginApi = async (data: UserLogin) => {
   // Obtener el token CSRF antes de la solicitud de login
   const csrfToken = await getCsrfToken();

   // Realizar la solicitud de login incluyendo el token CSRF
   return axios.post("/auth/login", data, {
      headers: {
         'CSRF-Token': csrfToken  // Incluir el token CSRF en los headers
      },
      withCredentials: true,  // Asegura que las cookies de sesión se envíen
   });
};

export const logOutApi = async () => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/auth/logout", {
      _csrf: csrfToken 
   }, {
      headers: {
         'CSRF-Token': csrfToken
      },
      withCredentials: true 
   });
   return res;
}

export const signUpApi = async(data: User) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/users", data,{
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const verifyCodeApi = async (email: string, code: string) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/users/verify-code", { email, code }, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const verifyCodeApiAuth = async (email: string, code: string) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/auth/verify-code", { email, code }, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const resendCodeApi = async (email: object) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/users/resend-code", email, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const resendCodeApiAuth = async (email: object) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/auth/resend-code", email, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const recoverPassword = async (email: object) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post("/users/recover-password", email, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}

export const restorePassword = async (token: any, password: object) => {
   const csrfToken = await getCsrfToken();
   const res = await axios.post(`/users/reset-password/${token}`, password, {
      headers: {
         'CSRF-Token': csrfToken
      },
   });
   return res;
}