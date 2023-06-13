import { useQuery } from "react-query";
import RestClient from "../RestApi/RestClient";
import BaseUrl from "../RestApi/AppUrl";


export default function GetAllTags() {
    return useQuery('tags',async()=>{
        const response  = await RestClient.GetRequest(BaseUrl.getTags);
        return response.data
    })
}