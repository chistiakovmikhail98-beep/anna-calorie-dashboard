import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = "relative overflow-hidden rounded-full font-sans transition-all duration-500 px-8 py-3.5 text-sm tracking-[0.15em] font-medium uppercase flex items-center justify-center group";

  const variants = {
    primary: "bg-raspberry text-white hover:bg-bright-pink shadow-md hover:shadow-bright-pink/20",
    secondary: "bg-white text-raspberry border border-cream-dark hover:bg-cream-dark/20",
    outline: "border border-raspberry text-raspberry hover:bg-raspberry hover:text-white",
    ghost: "bg-transparent text-olive hover:text-raspberry underline underline-offset-8 decoration-powder"
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </button>
  );
};
