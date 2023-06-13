import React from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'

interface Props{
    onChange:(event: React.ChangeEvent<HTMLInputElement>)=>void,
    values?:string[],
    disabled?:boolean,
}

export const ImageUpload = ({
    onChange,
    values,
    disabled,
}:Props) => {
 

  return (
    <div className='flex justify-center items-center flex-col gap-[20px]'>
      { values ? 
      <React.Fragment>
        {values.map((value,index)=>(
          <img src={value} key={index} className={` ${values[0] === value ? "w-full h-full max-h-[20rem] object-cover" : 'w-1/2 h-1/2 max-h-[10rem] object-cover' } `} alt="" />
          ))
        }

        <label className=" flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <AiOutlineCloudUpload size={50} color='black' />
              <span className="mt-2 text-base leading-normal text-black">Select a Image</span>
              <input disabled={disabled} type='file'  accept="image/*"  className="hidden" onChange={onChange} />
        </label>
      </React.Fragment>
      :

        <div className="flex flex-col gap-[10px] w-full items-center justify-center bg-grey-lighter">
          <label className=" flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
              <AiOutlineCloudUpload size={50} />
              <span className="mt-2 text-base leading-normal">Select a Image</span>
              <input disabled={disabled} type='file'  accept="image/*"  className="hidden" onChange={onChange} />
          </label>
      </div>
        }
    </div>
  )
}
