import { Loader2 } from "lucide-react";

const Button = ({
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  icon: Icon,
  className = "",
  ...props
}) => {
  // Base: Using rounded-xl and tracking-tight for that modern SaaS look
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] tracking-tight';

  const variantClasses = {
    // Premium Blue with a subtle shadow
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100 border border-transparent',
    // Zinc-based secondary for a sophisticated look
    secondary: 'bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 shadow-sm',
    // Dark mode / High contrast action
    dark: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-200 border border-transparent',
    // Subtle ghost action
    ghost: 'bg-transparent hover:bg-zinc-100 text-zinc-600 border border-transparent'
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 h-8 text-xs',
    medium: 'px-5 py-2.5 h-10 text-sm',
    large: 'px-8 py-4 h-14 text-base',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          {size !== 'small' && <span>Processing...</span>}
        </div>
      ) : (
        <>
          {Icon && <Icon className={`w-4 h-4 ${children ? 'mr-2' : ''}`} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;