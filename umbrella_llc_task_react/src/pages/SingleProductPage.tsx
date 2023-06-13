import React,{useState,useEffect} from 'react'
import { Helmet } from "react-helmet-async";
import getSingleProduct from '../actions/getSingleProduct';
import { Link, useParams } from 'react-router-dom';
import { EmptyClient } from '../components/EmptyClient';
import { Loading } from '../assets/svg/Loading';
import { Container } from '../components/Container';
import { Arrow_Left } from '../assets/svg';

export const SingleProductPage = () => {
    const {
        id
    } = useParams()
    
    if(!id){
        return <EmptyClient
            title='404'
            description='Product not found'
        />
    }
    
    const {
        data,
        isLoading
    } = getSingleProduct(id)
    const [activeImage, setActiveImage] = useState<string | undefined>();


    useEffect(() => {
        if (data?.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      }, [data]);
    
    if(isLoading){
        return <Loading/>
    }
    if(!data){
        return <EmptyClient
        title='404'
        description='Product not found'
        />
    }
        
  return (
    <React.Fragment>
            <Helmet>
                <title>Product</title>
                <meta property="og:title" content="Job Task from UmbrelaLLC" />
                <meta property="og:description" content="Here is project made by me" />
            </Helmet>
            <Container>
                <div className=' pt-[50px] '>
                    <Link to='/' className='flex items-center gap-[20px] font-bold'><span className='!w-8 block'><Arrow_Left/></span> Back</Link>
                    <div className='flex justify-between pt-[70px] gap-[20px]'>

                        <div className='basis-1/3  max-h-[30rem]'>
                        <div className='w-full rounded-lg h-full'>
                            {data.images ?
                            <div className='flex flex-col gap-[10px]'>
                                <img src={activeImage} alt="MainImage" className='h-full max-h-[30rem] object-cover w-full' />
                                <div className='flex flex-wrap w-full justify-between gap-[5px]'>
                                    { data.images.length > 1 &&
                                        data.images.map((image:string)=>(                                         
                                            <img src={image} alt="Image" key={image} onClick={()=>setActiveImage(image)} className='w-1/4 max-h-[8rem] object-cover cursor-pointer' />
                                        ))
                                    }
                                </div>
                            </div>
                            
                            :
                            <img src='/ImageNotAvaiable.webp' alt="MainImage" className='h-full max-h-[30rem] object-cover w-full' />
                            }
                        </div>

                               </div>
                        <div className='basis-2/3'>
                            <h1 className='font-bold text-[38px] text-[#111111bf]'>{data.title}</h1>
                            <p className='text-secondaryButton font-medium text-[20px]'>${data.price}</p>
                            <p className='pt-[20px]'>
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
    </React.Fragment>
  )
}
