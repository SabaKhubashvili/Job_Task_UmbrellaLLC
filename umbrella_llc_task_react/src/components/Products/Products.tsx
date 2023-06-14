import {useEffect,useState} from 'react'
import { ProductType } from "../../types";
import { EmptyClient } from "../EmptyClient";
import getAllProducts from "../../actions/getAllProducts";
import { ProductComponent } from "./ProductComponent";
import { useSearchParams } from 'react-router-dom';
import { Loading } from '../../assets/svg/Loading';
import axios from 'axios';
import BaseUrl from '../../RestApi/AppUrl';
import { toast } from 'react-hot-toast';

interface Props{
  isAdmin?:boolean
}

export const Products = ({isAdmin}:Props) => {
  
  const{
    data,
    isError,
    isLoading
  } = getAllProducts()

  const [filteredProducts,setFilteredProducts] = useState<ProductType[]>()
  const [products,setProducts] = useState<ProductType[]>()
  //* Getting params

  const [searchParams] = useSearchParams()
  const searchTitle = searchParams.get('title');

  const searchPrice = searchParams.get('price')
  const searchArray = searchPrice && searchPrice.split(',').map(Number)

  
  const tagsParam = searchParams.get('tags')
  const tagsArray = tagsParam && tagsParam.split(',').map(Number) 


  useEffect(()=>{
    setProducts(data)
  },[data])
  
  useEffect(()=>{    

    if(products){
 
      const filtered =  products.filter((product:ProductType) => {
        
        const filters = [];
        
        if (searchTitle) {
            filters.push((product:ProductType) => product.title.includes(searchTitle));
          }
          
          if (searchArray) {
            filters.push((product:ProductType) => product.price >= searchArray[0] && product.price <= searchArray[1]);
          }
          
          if (tagsArray && tagsArray.length > 0) {
            filters.push((product:ProductType) => product.tags.some(tag => tagsArray.includes(tag.id)));
          }
        
        return filters.length === 0 || filters.every(filter => filter(product));
      })

      setFilteredProducts(filtered)      
  }  
  
},[searchTitle,searchPrice,tagsParam])
  
    if(isLoading){
      return  <div className='py-[10rem]'>
        <Loading/>
      </div>
    }

    if(isError){
      return <EmptyClient
        title="Something wrong happened"
        description="Try again"
      />
    }
    const handleDelete = (id:number) => {
      axios
        .delete(`${BaseUrl.DeleteProduct}/${id}`)
        .then((res) => {
          toast.success(res.data.message);
          setProducts(products?.filter((product) => product.id !== id));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    
  return (
    <div className='pt-[20px] flex justify-around flex-wrap gap-x-[3px]  gap-y-[15px]'>
      {
      filteredProducts ?
      filteredProducts.map((product:ProductType) => (
        <div  key={product.id} 
              className="xl:basis-1/5 lg:basis-1/3 md:basis-1/3 w-full "
       >
          <ProductComponent {...product} isAdmin={isAdmin} handleDelete={(id:number)=>handleDelete(id)} />
        </div>
      ))
      :
      products?.map((product:ProductType) => (
        <div  key={product.id} 
              className="xl:basis-1/6 lg:basis-1/5 md:basis-1/4 w-full "
       >
          <ProductComponent {...product}  isAdmin={isAdmin} handleDelete={(id:number)=>handleDelete(id)} />
        </div>
      ))
      
      }
    </div>
  );
};
