import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "../../assets/svg/CloseIcon";
import { MainButton } from "../buttons/MainButton";

interface Props {
  isOpen: boolean;
  title: string;
  disabled?: boolean;

  onClose: () => void;
  onSubmit: () => void;
  body: React.ReactElement;
  actionLabel: string;
}

export const Modal = ({
  isOpen,
  title,
  onSubmit,
  disabled,
  body,
  onClose,
  actionLabel,
}: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (showModal && !disabled) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          
          handleClose();
        }
      };

      window.addEventListener("click", handleOutsideClick);

      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [showModal]);

  const handleClose = () => {
    if (disabled) {
      return null;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };
  const handleSubmit = () => {
    if (disabled) {
      return null;
    }
    onSubmit();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section className="fixed inset-0 w-full h-full z-[99] outline-none   overflow-x-hidden overflow-y-auto bg-neutral-800/90 flex justify-center items-centere">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto">
        <div
          className={`translate duration-300 h-full  flex justify-center items-center
                        ${showModal ? "translate-y-0" : "translate-y-full"}
                        ${showModal ? "opacity-100" : "opacity-0"}
                        `}
        >
          <div
            className="translate h-full md:h-auto border-0 rounded-lg 
            shadow-lg relative flex flex-col gap-[20px] w-full bg-white focus:outline-none p-4"
            ref={modalRef}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-neutral-900 font-bold text-[21px]">
                {title}
              </h1>
              <div className="w-8 cursor-pointer" onClick={handleClose}>
                <CloseIcon />
              </div>
            </div>
            {body}

            <div className="flex flex-col gap-[8px]">
              <MainButton disabled={disabled} full label={actionLabel} onClick={handleSubmit} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
