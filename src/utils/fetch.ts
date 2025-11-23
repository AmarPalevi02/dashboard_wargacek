import axios, { AxiosResponse } from "axios";
import { handleApiError } from "./handleApiError";
import Cookies from "js-cookie";
import { config } from "../configs/configs";

export const postData = async <T = any>(
  resource: string,
  payload: Record<string, any> | FormData,
  formData: boolean = false
): Promise<AxiosResponse<T>> => {
  const { token } = Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth") as string)
    : {};

  try {
    const response = await axios.post<T>(
      `${config.base_url}${config.version}/${resource}`,
      payload,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getDatas = async (url: string) => {
  const { token } = Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth") as string)
    : {};
  try {
    const response = await axios.get(
      `${config.base_url}${config.version}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const putData = async (
  url: string,
  payload: Record<string, any> | FormData,
  formData: boolean = false
) => {
  const { token } = Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth") as string)
    : {};

  try {
    const response = await axios.put(
      `${config.base_url}${config.version}/${url}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteData = async <T = any>(
  resource: string
): Promise<AxiosResponse<T>> => {
  const { token } = Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth") as string)
    : {};

  try {
    const response = await axios.delete<T>(
      `${config.base_url}${config.version}/${resource}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const patchData = async <T = any>(
  resource: string,
  payload: Record<string, any> | FormData,
  formData: boolean = false
): Promise<AxiosResponse<T>> => {
  const { token } = Cookies.get("auth")
    ? JSON.parse(Cookies.get("auth") as string)
    : {};

  try {
    const response = await axios.patch<T>(
      `${config.base_url}${config.version}/${resource}`,
      payload,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": formData ? "multipart/form-data" : "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    throw handleApiError(error);
  }
};