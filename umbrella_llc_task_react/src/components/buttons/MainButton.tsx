interface Props{
    label:string,
    onClick:()=>void,
    alternative?:boolean
    full?:boolean
    disabled?:boolean
}

export const MainButton = ({
    label,
    onClick,
    alternative,
    full,
    disabled,
}:Props) => {
  return (
    <button className={`py-2 px-4 h-fit  outline-none min-w-[6rem] rounded-lg !text-text
     disabled:cursor-not-allowed disabled:opacity-90 transition-all duration-300
    ${alternative ? ' bg-mainButton ' : 'bg-secondaryButton'}
    ${full ? 'w-full' : 'w-fit'}
    `}
    disabled={disabled}
     onClick={onClick}>
        {label}
    </button>
  )
}
