import { useQuery } from "react-query";
import RestClient from "../RestApi/RestClient";
import BaseUrl from "../RestApi/AppUrl";


export default function getPrices() {
    return useQuery('prices',async()=>{
        const response  = await RestClient.GetRequest(BaseUrl.getPrices);
        return response.data
    })
}