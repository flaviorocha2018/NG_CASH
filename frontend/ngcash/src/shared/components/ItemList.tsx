import React from 'react';

import { IconNegative, IconPositive, IconPayment, IconTransfer, IconDeposit } from '../../../assets';
import { ITransaction } from '../../shared/interfaces/ITrasaction';
import { ETransactionTypes } from '../../shared/enum';

export const ItemList: React.FC<ITransaction & { delay?: number }> = ({ type, value, delay = 0 }) => {

    return (
        <div
            style={{ animationDelay: `${delay / 1000}s`, animationDuration: `${delay / 10}s` }}
            className="padding-m border-thin-gray border-radius-soft margin-bottom-s flex-row flex-items-center translate-y"
        >
            <div>
                {(type === ETransactionTypes.Payment || type === ETransactionTypes.Transfer)
                    ? <IconNegative width={20} />
                    : <IconPositive width={20} />
                }
            </div>
            <div>
                {type === ETransactionTypes.Payment
                    ? <IconPayment width={35} className="margin-left-s margin-right-m" />
                    : type === ETransactionTypes.Transfer
                        ? <IconTransfer width={35} className="margin-left-s margin-right-m" />
                        : <IconDeposit width={35} className="margin-left-s margin-right-m" />
                }
            </div>
            <div>
                <p style={{ fontSize: 14, fontWeight: 500 }}>
                    {type === ETransactionTypes.Payment
                        ? "Pagamento de boleto"
                        : type === ETransactionTypes.Transfer
                            ? "Transferência"
                            : "Deposito"
                    }
                </p>
                <p style={{ fontSize: 18, fontWeight: 300 }}>R$: {value.toFixed(2)}</p>
            </div>
        </div>
    );
}