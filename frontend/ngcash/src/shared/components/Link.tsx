import React from 'react';

export const Link: React.FC<React.ButtonHTMLAttributes<HTMLAnchorElement>> = ({ className, children, ...props }) => {

    return (
        <a {...props} className={`padding-xs border-color-none text-center ${className}`}>
            <p>{children}</p>
        </a>
    );
}