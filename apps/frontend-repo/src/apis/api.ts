// combine all api calls in one file (for readability)

import { BaseResponse } from "@repo/types";
import { AxiosResponse } from "axios";

import api from "./../helpers/interceptor";
import { store } from "@/stores/store";

export const loginApi = async (
  email: string,
  password: string
): Promise<AxiosResponse<BaseResponse>> => {
  return await api.post("http://localhost:3000/login", {
    email,
    password,
  });
};

export const fetchMeApi = async (): Promise<AxiosResponse<BaseResponse>> => {
  return await api.get("http://localhost:3000/fetch-user-data", {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  });
};

export const fetchUsersApi = async (): Promise<AxiosResponse<BaseResponse>> => {
  return await api.get("http://localhost:3000/fetch-users-data", {
    headers: {
      Authorization: `Bearer ${store.getState().auth.token}`,
    },
  });
};

export const updateMeApi = async ({
  name,
  username,
}: {
  name: string;
  username: string;
}): Promise<AxiosResponse<BaseResponse>> => {
  return await api.put(
    "http://localhost:3000/update-user-data",
    {
      name: name,
      username: username,
    },
    {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    }
  );
};

// export const login = async (email: string, password: string) => {
//   try {
//     const response: AxiosResponse<BaseResponse> = await axios.post(
//       "http://localhost:3000/login",
//       {
//         email,
//         password,
//       }
//     );
//     return response.data;
//   } catch (error) {
//     const axiosError = error as AxiosError;
//     const errorData = axiosError.response?.data as BaseResponse;
//     if (errorData) {
//       return errorData;
//     } else {
//       return {
//         status: "error",
//         message: "An error occurred",
//         data: null,
//       } as BaseResponse;
//     }
//   }
// };

// export const fetchUserData = async () => {
//   const response: AxiosResponse<BaseResponse> =
//     await axios.get("/fetch-user-data");
//   return response.data;
// };

// export const fetchUsersData = async () => {
//   const response: AxiosResponse<BaseResponse> =
//     await axios.get("/fetch-users-data");
//   return response.data;
// };

// export const updateUserData = async (name: string, username: string) => {
//   const response: AxiosResponse<BaseResponse> = await axios.put("/users", {
//     name,
//     username,
//   });
//   return response.data;
// };
