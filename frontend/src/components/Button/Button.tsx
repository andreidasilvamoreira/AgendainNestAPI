
import "./button.css";

type ButtonProps = {
  children: string;
};

const Button = ({children}: ButtonProps) => {
  return (
    <button className="all-button">
      {children}
    </button>
  );
};

export default Button;