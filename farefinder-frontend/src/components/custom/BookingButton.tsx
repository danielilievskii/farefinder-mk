const BookingButton = ({href, label, provider, variant = "primary"}) => {
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90",
    booking: "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
  };

  return (
    <a href={href}
       target="_blank"
       rel="noopener noreferrer"
       className={`inline-flex flex-col items-center justify-center gap-0.5 px-4 py-2 font-semibold rounded-md transition-colors shadow-sm text-center ${variantStyles[variant]}`}
    >
      <span className="font-bold text-sm">{label}</span>
      <span className="text-xs opacity-80">via {provider}</span>
    </a>
  );
};

export default BookingButton;