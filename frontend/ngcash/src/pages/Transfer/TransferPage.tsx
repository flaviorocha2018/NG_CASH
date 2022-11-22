import React, { useState, useCallback } from 'react';
import { Section } from '../../shared/components/Section';
import { Input } from '../../shared/components/Input';
import { Button } from '../../shared/components/Button';
import { Api } from '../../services/Api';
import { Utilities } from '../../shared/Utils/Utilities';

export const TransferPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);

    Utilities.setWindowTitle('Trasferência');

    const [state, setState] = useState({
        cpf: '',
        accountNumber: '',
        digit: '',
        value: ''
    });

    const handleSubmit = useCallback(() => {
        if (isLoading) return;

        setIsLoading(true);

        const transference = {
            targetCpf: state.cpf,
            transferValue: state.value,
            accountNumber: `${state.accountNumber}-${state.digit}`,
        };

        Api()
            .post('/transfer', transference, { timeout: 5000 })
            .then((data) => {
                setIsLoading(false);
                setState({
                    cpf: '',
                    accountNumber: '',
                    digit: '',
                    value: ''
                });
                alert('Transferência realizada com sucesso.');
            })
            .catch(() => {
                setIsLoading(false);
                alert('Transferência não realizada.')
            });
    }, [isLoading, state]);

    return (
        <div className="padding-m translate-y">
            <Section title="Transferência">
                <form onSubmit={handleSubmit}>
                    <div className="">
                        <div style={{ width: 230 }}>
                            <label className="margin-bottom-xs opacity-7" htmlFor="cpf">Cpf da conta destino</label>
                            <Input
                                id="cpf"
                                required
                                type="text"
                                minLength={14}
                                maxLength={14}
                                value={state.cpf}
                                disabled={isLoading}
                                className="border-thin-gray"
                                placeholder="000.000.000-00"
                                onChange={e => setState({ ...state, cpf: Utilities.maskCpf(e.target.value.substr(0, 14) || '') })}
                            />
                        </div>
                        <div className="flex-row margin-top-m">
                            <div>
                                <label className="margin-bottom-xs opacity-7" htmlFor="account-number">Número da conta de destino</label>
                                <Input
                                    required
                                    type="number"
                                    min={1000000}
                                    max={9999999}
                                    minLength={7}
                                    maxLength={7}
                                    id="account-number"
                                    disabled={isLoading}
                                    placeholder="0000000"
                                    value={state.accountNumber}
                                    className="border-thin-gray"
                                    onChange={e => setState({ ...state, accountNumber: Utilities.maskNumero(e.target.value.substr(0, 7) || '') })}
                                />
                            </div>
                            <div className="margin-left-g">
                                <label className="margin-bottom-xs opacity-7" htmlFor="digit">Dígito</label>
                                <Input
                                    min={0}
                                    max={9}
                                    required
                                    id="digit"
                                    type="number"
                                    minLength={0}
                                    maxLength={9}
                                    placeholder="0"
                                    value={state.digit}
                                    disabled={isLoading}
                                    style={{ width: 50 }}
                                    className="border-thin-gray"
                                    onChange={e => setState({ ...state, digit: Utilities.maskNumero(e.target.value.substr(0, 1) || '') })}
                                />
                            </div>
                        </div>
                        <div style={{ width: 230 }} className="margin-top-m">
                            <label className="margin-bottom-xs opacity-7" htmlFor="deposit">Valor que será transferido</label>
                            <Input
                                required
                                type="text"
                                id="deposit"
                                placeholder="10.00"
                                value={state.value}
                                disabled={isLoading}
                                className="border-thin-gray"
                                onChange={e => setState({ ...state, value: Utilities.maskNumero(e.target.value) })}
                                onBlur={e => setState({ ...state, value: Utilities.maskNumero(Number(e.target.value).toFixed(2)) })}
                            />
                        </div>
                        <div className="flex-row flex-content-end">
                            <Button className="background-primary padding-horizontal-xg" disabled={isLoading || (Number(state.value) <= 0)}>Transferir</Button>
                        </div>
                    </div>
                </form>
            </Section>
        </div>
    );
}