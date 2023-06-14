import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../../types';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

interface Props extends ProductType {
  isAdmin?: boolean;
  handleDelete?: (value: number) => void;
}

export const ProductComponent = ({
  id,
  title,
  description,
  images,
  price,
  tags,
  isAdmin,
  created_at,
  handleDelete,
}: Props) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const currentTime = new Date();
  const createdAtDate = new Date(created_at);
  const timeDifferenceInMilliseconds = currentTime.getTime() - createdAtDate.getTime();
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));

  const localstorageFavorites = localStorage.getItem('favorites');

  useEffect(() => {
    if (localstorageFavorites) {
      setFavorites(JSON.parse(localstorageFavorites));
    }
  }, [localstorageFavorites]);

  const handleToFavorites = () => {
    const favoritesArray = localStorage.getItem('favorites');
    
    if (!favoritesArray) {
      localStorage.setItem('favorites', JSON.stringify([id]));
    } else {
      const parsedFavorites = JSON.parse(favoritesArray);
      if (parsedFavorites.includes(id)) {
        const updatedFavorites = parsedFavorites.filter((favoriteId:number) => favoriteId !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      } else {
        parsedFavorites.push(id);

        setFavorites([id]);
        localStorage.setItem('favorites', JSON.stringify(parsedFavorites));
      }
    }
  };

  return (
    <div className='w-full bg-[#fafafa] rounded-lg h-full flex flex-col justify-between shadow-card relative'>
      {timeDifferenceInMinutes <= 60 && (
        <div className='absolute bg-red-600 text-white px-[10px] py-[3px] font-bold'>HOT!</div>
      )}

      <Link to={`/product/${id}`} className='h-[10rem] object-cover w-full'>
        {images && images[0] ? (
          <img src={images[0]} alt='MainImage' className='h-[10rem] object-cover w-full' />
        ) : (
          <img src='/ImageNotAvaiable.webp' alt='MainImage' className='h-[10rem] object-cover w-full' />
        )}
      </Link>
      <div className='p-[30px] flex flex-col gap-[18px] h-fit !justify-end'>
        <div className='flex flex-wrap'>
          {tags && tags.length > 0 && (
            <React.Fragment>
              {tags.map((tag, index) => (
                <p key={tag.id} className='text-[12px] font-bold text-[#ccc] uppercase'>
                  {tag.name}
                  {index !== tags.length - 1 && <span> • &nbsp; </span>}
                </p>
              ))}
            </React.Fragment>
          )}
        </div>
        <Link to={`/product/${id}`} className='font-medium text-[#363636] uppercase transition-all duration-300  hover:text-[#fbb72c]'>
          {title}
        </Link>
        <p className='text-[15px] leading-[22px] text-[#999]'>
          {description.length >= 30 ? description.slice(0, 30) + '...' : description}
        </p>
        <div className='w-full h-[1px] bg-[#eee]' />
        <div className='flex justify-between items-center'>
          <p className='text-[18px] text-[#fbb72c] font-semibold '>${price}</p>
          {isAdmin && handleDelete && (
            <button type='button' className='flex items-center text-red-700 font-medium' onClick={() => handleDelete(id)}>
              <BsFillTrashFill size={20} color={'red'} />
            </button>
          )}
          <button type='button' className='flex items-center text-red-700 font-medium' onClick={handleToFavorites}>
            {favorites?.includes(id) ? <AiFillHeart size={20} color={'red'} /> : <AiOutlineHeart size={20} color={'red'} />}
          </button>
        </div>
      </div>
    </div>
  );
};
