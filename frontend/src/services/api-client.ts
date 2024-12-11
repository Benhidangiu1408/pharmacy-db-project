import axios, { AxiosRequestConfig } from "axios";

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (config?: AxiosRequestConfig) => {
    return axios
      .get<T[]>(this.endpoint, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data:", error);
        throw error;
      });
  };

  get = (id: string | number, config?: AxiosRequestConfig) => {
    return axios
      .get<T>(`${this.endpoint}/${id}`, config)
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error fetching data by ID:", error);
        throw error;
      });
  };
}

export default APIClient;