import { useQuery } from "react-query";
import RestClient from "../RestApi/RestClient";
import BaseUrl from "../RestApi/AppUrl";
import { ProductType } from "../types";


export default function getFavorites(favorites?:number[]){
    return useQuery<ProductType[]>(['favorites',favorites],async()=>{
        const response  = await RestClient.postRequest(BaseUrl.getFavorites,{favorites});
        return response.data
    },{
        enabled:!!favorites?.length,
    })
}