import React, { InputHTMLAttributes } from 'react'; //removed ChangeEvent since it's never read
import { useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string; 
    variant: 'default' | 'correct' | 'incorrect'; 
    label?: string; 
}

export const Input: React.FC<Props> = ({
    id,
    label,
    className,
    variant,
    type,
    placeholder,
    onChange,
    value,
    children,
    width,
    ...rest 
}) => {
    const inputVariants = {
        correct: `border border-green-300 bg-green-100 focus:ring-green-500`,
        incorrect: `border border-red-300 bg-red-100 focus:ring-red-500`,
        default: `border border-gray-300 focus:ring-blue-500`,
    };

    const labelVariants = {
        correct: 'font-bold text-green-700',
        incorrect: 'font-bold text-red-700',
        default: 'font-normal text-grey-700',
    }

    

    const randId = useId(); 

    return (
        <div className={`${width || ''} flex flex-col`}>
           
                <label htmlFor={id || randId} className={`text-md ${labelVariants[variant]}`}>
                    {label && label.length > 0 ? label : ''}
                </label>
        
            <div className='flex flex-row items-center gap-3'>
            <input
                id={id || randId} 
                type={type}
                placeholder={placeholder}
                className={`w-full rounded-md p-1 text-xs md:text-xl focus:outline-none focus:ring-2 ${className} ${inputVariants[variant]}`}
                onChange={onChange}
                value={value}
                {...rest}
            />
            {children}
            </div>
        </div>
    );
};