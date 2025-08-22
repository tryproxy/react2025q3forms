import { UIForm } from '@/shared/uikit/ui-form';
import { UIInput } from '@/shared/uikit/ui-input';
import { useEffect, useState } from 'react';
import { signupSchema, type SignupData } from '../model/signup.schema';
import { useSignupStore } from '../model/use-signup-store';

type Errors = Partial<Record<keyof SignupData, string>>;

export function SignupForm() {
  const [errors, setErrors] = useState<Errors>({});
  const addEntry = useSignupStore((state) => state.addEntry);
  const entries = useSignupStore((state) => state.entries);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = new FormData(e.currentTarget);
    const { data, error } = signupSchema.safeParse({
      name: form.get('name') ?? '',
      age: form.get('age') ?? '',
    });

    if (error) {
      const { fieldErrors } = error.flatten();
      const errors = {
        name: fieldErrors.name?.[0],
        age: fieldErrors.age?.[0],
      };
      setErrors(errors);
      return;
    }

    addEntry({ ...data, mode: 'vanilla' });
    e.currentTarget.reset();
    console.log('click submit', data, 'zustand', entries);
  };

  useEffect(() => console.log(entries, 'zust'));
  return (
    <UIForm onSubmit={handleSubmit}>
      <UIForm.Field label="Name" name="name" error={errors.name}>
        <UIInput type="text" id="name" name="name" />
      </UIForm.Field>

      <UIForm.Field label="Age" name="age" error={errors.age}>
        <UIInput type="number" id="age" name="age" />
      </UIForm.Field>

      <UIForm.Submit>Sign Up</UIForm.Submit>
      <UIForm.Reset>Reset</UIForm.Reset>
    </UIForm>
  );
}
