import {create} from 'zustand'

interface ProductStorage{
    isOpen:boolean,
    onOpen:()=>void
    onClose:()=>void
}

export const useCreateProductModal = create<ProductStorage>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))