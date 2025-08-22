import { UIForm } from '@/shared/uikit/ui-form';
import { UIInput } from '@/shared/uikit/ui-input';
import { signupSchema, type SignupData } from '../model/signup.schema';
import { useState } from 'react';

type Errors = Partial<Record<keyof SignupData, string>>;
type FormValues = {
  name: string;
  age: string;
};

export function SignupFormRHF() {
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<SignupData>({
    name: '',
    age: 0,
  });

  const validateForm = (form: FormValues) => {
    const { error, data, success } = signupSchema.safeParse(form);
    if (success) {
      setErrors({});
      setValues(data);
      return true;
    }

    if (error) {
      const { fieldErrors } = error.flatten();
      const errors = {
        name: fieldErrors.name?.[0],
        age: fieldErrors.age?.[0],
      };
      setErrors(errors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div>RHF</div>
    // <UIForm onSubmit={handleSubmit}>
    //   <UIForm.Field label="Name" name="name" error={''}>
    //     <UIInput type="text" id="name" name="name" />
    //   </UIForm.Field>

    //   <UIForm.Field label="Age" name="age" error={''}>
    //     <UIInput type="number" id="age" name="age" />
    //   </UIForm.Field>

    //   <UIForm.Submit>Sign Up</UIForm.Submit>
    //   <UIForm.Reset>Reset</UIForm.Reset>
    // </UIForm>
  );
}
