import clsx from "clsx";

export default function Button(props: ButtonProps) {
  const {
    loading,
    noDefault,
    className,
    onClick,
    children,
    disabled,
    size = "default",
    variant = "default",
    ...prop
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={clsx(
        !noDefault &&
          "transition-all duration-300 active:scale-[0.99] px-[21px] py-[10px] font-medium text-[18px] leading-normal font-aloeMed disabled:cursor-not-allowed disabled:bg-opacity-60",
        {
          "px-[21px] py-[12.5px] text-[18px]": size === "default",
          "px-3 py-2 text-sm": size === "sm",
          "px-6 py-3 text-lg": size === "lg",
          "bg-gradient-to-r from-ember-400 to-ember-500 rounded-[10px] text-white hover:from-ember-500 hover:to-ember-600":
            variant === "default",
          "bg-dark-700 text-white rounded-[16px] hover:bg-dark-600 border border-dark-600":
            variant === "secondary",
          "bg-danger-500 hover:bg-danger-600 text-white rounded-[12px] border border-danger-600":
            variant === "danger",
          "bg-ember-500 hover:bg-ember-600 rounded-[12px] active:bg-ember-700 text-white":
            variant === "primary",
          "bg-ocean-600 hover:bg-ocean-700 rounded-[12px] text-white":
            variant === "google",
        },
        className
      )}
      arial-busy={loading?.toString()}
      {...prop}
    >
      <div className="flex items-center justify-center">
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx={12}
              cy={12}
              r={10}
              stroke="currentColor"
              strokeWidth={4}
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          children
        )}
      </div>
    </button>
  );
}
