import axios, { AxiosRequestConfig } from "axios";

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

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