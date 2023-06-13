import { Modal } from "./Modal";
import { useState } from "react";
import { TextInput } from "../Inputs/TextInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import RestClient from "../../RestApi/RestClient";
import BaseUrl from "../../RestApi/AppUrl";
import { useCreateTagModal } from "../../hooks/useCreateTagModal";
import { toast } from "react-hot-toast";

export const CreatetagModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const tagModal = useCreateTagModal();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    
    RestClient.postRequest(BaseUrl.createTag, data)
      .then(() => {
        reset()
        tagModal.onClose()
        toast.success('Sucesfully created tag')
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Modal Body
  let modalBody = (
    <div className="flex flex-col gap-[20px]">
      <TextInput
        id="name"
        label="Enter Tag name"
        placeholder="tag"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      isOpen={tagModal.isOpen}
      title="Create Product"
      onSubmit={handleSubmit(onSubmit)}
      onClose={() => {
        tagModal.onClose();
      }}
      disabled={isLoading}
      body={modalBody}
      actionLabel="Submit"
    />
  );
};
