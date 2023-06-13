import { useQuery } from "react-query";
import RestClient from "../RestApi/RestClient";
import BaseUrl from "../RestApi/AppUrl";
import { ProductType } from "../types";


export default function(id:string){
    return useQuery<ProductType>('product',async()=>{
        const response = await RestClient.GetRequest(BaseUrl.getSingleProduct + `/${id}`)

        return response.data
    })
}