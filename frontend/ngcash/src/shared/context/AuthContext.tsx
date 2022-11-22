import React, { createContext, useState, useCallback, useEffect } from 'react';

import { Api }  from '../../services/Api';
import {LocalStorageService } from '../../services/LocalStorageService'

interface IAuthContextData {
    hasError: boolean;
    isLogged: boolean;
    isLoading: boolean;
    logout(): Promise<void>;
    login(name: string, password: string): void;
    signup(name: string, password: string): void;
    user: {
        name: string;
        accountNumber: string;
    }
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
    useEffect(() => {
        const accessToken = LocalStorageService.getAuthToken();
        const userData = LocalStorageService.getUserData();
        setAuthData(oldState => ({
            ...oldState,
            isLogged: accessToken ? true : false,
            user: userData,
        }));
    }, []);

    const handleSignup = useCallback(async (name: string, password: string) => {
        setAuthData(oldState => ({
            ...oldState,
            isLoading: true,
            hasError: false,
        }));

        try {
            Api(false).post('/signup', {}, {
                headers: {
                    password,
                    name,
                }
            })
                .then(({ data: { data } }) => {
                    LocalStorageService.setAuthToken(data.accessToken);
                    LocalStorageService.setUserData(data.user);
                    setAuthData(oldState => ({
                        ...oldState,
                        isLoading: false,
                        user: data.user,
                        hasError: false,
                        isLogged: true,
                    }));
                })
                .catch((_) => {
                    setAuthData(oldState => ({
                        ...oldState,
                        isLoading: false,
                        hasError: true,
                    }));
                });
        } catch (error) {
            setAuthData(oldState => ({ ...oldState, isLoading: false, hasError: true }));
        }
    }, []);

    const handleLogin = useCallback(async (name: string, password: string) => {
        setAuthData(oldState => ({
            ...oldState,
            isLoading: true,
            hasError: false,
        }));

        try {
            Api(false).get('/sign', {
                headers: {
                    name,
                    password
                }
            })
                .then(({ data: { data } }) => {
                    LocalStorageService.setAuthToken(data.accessToken);
                    LocalStorageService.setUserData(data.user);
                    setAuthData(oldState => ({
                        ...oldState,
                        isLoading: false,
                        user: data.user,
                        hasError: false,
                        isLogged: true,
                    }));
                })
                .catch((_) => {
                    setAuthData(oldState => ({
                        ...oldState,
                        isLoading: false,
                        hasError: true,
                    }));
                });
        } catch (_) {
            setAuthData(oldState => ({ ...oldState, isLoading: false, hasError: true }));
        }
    }, []);

    const handleLogout = useCallback(async () => {

        if (!window.confirm('Realmente deseja encerrar o login?')) return;

        LocalStorageService.removeAuthToken();
        LocalStorageService.removeUserData();

        setAuthData(oldState => ({
            ...oldState,
            isLogged: false,
            user: {  name: '', accountNumber: ''}
        }))
    }, []);

    const [authData, setAuthData] = useState<IAuthContextData>({
        isLogged: false,
        hasError: false,
        isLoading: false,
        login: handleLogin,
        logout: handleLogout,
        signup: handleSignup,
        user: {  name: '', accountNumber: '' }
    });

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
}