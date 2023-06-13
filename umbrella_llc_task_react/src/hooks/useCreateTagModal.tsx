import {create} from 'zustand'

interface TagStorage{
    isOpen:boolean,
    onOpen:()=>void
    onClose:()=>void
}

export const useCreateTagModal = create<TagStorage>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))