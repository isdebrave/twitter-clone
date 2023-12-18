import { useCallback, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

const useReactHookForm = (
  defaultValues: Record<string, string>,
  data: Record<string, any>
) => {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const watchAllFields = watch();

  const initializedForm = useCallback(() => {
    for (const key in watchAllFields) {
      clearErrors(key);
      setValue(key, data[key]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearErrors, setValue, data]);

  useEffect(() => {
    initializedForm();
  }, [data, setValue, initializedForm]);

  return { register, handleSubmit, errors, watchAllFields, initializedForm };
};

export default useReactHookForm;
