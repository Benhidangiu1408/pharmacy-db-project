import { useMutation } from "@tanstack/react-query";
import { SigninRequest, SigninResponse } from "../entities/Employee";
import { signinEmployeeClient } from "../services/employeeService";

export const useSigninEmployee = () => {
    return useMutation<SigninResponse, Error, SigninRequest>({
      mutationFn: async (signinRequest: SigninRequest) => {
        // Call the API client
        console.log("Before res")
        const response = await signinEmployeeClient.create(signinRequest);
        
        console.log("After res",response)
        // Ensure the response matches the SigninResponse type
        // if (!response || typeof response.id !== "number" || !response.jobType) {
        //   throw new Error("Invalid response format");
        // }
        console.log(response)
        return response; // Explicitly cast the response
      },
    });
  };