import React from 'react';

import './Input.css';

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => {
    return (
        <input {...props} className={`padding-m border-radius-soft border-color-none ${className}`} />
    );
}