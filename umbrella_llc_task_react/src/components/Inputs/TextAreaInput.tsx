import{
  UseFormRegister,
  FieldValues,
  FieldErrors
} from 'react-hook-form'

interface Props{
  id:string,
  label:string,
  placeholder:string,
  disabled?:boolean

  register:UseFormRegister<FieldValues>
  errors:FieldErrors,
  required?:boolean
}

export const TextAreaInput = ({
  id,
  label,
  placeholder,
  register,
  errors,
  required,
  disabled
}:Props) => {
  return (
    <div className='flex flex-col gap-[10px] w-full'>
      <label htmlFor={id} className='text-black font-bold' >{label}</label>
      <textarea
      disabled={disabled}
      className={`w-full rounded-xl px-[10px] py-[10px] border-[1px] h-[6rem] 
      border-solid  outline-none bg-transparent disabled:cursor-not-allowed disabled:opacity-90 transition-all druation-300
      ${errors[id] ? 'border-rose-500 text-rose-500' : 'border-lightBlue'}
      `} 
      placeholder={placeholder}
      {...register(id,{required})}
      />
    </div>
  )
}
