import axios, { AxiosResponse } from "axios";
import { handleApiError } from "./handleApiError";
import Cookies from "js-cookie";
import { config } from "../configs/configs";


export const postData = async <T = any>(
  resource: string,
  payload: Record<string, any> | FormData,
  formData: boolean = false
): Promise<AxiosResponse<T>> => {
  const token = Cookies.get("token");

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
