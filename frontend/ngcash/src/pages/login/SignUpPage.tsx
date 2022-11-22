import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Link } from '../../shared/components/Link';
import { Utilities }  from '../../shared/Utils/Utilities';
import { useAuth } from '../../shared/hooks/auth';
import * as yup from 'yup';

export const SignUpPage: React.FC = () => {

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
    const { signup, isLoading, hasError } = useAuth();

    Utilities.setWindowTitle('Cadastro');

    const [name, setName] = useState('');

    const [password, setPasword] = useState('');
    const [passwordAgain, setPaswordAgain] = useState('');

    const [hasPasswordNotEqual, setHasPasswordNotEqual] = useState(false);

    const handlerSignup = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isLoading) return;

        setHasPasswordNotEqual(false);

        if (password !== passwordAgain) {
            setHasPasswordNotEqual(true);
            return;
        }

        signup(name, password);

    }, [name, password, passwordAgain, isLoading, setHasPasswordNotEqual, signup]);

    return (
        <div className="flex1 degrade flex-content-center flex-items-center">
            <div className="shadow-soft padding-g background-secondary border-radius-soft flex-items-center translate-y">
                <br />
                <p>Bem-vindo,</p>
                <b>crie sua conta!</b>
                <br />
                <form className="display-flex flex-column flex-content-center" onSubmit={handlerSignup}>
                    {hasError && <div className="padding-s border-color-error border-thin border-radius-soft text-center background-error">
                        Erro no cadastro
                    </div>}
                    {hasPasswordNotEqual && <div className="padding-s border-color-error border-thin border-radius-soft text-center background-error">
                        As senhas precisam ser iguais
                    </div>}
                    <br />
                    <Input type="text" placeholder="Seu nome completo" value={name} onChange={e => setName(e.currentTarget.value)} disabled={isLoading} required />
                    <br />
                    <br />
                    <Input type="password" placeholder="Nova senha" value={password} onChange={e => setPasword(e.currentTarget.value)} disabled={isLoading} required />
                    <br />
                    <Input type="password" placeholder="Repita a senha" value={passwordAgain} onChange={e => setPaswordAgain(e.currentTarget.value)} disabled={isLoading} required />
                    <br />
                    <Button className="background-primary" disabled={isLoading}>Cadastrar</Button>
                    <br />
                    <Link onClick={!isLoading ? (() => history.push('/sign')) : undefined} disabled={isLoading}>Já tenho uma conta</Link>
                </form>
            </div>
        </div>
    );
}



