import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Link } from '../../shared/components/Link';
import { Utilities } from '../../shared/Utils/Utilities';
import { useAuth } from '../../shared/hooks/auth';
import * as yup from 'yup';


export const LoginPage: React.FC = () => {

    interface ILogin {
        email: string,
        password: string,
      
      }
      const loginSchema: yup.SchemaOf<ILogin> = yup.object().shape({
        email: yup.string().email().required(),
        password: yup
        .string()
        .required('Please Enter your password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
       
      });

    const history = useHistory();
    const { login, isLoading, hasError } = useAuth();

    Utilities.setWindowTitle('Login');

    const [name, setName] = useState('');
    const [password, setPasword] = useState('');

    const handlerLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;

        login(name, password);

    }, [name, password, isLoading, login]);

    return (
        <div className="flex1 degrade flex-content-center flex-items-center">
            <div className="shadow-soft padding-g background-secondary border-radius-soft flex-items-center translate-y">
                <br />
                <p>Olá,</p>
                <b>entre na sua conta!</b>
                <br />
                <form className="display-flex flex-column flex-content-center" onSubmit={handlerLogin}>
                    {hasError && <div className="padding-s border-color-error border-thin border-radius-soft text-center background-error">
                        Erro no login
                    </div>}
                    <br />
                    <Input type="name" placeholder="Email" value={name} onChange={e => setName(e.currentTarget.value)} disabled={isLoading} required />
                    <br />
                    <Input type="password" placeholder="Senha" value={password} onChange={e => setPasword(e.currentTarget.value)} disabled={isLoading} required />
                    <br />
                    <Button className="background-primary" disabled={isLoading}>Entrar</Button>
                    <br />
                    <Link onClick={!isLoading ? (() => history.push('/signup')) : undefined} disabled={isLoading}>Cadastrar-se</Link>
                </form>
            </div>
        </div>
    );
}