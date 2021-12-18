import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const IconButton = (props: Props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={"flex hover:bg-dark-300 rounded-full p-2 " + className}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;