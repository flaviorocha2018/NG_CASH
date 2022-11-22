import React, { useState, useEffect } from 'react';
import { ITransaction } from '../../shared/interfaces/ITrasaction';
import { Section } from '../../shared/components/Section';
import { ItemList } from '../../shared/components/ItemList';
import { Api } from '../../services/Api';
import { Utilities } from '../../shared/Utils/Utilities';

export const HistoryPage: React.FC = () => {

    Utilities.setWindowTitle('Histórico');

    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    useEffect(() => {
        Api()
            .post('/transactions')
            .then(({ data: { data: { transactions } } }) => {
                setTransactions(transactions.map((transaction: any) => ({
                    type: transaction.type,
                    value: transaction.value,
                    created_at: new Date(transaction.created_at),
                })));
            });
    }, []);

    return (
        <div className="padding-m translate-y">
            <Section title="Histórico de transações">
                {transactions
                    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
                    .map((transaction, index) => <ItemList key={index} delay={index} {...transaction} />)
                }
                {transactions.length === 0 && <p className="opacity-7">Você ainda não realizou transações.</p>}
            </Section>
        </div>
    );
}