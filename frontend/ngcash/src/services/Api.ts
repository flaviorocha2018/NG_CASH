import Axios from  'axios';
import { LocalStorageService } from './LocalStorageService';
import { Interceptor } from './Interceptor';

export const Api = (includeAuthHeader: boolean = true) => {
    const accessToken = LocalStorageService.getAuthToken();

    const instence = Axios.create({
        baseURL: 'http://localhost:3001/api',
        headers: {
            ...(includeAuthHeader
                ? { authorization: accessToken ? `Bearer ${accessToken}` : '' }
                : {}
            )
        }
    });

    instence.interceptors.response.use(
        onResponse => Interceptor.responseInterceptor(onResponse),
        onError => Interceptor.errorInterceptor(onError)
    );

    return instence;
}
