import React from 'react';

export const Section: React.FC<{ title: string }> = ({ title, children }) => {

    return (
        <div className="flex1 background-white padding-m padding-top-g padding-bottom-g border-radius-soft shadow-soft">
            <h1 style={{ fontWeight: 'normal', fontSize: 22 }}>{title}</h1>
            <div className="margin-top-m">
                {children}
            </div>
        </div>
    );
}