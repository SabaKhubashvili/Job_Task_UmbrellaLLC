import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '../components/Container';
import getFavorites from '../actions/getFavorites';
import { ProductType } from '../types';
import { Loading } from '../assets/svg/Loading';
import { ProductComponent } from '../components/Products/ProductComponent';
import { Link } from 'react-router-dom';
import { Arrow_Left } from '../assets/svg';
import { EmptyClient } from '../components/EmptyClient';

export const Favorites = () => {
    const localstorageFavorites = localStorage.getItem('favorites');
    const [favoriteIds, setFavoritesIds] = React.useState<number[]>();

    const { data, isLoading } = getFavorites(favoriteIds);

  React.useEffect(() => {
    if (localstorageFavorites) {
        setFavoritesIds(JSON.parse(localstorageFavorites));
    }
  }, [localstorageFavorites]);
;
  if(isLoading){
    return <Loading/>
  }


  return (
    <React.Fragment>
      <Helmet>
        <title>{'Favorites'}</title>
        <meta property="og:title" content="Job Task from UmbrelaLLC" />
        <meta property="og:description" content="Here is project made by me" />
      </Helmet>
      <Container>
        <main className="w-full h-full pt-[30px] ">
        <Link to='/' className='flex items-center gap-[20px] font-bold'><span className='!w-8 block'><Arrow_Left/></span> Back</Link>
                <h1 className='text-center font-bold md:text-[48px] text-[30px]'>Favorites</h1>
            <div className='flex justify-around flex-wrap gap-x-[3px]  gap-y-[15px] pt-[50px]'>

            { data ?
                data.map((product:ProductType) => (
                    <div  key={product.id} 
                    className="xl:basis-1/6 lg:basis-1/5 md:basis-1/4 w-full "
                    >
                      <ProductComponent {...product}  />
                    </div>
                  ))
                  :
                  <EmptyClient
                  title='There are not favorites'
                  description='Try and favorite some'
              />
            }
                </div>
        </main>
      </Container>
    </React.Fragment>
  );
};
