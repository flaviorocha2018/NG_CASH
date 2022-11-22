import { AxiosResponse } from "axios";

import { LocalStorageService } from "./LocalStorageService";

class Interceptors {
    /**
     * Response interceptor
     */
    public responseInterceptor(response: AxiosResponse<any>): AxiosResponse<any> {

        // Intercepta error no token jwt.   
        if (response.data.data.statusCode) {
            const errorCode = response.data.data.statusCode;
            if (errorCode === 401) {
                LocalStorageService.removeAuthToken();
                window.location.reload();
            } else {
                throw new Error(response.data.message);
            }
        }

        return response;
    }

    /**
     * Error interceptor
     */
    public errorInterceptor(error: any): AxiosResponse<any> {

        // Intercepta error no token jwt.   
        if (error.response.data.statusCode) {
            const errorCode = error.response.data.statusCode;
            if (errorCode === 401) {
                LocalStorageService.removeAuthToken();
                window.location.reload();
            } else {
                throw new Error(error.response.data.message);
            }
        }

        return error;
    }
}

export const Interceptor = new Interceptors();