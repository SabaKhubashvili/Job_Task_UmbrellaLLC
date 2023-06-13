import React from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import { BsFillTrashFill } from 'react-icons/bs';

interface Props extends ProductType {
  isAdmin?: boolean;
  handleDelete:(value:number)=>void
}

export const ProductComponent = ({
  id,
  title,
  description,
  images,
  price,
  tags,
  isAdmin,
  handleDelete
}: Props) => {


  return (
    <div className='w-full bg-[#e3ede2] p-3  rounded-lg h-full flex flex-col justify-between'>
      <Link to={`/product/${id}`} className='h-[10rem] object-cover w-full'>
        {images[0] ? (
          <img src={images[0]} alt='MainImage' className='h-[10rem] object-cover w-full' />
        ) : (
          <img src='/ImageNotAvaiable.webp' alt='MainImage' className='h-[10rem] object-cover w-full' />
        )}
      </Link>
      <div className='pt-[10px] flex flex-col gap-[4px] h-fit !justify-end'>
        <h2 className='font-medium'>{title}</h2>
        <p>{description.length >= 30 ? description.slice(0, 30) + '...' : description}</p>
        <h4>${price}</h4>
        <div className='flex flex-wrap'>
          {tags.length > 0 && (
            <React.Fragment>
              Tags: &nbsp;
              {tags.map((tag, index) => (
                <p key={tag.id}>
                  {tag.name}
                  {index !== tags.length - 1 && <span> • &nbsp; </span>}
                </p>
              ))}
            </React.Fragment>
          )}
        </div>
        {isAdmin && (
          <div className='pt-[10px] flex gap-[10px]' onClick={()=>handleDelete(id)}>
            <button type='button' className='flex items-center text-red-700 font-medium'>
              <BsFillTrashFill size={20} color={'red'} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
