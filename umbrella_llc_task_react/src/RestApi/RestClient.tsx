import axios from "axios"


class RestClient{
    static GetRequest = (getUrl:string)=>{
        return axios.get(getUrl)
    }
    static postRequest = (getUrl:string,Data:any)=>{
        return axios.post(getUrl,Data)
    }
}

export default RestClient