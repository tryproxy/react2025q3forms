import { UIForm } from '@/shared/uikit/ui-form';
import { UIInput } from '@/shared/uikit/ui-input';
import { useEffect, useState } from 'react';
import { signupFormSchema, type SignupFormData } from '../model/signup.schema';
import { useSignupStore } from '../model/use-signup-store';
import { UISelect } from '@/shared/uikit/ui-select';
import { treeifyError } from 'node_modules/zod/v4/core/errors';
import { convertToBase64 } from '@/features/lib/convert-to-base64';

// type ErrorsOf<T> = {
//   [K in keyof T]?: T[K] extends object ? ErrorsOf<T[K]> : string;
// };
type Errors = Partial<Record<keyof SignupFormData, string>>;
// type Errors = ErrorsOf<SignupData>;
// type Errors = {
//   name?: string[];
//   age?: string[];
//   email?: string[];
//   gender?: string[];
//   auth?: {
//     password?: string[];
//     confirmPassword?: string[];
//   };
// };

export function SignupFofmUncontrolled() {
  const [errors, setErrors] = useState<Errors>({});
  const addEntry = useSignupStore((state) => state.addEntry);
  const entries = useSignupStore((state) => state.entries);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const form = new FormData(e.currentTarget);

    const { data, error } = signupFormSchema.safeParse({
      name: form.get('name') ?? '',
      age: form.get('age') ?? '',
      email: form.get('email') ?? '',
      gender: form.get('gender') ?? '',
      password: form.get('password') ?? '',
      confirmPassword: form.get('confirmPassword') ?? '',
      tos: form.get('tos') === 'on',
      pfp: form.get('pfp') ?? '',
    });

    if (error) {
      const { properties } = treeifyError(error);
      const errors: Errors = {
        name: properties?.name?.errors?.[0],
        age: properties?.age?.errors?.[0],
        email: properties?.email?.errors?.[0],
        gender: properties?.gender?.errors?.[0],
        password: properties?.password?.errors?.[0],
        confirmPassword: properties?.confirmPassword?.errors?.[0],
        tos: properties?.tos?.errors?.[0],
        pfp: properties?.pfp?.errors?.[0],
      };
      console.log(errors, 'errors?');
      setErrors(errors);
      return;
    }

    let pfpBase64 = '';
    if (form.get('pfp')) {
      pfpBase64 = await convertToBase64(form.get('pfp') as File);
    }

    addEntry({
      ...data,
      pfp: pfpBase64,
      mode: 'uncontrolled',
    });
    e.currentTarget.reset();
    console.log('click submit', data);
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

      <UIForm.Field label="Email" name="email" error={errors.email}>
        <UIInput type="email" id="email" name="email" />
      </UIForm.Field>

      <UIForm.Field label="Gender" name="gender" error={errors.gender}>
        <UISelect id="gender" name="gender" defaultValue="">
          <UISelect.Option disabled value="">
            Select gender
          </UISelect.Option>
          <UISelect.Option value="female">Female</UISelect.Option>
          <UISelect.Option value="male">Male</UISelect.Option>
          <UISelect.Option value="other">Other</UISelect.Option>
        </UISelect>
      </UIForm.Field>

      <UIForm.Field label="Password" name="password" error={errors.password}>
        <UIInput type="password" id="password" name="password" />
      </UIForm.Field>
      <UIForm.Field
        label="Confirm password"
        name="confirmPassword"
        error={errors.confirmPassword}
      >
        <UIInput type="password" id="confirmPassword" name="confirmPassword" />
      </UIForm.Field>

      <UIForm.Field label="ToS" name="tos" error={errors.tos}>
        <UIInput type="checkbox" id="tos" name="tos" />
      </UIForm.Field>

      <UIForm.Field label="Profile picture" name="pfp" error={errors.pfp}>
        <UIInput type="file" id="pfp" name="pfp" accept=".jpg,.jpeg,.png" />
      </UIForm.Field>

      <UIForm.Submit>Sign Up</UIForm.Submit>
      <UIForm.Reset>Reset</UIForm.Reset>
    </UIForm>
  );
}
