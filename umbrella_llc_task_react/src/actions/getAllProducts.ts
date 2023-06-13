import { useQuery } from "react-query";
import RestClient from "../RestApi/RestClient";
import BaseUrl from "../RestApi/AppUrl";


export default function getAllProducts(){
    return useQuery('post',async()=>{
        const response  = await RestClient.GetRequest(BaseUrl.getProducts);
        return response.data
    })
}