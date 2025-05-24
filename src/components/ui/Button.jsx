const Button = ({ children, onClick, className = "", type = "button" }) => {
    return (
      <button
        onClick={onClick}
        type={type}
        className={`btn btn-primary ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  