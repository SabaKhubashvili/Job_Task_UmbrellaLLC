
interface Props{
    title:string,
    description:string
}

export const EmptyClient = ({
    title,
    description
}:Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-center flex-col pt-[150px]">
        <h1 className="font-bold text-[40px]">{title}</h1>
        <h5 className="text-[20px]">{description}</h5>
    </div>
  )
}
