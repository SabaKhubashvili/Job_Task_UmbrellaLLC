import { TextInput } from '../Inputs/TextInput'
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import { DropdownInput } from '../Inputs/DropdownInput'
import { MainButton } from '../buttons/MainButton'
import getAllTags from '../../actions/getAllTags'
import {useSearchParams } from 'react-router-dom';
import { Slider } from 'antd'
import getPrices from '../../actions/getPrices'


export const Filter = () => {

  const [,setSearchParams] = useSearchParams()

  
    const{
        register,
        handleSubmit,
        formState:{
            errors
        },
        setValue,
        watch
    } = useForm<FieldValues>({
        defaultValues:{
            title:'',
            price:[],
            tags:[]
        }
    })

    const{
      data:tags,
    }  = getAllTags()
    const{
      data:prices,

    } = getPrices()
  
    
    const formTags = watch('tags') as number[]

    
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
      
      const onSubmit: SubmitHandler<FieldValues> = (data) => {

        const query: any = {
          title: data.title,
          price: data.price.join(','),
          tags: data.tags.join(',')
        };
    

        

        setSearchParams(query)
      };
    
    
  return (
    <section className='w-full flex gap-[20px] md:flex-nowrap flex-wrap items-end'>
        <TextInput
            id='title'
            label='Title'
            placeholder='enter title'
            register={register} errors={errors}
            />
        {/* <TextInput
            id='price'
            label='Price'
            placeholder='enter price'
            type='number'
            register={register} errors={errors}
            /> */}
        <DropdownInput
            label='Select tags'
            placeholder='Tags'
            data={tags}
            checkedData={formTags}
            onChange={(value:number)=>{addToTags(value)}}
        />
            <div className='w-full flex flex-col gap-[10px] '>
              <h1 className='font-bold text-black'>Price range</h1>
              {
                prices &&
              <Slider range  onChange={(value:[number,number])=>{setCustomValue('price',value)}} max={prices[0]} min={prices[1]} disabled={false} 
               className='w-full'/>
              }
            </div>
        <div className='flex justify-center items-end'>

            <MainButton
                onClick={handleSubmit(onSubmit)}
                label='Filter'
                />
        </div>
    </section>
  )
}
