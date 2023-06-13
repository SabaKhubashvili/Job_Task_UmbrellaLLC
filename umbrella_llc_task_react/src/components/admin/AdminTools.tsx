import { useCreateProductModal } from '../../hooks/useCreateProductModal'
import { useCreateTagModal } from '../../hooks/useCreateTagModal'
import { MainButton } from '../buttons/MainButton'

export const AdminTools = () => {
    const productModal = useCreateProductModal()
    const tagModal = useCreateTagModal()

        
  return (
    <section className='flex gap-[10px] pt-[20px] pb-[30px] sm:flex-nowrap flex-wrap'>
        <MainButton onClick={()=>{productModal.onOpen()}} label='Create Product'/>
        <MainButton onClick={()=>{tagModal.onOpen()}} label='Create Tag'/>
    </section>
  )
}
