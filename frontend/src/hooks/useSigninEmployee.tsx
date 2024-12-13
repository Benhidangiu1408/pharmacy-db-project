import { useMutation } from "@tanstack/react-query";
import { SigninRequest, SigninResponse } from "../entities/Employee";
import { signinEmployeeClient } from "../services/employeeService";

// export const useUpdateEmployeePassword = () => {
//     return useMutation<SigninResponse, Error, SigninRequest>({
//       mutationFn: async ({ account, password }) => {
//         // Call the API client and return the response
//         const response = await signinEmployeeClient.create({ account, password });

//         // Ensure response has the expected format
//         if (!response || typeof response.id !== "number" || response.jobType === undefined) {
//           throw new Error("Invalid response format");
//         }

//         return response as SigninResponse; // Return the response as SigninResponse
//       },
//     });
//   };

export const useSigninEmployee = () => {
    return useMutation<SigninResponse, Error, SigninRequest>({
      mutationFn: async (signinRequest: SigninRequest) => {
        // Call the API client
        const response = await signinEmployeeClient.create(signinRequest);
  
        // Ensure the response matches the SigninResponse type
        // if (!response || typeof response.id !== "number" || !response.jobType) {
        //   throw new Error("Invalid response format");
        // }
        console.log(response)
        return response as SigninResponse; // Explicitly cast the response
      },
    });
  };