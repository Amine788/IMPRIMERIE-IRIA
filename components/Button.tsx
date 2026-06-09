
import React, { useState } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface CommonButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

interface ButtonAsButtonProps extends CommonButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  as?: 'button';
}

interface ButtonAsLinkProps extends CommonButtonProps, Omit<LinkProps, 'children' | 'className' | 'ref'> {
  as: 'link';
  to: string; 
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled,
  as,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base styles: 
  // - active:scale-95 gives the "press" effect
  // - shadow-lg with color opacity gives depth
  const baseStyles = 'btn-3d font-bold rounded-xl transition-all duration-200 ease-out inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 transform';
  
  let variantStyles: string;
  let sizeStyles: string;

  switch (variant) {
    case 'primary':
      // Gradient Blue Primary (#1B3A6B) to Accent (#4A90E2)
      // Shadow is colored based on the primary color for a glow effect
      variantStyles = 'bg-gradient-to-r from-aria-primary to-aria-accent text-white shadow-lg shadow-aria-primary/30 hover:shadow-aria-primary/50 hover:brightness-110 border-0';
      break;
    case 'secondary':
      variantStyles = 'bg-white text-aria-primary border border-gray-200 hover:border-aria-accent hover:text-aria-accent shadow-sm hover:shadow-md';
      break;
    case 'outline':
      variantStyles = 'bg-transparent border-2 border-aria-accent text-aria-accent hover:bg-aria-accent hover:text-white shadow-none hover:shadow-lg hover:shadow-aria-accent/20';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-aria-primary shadow-none';
      break;
    case 'danger':
      variantStyles = 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 hover:brightness-110';
      break;
    default:
      variantStyles = 'bg-aria-primary text-white shadow-lg shadow-aria-primary/30 hover:brightness-110';
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-4 py-2 text-sm';
      break;
    case 'lg':
      sizeStyles = 'px-8 py-4 text-lg';
      break;
    case 'md':
    default:
      sizeStyles = 'px-6 py-3 text-base';
      break;
  }

  const disabledStyles = disabled || loading ? 'opacity-60 cursor-not-allowed transform-none shadow-none active:scale-100' : '';
  
  const combinedClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${disabledStyles} ${className}`;

  const content = loading ? (
    <>
      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Chargement...
    </>
  ) : children;

  if (as === 'link') {
    const linkProps = props as ButtonAsLinkProps;
    return (
      <Link
        {...linkProps}
        className={combinedClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    );
  } else {
    const buttonProps = props as ButtonAsButtonProps;
    return (
      <button
        {...buttonProps}
        disabled={disabled || loading}
        className={combinedClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </button>
    );
  }
};

export default Button;