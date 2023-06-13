export interface ProductType{
    id:number,
    title:string,
    description:string,
    price:number,
    images:any
    tags:TagsType[]

    created_at:string,
    updated_at:string,
}

export interface TagsType{
    id:number,
    name:string,
    created_at:string,
    updated_at:string,

}