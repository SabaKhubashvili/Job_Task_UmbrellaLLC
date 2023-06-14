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
        if (data?.images && data.images[0]) {
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
        return <div className='py-[12rem]'>
            <Loading/>
        </div> 
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
                <meta property="og:image" content={data.images && data.images[0] ? data.images[0] : '/ImageNotAvailable.webp'} />
            </Helmet>
            <Container>
                <div className=' pt-[50px] '>
                    <Link to='/' className='flex items-center gap-[20px] font-bold'><span className='!w-8 block'><Arrow_Left/></span> Back</Link>
                    <div className='flex justify-between pt-[70px]  lg:flex-row flex-col'>

                        <div className='basis-1/3 '>
                        <div className='w-full rounded-lg h-full'>
                            {data.images ?
                            <div className='flex flex-col gap-[10px]'>
                                <img src={activeImage} alt="MainImage" className=' h-[30rem] object-cover w-full' />
                                <div className='flex flex-wrap w-full justify-around gap-[5px]'>
                                    { data.images.length > 1 &&
                                        data.images.map((image:string)=>(          
                                            <React.Fragment>

                                            <img src={image} alt="Image" key={image} onClick={()=>setActiveImage(image)} className='sm:w-1/4 w-3/4 h-[8rem]  object-cover cursor-pointer select-none' draggable={false} />
                                            </React.Fragment>                               
                                        ))
                                    }
                                </div>
                            </div>
                            
                            :
                            <img src='/ImageNotAvaiable.webp' alt="MainImage" className='h-full max-h-[30rem] object-cover w-full' />
                            }
                        </div>

                        </div>
                        <div className='basis-2/3 pl-[20px] bg-white flex flex-col justify-center'>
                            <h2 className=' md:text-[32px] text-[25px] leading-[38px] tracking-[0.19em] font-abezze'>PRODUCT</h2>
                            <h1 className='font-didot  font-bold leading-[58px] md:text-[48px] text-[30px]'>{data.title}</h1>
                            <p className='pt-[10px] font-poppins'>
                            {data.description.length > 1200 && !showFullDescription ? (
                                <React.Fragment>
                                    {data.description.slice(0,1200)}
                                    <span className='text-[#21732b] cursor-pointer' onClick={()=>setShowFullDescription(true)}> ...More</span>
                                </React.Fragment>
                            ): data.description } 
                            </p>
                            <div className='flex flex-wrap pt-[10px]'>
                                { data.tags && data.tags.length > 0 && (
                                    <React.Fragment>
                                    {data.tags.map((tag, index) => (
                                        <p key={tag.id} className='text-[12px] font-bold text-[#ccc]  uppercase'>
                                        {tag.name}
                                        {index !== data.tags.length - 1 && <span> • &nbsp; </span>}
                                        </p>
                                    ))}
                                    </React.Fragment>
                                )}
                            </div>
                            <p className='leading-[72px] md:text-[48px] text-[30px] font-poppins font-extralight pt-[30px]'> ${data.price}</p>  
                        </div>
                    </div>
                </div>
            </Container>
    </React.Fragment>
  )
}

