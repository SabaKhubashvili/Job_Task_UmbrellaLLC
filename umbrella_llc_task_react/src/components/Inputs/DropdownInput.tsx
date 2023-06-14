import React from "react";
import { Dropdown_downIcon } from "../../assets/svg";
import { TagsType } from "../../types";

interface Props {
  data: TagsType[];
  checkedData:number[]
  label: string;
  placeholder: string;
  onChange: (value: number) => void;
}

export const DropdownInput = ({
  data,
  label,
  placeholder,
  onChange,
  checkedData
}: Props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (event: MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node) && !dropdownRef.current?.contains(event.target as Node) ){
            setIsOpen(false)
        }
      };
      window.addEventListener('click',handleOutsideClick)
      return () =>  window.addEventListener('click',handleOutsideClick)
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-[10px]  w-full relative">
      <div className="text-black font-bold">{label}</div>

      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full rounded-xl px-[10px] py-[10px] border-[1px] cursor-pointer 
            border-solid  outline-none bg-transparent border-lightBlue h-full flex justify-between items-center select-none"
        ref={ref}
      >
        <h4 className="text-charocal">{placeholder}</h4>
        <div className="w-6">
          <Dropdown_downIcon />
        </div>
      </div>
      {isOpen && (
        <div className="w-full mx-auto absolute z-[100] top-[5.5rem] bg-white p-2 rounded-lg flex flex-col gap-[7px]" ref={dropdownRef}>
          {data.map((tag) => (
            <div className="flex justify-between cursor-pointer" key={tag.id} onClick={()=>onChange(tag.id)}>
              <h5>{tag.name}</h5>
              <input type="checkbox" 
              onChange={() =>{onChange(tag.id)}}
              checked={checkedData.includes(tag.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
