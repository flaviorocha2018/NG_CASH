import { LocalStorageEnum } from "../shared/enum/LocalStorageEnum";

export class LocalStorageService {

    /**
     * Pega valores do local storage com base nos enuns.
     */
    public static getValue(key: LocalStorageEnum): any {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : value;
    }

    /**
     * Grava valores do local storage com base nos enuns.
     */
    public static setValue(key: LocalStorageEnum, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
        return this.getValue(key);
    }

    /** 
     * Salva o token recebido no local storage.
    */
    public static setAuthToken = (token: string) => localStorage.setItem(LocalStorageEnum.APP_LOGGED_TOKEN, token);

    /**
     * Busca o token de autenticação no localstorage.
     * 
     * @returns string Devolve um token de autenticação.
     */
    public static getAuthToken = () => localStorage.getItem(LocalStorageEnum.APP_LOGGED_TOKEN);

    /**
     * Remove o token de authenticação
     */
    public static removeAuthToken = () => LocalStorageService.setAuthToken('');

    /** 
     * Salva o token recebido no local storage.
    */
    public static setUserData = (userData: object) => localStorage.setItem(LocalStorageEnum.APP_USER_DATA, JSON.stringify(userData));

    /**
     * Busca o token de autenticação no localstorage.
     * 
     * @returns string Devolve um token de autenticação.
     */
    public static getUserData = () => {
        try {
            return JSON.parse(localStorage.getItem(LocalStorageEnum.APP_USER_DATA) || '');
        } catch (e) {
            return { email: '', name: '', agency: '', account_number: '' };
        }
    }

    /**
     * Remove o token de authenticação
     */
    public static removeUserData = () => LocalStorageService.setUserData({});
}