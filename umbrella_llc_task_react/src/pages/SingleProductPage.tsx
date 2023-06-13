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
    
    const {
        data,
        isLoading
    } = getSingleProduct(id)
    
    const [activeImage, setActiveImage] = useState<string | undefined>();
    const [showFullDescription,setShowFullDescription] = useState<boolean>(false)
    useEffect(() => {
        if (data?.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }
      }, [data]);


    if(!id){
        return <EmptyClient
            title='404'
            description='Product not found'
        />
    }
    
    
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
                <title>{data.title} | Product</title>
                <meta property="og:title" content={data.title} />
                <meta property="og:description" content={data.description} />
                <meta property="og:image" content={data.images[0]} />
            </Helmet>
            <Container>
                <div className=' pt-[50px] '>
                    <Link to='/' className='flex items-center gap-[20px] font-bold'><span className='!w-8 block'><Arrow_Left/></span> Back</Link>
                    <div className='flex justify-between pt-[70px] gap-[20px] lg:flex-row flex-col'>

                        <div className='basis-1/3 '>
                        <div className='w-full rounded-lg h-full'>
                            {data.images ?
                            <div className='flex flex-col gap-[10px]'>
                                <img src={activeImage} alt="MainImage" className=' h-[30rem] object-cover w-full' />
                                <div className='flex flex-wrap w-full justify-around gap-[5px]'>
                                    { data.images.length > 1 &&
                                        data.images.map((image:string)=>(                                         
                                            <img src={image} alt="Image" key={image} onClick={()=>setActiveImage(image)} className='sm:w-1/4 w-3/4 max-h-[8rem] object-cover cursor-pointer' />
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
                                {data.description.length > 1200 && !showFullDescription ? (
                                    <React.Fragment>
                                        {data.description.slice(0,1200)}
                                        <span className='text-[#21732b] cursor-pointer' onClick={()=>setShowFullDescription(true)}> ...More</span>
                                    </React.Fragment>
                            ): data.description }
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
    </React.Fragment>
  )
}
