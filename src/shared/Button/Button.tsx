import type {FC, PropsWithChildren, ReactNode} from "react";
import "./Button.css";

interface ButtonProps extends PropsWithChildren {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  className?: string;
  clickHandler?: () => void;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {children, className, clickHandler, disabled, type} = props;

  return (
    <button
      className={`btn ${className}`}
      onClick={clickHandler}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

