import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import type { ObjectSchema } from 'yup';
import { ValidationError } from 'yup';

import { formState, formErros } from '@/store/form.slice';

type Params<InitialValues> = {
  initialValues: InitialValues;
  onSubmit: (values: InitialValues) => void | Promise<void>;
  validationSchema: ObjectSchema<any>;
};

type Return<InitialValues> = {
  handleChange: <T>(changeEvent: ChangeEvent<T>) => void;
  handleSubmit: (formEvent: FormEvent) => void;
  values: InitialValues;
  errors: Record<keyof InitialValues, string>;
};

export function useForm<T>({
  initialValues,
  onSubmit,
  validationSchema,
}: Params<T>): Return<T> {
  const [form, setForm] = useRecoilState(formState(initialValues));
  const [errors, setFormErrors] = useRecoilState(formErros);

  const handleChange = useCallback(
    ({ target }: ChangeEvent<any>) =>
      setForm((old) => ({
        ...old,
        [target.name]: target?.value,
      })),
    [setForm]
  );

  const handleSubmit = useCallback(
    async (formEvent: FormEvent) => {
      formEvent.preventDefault();
      try {
        setFormErrors({});

        if (validationSchema) {
          const value = await validationSchema.validate(form, {
            abortEarly: false,
          });

          await onSubmit(value);

          return;
        }

        onSubmit(form as T);
      } catch (e) {
        if (e instanceof ValidationError) {
          const parsedErrros = e.inner.reduce((acc, current) => {
            acc[current.path || ''] = current.message;

            return acc;
          }, {} as any);

          console.log({
            parsedErrros,
          });

          setFormErrors(parsedErrros);

          return;
        }

        throw e;
      }
    },
    [form, onSubmit, setFormErrors, validationSchema]
  );

  return {
    errors: errors as Record<keyof T, string>,
    handleChange,
    handleSubmit,
    values: form as T,
  };
}
