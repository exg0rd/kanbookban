import React from 'react';

interface Props {
    label: string;
    onClick?: () => void;
    children?: React.ReactNode; 
    loading?: boolean;
    type: "button" | "submit" | "reset";
    variant?: 'default' | 'danger' | 'hollow' | 'positive' | 'warning';
    className?: string;
}

export const Button: React.FC<Props> = ({ label, loading, className, onClick, children, type, variant }) => {
    const variants = {
        default: `bg-blue-600 border hover:bg-blue-700 text-white`,
        danger: `bg-red-600 border hover:bg-red-700 text-white`,
        hollow: `bg-white border border-blue-600 hover:bg-blue-100 text-blue-600`,
        positive: `bg-green-600 border border-green-600 hover:bg-green-700 text-white`,
        warning: `bg-yellow-600 border border-yellow-600 hover:bg-yellow-700 text-white`,
    };
    return (
        <div className={`relative no-print h-auto mt-auto ${className? className : ''}`}>
            <button
                disabled = {loading}
                type={type}
                onClick={onClick}
                className={`text-xs md:text-lg  min-h-[36px] px-2 py-2 ${variants[variant ?? 'default']} px-4 rounded-full transition duration-300 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
               {label} </button>
            {children && (
                    <span className="absolute flex items-center inset-0 justify-center items-center pointer-events-none text-white">
                        {children}
                    </span>
                )}
        </div>
    );
};

export default Button;