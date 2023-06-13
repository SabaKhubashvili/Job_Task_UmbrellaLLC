import { Modal } from './Modal'
import { useCreateProductModal } from '../../hooks/useCreateProductModal'
import { useState } from 'react'
import { ImageUpload } from '../Inputs/ImageUpload'
import axios from 'axios'
import { TextInput } from '../Inputs/TextInput'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { TextAreaInput } from '../Inputs/TextAreaInput'
import { DropdownInput } from '../Inputs/DropdownInput'
import getAllTags from '../../actions/getAllTags'
import RestClient from '../../RestApi/RestClient'
import BaseUrl from '../../RestApi/AppUrl'
import { toast } from 'react-hot-toast'

enum STEPS {
  INFO = 1,
  IMAGE = 2
}

export const CreateProductModal = () => {
  const [activeStep, setActiveStep] = useState<STEPS>(STEPS.INFO)
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const{
    data:tags,
  }  = getAllTags()


  const productModal = useCreateProductModal()

  const{
    register,
    formState:{
      errors
    },
    handleSubmit,
    watch,
    setValue,
    reset
  } = useForm<FieldValues>({
    defaultValues:{

      title:'',
      description:'',
      images:[],
      tags:[]
    }
  })

   
  const formTags = watch('tags') as number[]
  const formImages = watch('images')
    
  const setCustomValue = (id: string, value: any) => {
      setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    };

    const addToTags = (tag: number) => {
      if (formTags.includes(tag)) {
        setCustomValue(
          "tags",
          formTags.filter((singleTag: number) => singleTag !== tag)
        );
      } else {
          setCustomValue("tags", [...formTags, tag]);
      }
    };

    

  const [images, setImages] = useState<string[]>([])
  const present_key = import.meta.env.VITE_CLOUDINARY_PRESET_KEY // Imported for safety from env but its foyk1zop
  const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME // djnatnzow

  // Image Upload
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && !isLoading) {
      setIsLoading(true)
      const imageFile = event.target.files[0];


      const formdata = new FormData();
      formdata.append('file', imageFile);
      formdata.append('upload_preset', present_key);

      axios
        .post(`https://api.cloudinary.com/v1_1/${cloud_name}/upload`, formdata)
        .then(res => {
          console.log(res);
          setImages(prev => [...prev, res.data.secure_url]);
          setCustomValue('images',[...formImages,res.data.secure_url])
        })
        .catch(error => {
          console.log(error);
        }).finally(()=>{
          setIsLoading(false)
        });
    }
  };

  // Modal Actions
  const onNext = () => {
    if (activeStep !== STEPS.IMAGE) {
      setActiveStep(prev => prev + 1)
    }
  }
  
  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    if(formTags.length === 0 ){
      return toast.error('At least one tag is required')
    }
    if (activeStep !== STEPS.IMAGE) {
      return onNext()
    }
  
      setIsLoading(true)
      RestClient.postRequest(BaseUrl.createProduct,data)
                .then(res=>{
                  toast.success(res.data.message)
                  reset()
                  productModal.onClose()
                  setActiveStep(STEPS.INFO)
                }).catch(()=>{
                    toast.error('Something went wrong')
                }).finally(()=>{
                  setIsLoading(false)                  
                })

  }
  
  // Modal Body
    let modalBody = (
      <div className='flex flex-col gap-[20px]'>
        <TextInput 
          id='title'
          label='Enter title'
          placeholder='title'
          disabled={isLoading}
          
          register={register}
          errors={errors}
          required
        />
        <TextAreaInput
          id='description'
          label='Enter Description'
          placeholder='description'
          disabled={isLoading}
          
          register={register}
          errors={errors}
          required  
        />
          <TextInput 
          id='price'
          label='Enter Price'
          placeholder='price'
          type='number'
          disabled={isLoading}

          register={register}
          errors={errors}
          required
        />
         <DropdownInput
            label='Select tags'
            placeholder='Tags'
            data={tags}
            checkedData={formTags}
            onChange={(value:number)=>{addToTags(value)}}
        />
      </div>
    )
    
    if (activeStep === STEPS.IMAGE) {
      modalBody = (
        <ImageUpload disabled={isLoading}  onChange={handleImage} values={images} />
      )
    }

  return (
    <Modal
      isOpen={productModal.isOpen}
      title='Create Product'
      onSubmit={handleSubmit(onSubmit)}
      onClose={() => { productModal.onClose() }}
      disabled={isLoading}
      body={modalBody}
      actionLabel={activeStep === STEPS.IMAGE ? "Submit" : "Next"}
    />
  )
}
