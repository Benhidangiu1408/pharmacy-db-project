import axios, { AxiosRequestConfig, AxiosResponse  } from "axios";
import { SigninRequest, SigninResponse } from "../entities/Employee"; // Import your request/response types

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  postSignin = (data: SigninRequest, config?: AxiosRequestConfig): Promise<SigninResponse> => {
    console.log(this.endpoint)
    return axios
      .post<SigninResponse>(this.endpoint, data, config) // Specify SigninResponse as the response type
      .then((res: AxiosResponse<SigninResponse>) => {
        // Validate the response data
        console.log(res)
        if (!res.data || typeof res.data.id !== 'number' || typeof res.data.name !== 'string') {
          throw new Error("Invalid sign-in response format");
        }
        return res.data;
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        throw error; // Re-throw the error to be handled by useMutation
      });
  };

  getAll = (id?: string | number,config?: AxiosRequestConfig) => {
    const url= id? `${this.endpoint}/${id}`: this.endpoint
    return axios
      .get<T[]>(url, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  get = (id?: string | number, config?: AxiosRequestConfig) => {
    const url= id? `${this.endpoint}/${id}`: this.endpoint
    return axios
      .get<T>(url, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data by ID:", error);
        throw error;
      });
  };

  create = (data: T, config?: AxiosRequestConfig) => {
    return axios
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error creating data:", error);
        throw error;
      });
  };

  update = ( data: Partial<T>, config?: AxiosRequestConfig) => {
    return axios
      .post<T>(this.endpoint, data, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error updating data:", error);
        throw error;
      });
  };
}

export default APIClient;