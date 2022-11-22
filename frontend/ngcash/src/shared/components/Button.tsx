import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {

    return (
        <button {...props} className={`padding-s border-radius-soft border-color-none shadow-soft ${className}`} />
    );
}