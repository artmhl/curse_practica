/**
 * Перевикористовуваний компонент кнопки.
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'ghost'
 *  - className: додаткові класи
 *  - ...rest: будь-які стандартні атрибути <button>
 */
const variants = {
  primary:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm',
  secondary:
    'bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 border border-gray-300 shadow-sm',
  ghost:
    'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-600',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg px-4 py-2 text-sm font-medium
        transition-colors duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}
