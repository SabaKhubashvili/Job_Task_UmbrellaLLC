import { Link } from "react-router-dom";

interface Props {
  label: string;
  to: string;
  alternative?: boolean;
}

export const LinkButton = ({ label, to, alternative }: Props) => {
  return (
    <Link
      className={`py-2 px-4  h-[3rem]  outline-none min-w-[6rem] rounded-lg !text-text
        ${alternative ? " bg-mainButton " : "bg-secondaryButton"}
        `}
    to={to}
    >
      {label}
    </Link>
  );
};
