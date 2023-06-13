import { TextInput } from '../Inputs/TextInput'
import {useForm,FieldValues,SubmitHandler} from 'react-hook-form'
import { DropdownInput } from '../Inputs/DropdownInput'
import { MainButton } from '../buttons/MainButton'
import getAllTags from '../../actions/getAllTags'
import {useSearchParams } from 'react-router-dom';


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
            price:0,
            tags:[]
        }
    })

    const{
      data:tags,
    }  = getAllTags()
  
    
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
          ...data,
          tags: data.tags.join(',')
        };
    

        setSearchParams(query)
      };
    
  return (
    <section className='w-full flex gap-[20px] sm:flex-nowrap flex-wrap'>
        <TextInput
            id='title'
            label='Title'
            placeholder='enter title'
            register={register} errors={errors}
            />
        <TextInput
            id='price'
            label='Price'
            placeholder='enter price'
            type='number'
            register={register} errors={errors}
            />
        <DropdownInput
            label='Select tags'
            placeholder='Tags'
            data={tags}
            checkedData={formTags}
            onChange={(value:number)=>{addToTags(value)}}
        />
        <div className='flex justify-center items-end'>

            <MainButton
                onClick={handleSubmit(onSubmit)}
                label='Filter'
                />
        </div>
    </section>
  )
}
