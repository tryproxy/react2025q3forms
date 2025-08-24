import { UIForm } from '@/shared/uikit/ui-form';
import { UIInput } from '@/shared/uikit/ui-input';
import { useEffect, useState } from 'react';
import { signupFormSchema, type SignupFormData } from '../model/signup.schema';
import { useSignupStore } from '../model/use-signup-store';
import { UISelect } from '@/shared/uikit/ui-select';
import { treeifyError } from 'zod';
import { convertToBase64 } from '@/features/lib/convert-to-base64';
import { CountryAutocomplete } from '@/entities/country/CountryAutocomplete';

type Errors = Partial<Record<keyof SignupFormData, string>>;

type FormState = {
  name: string;
  age: string;
  email: string;
  gender: 'male' | 'female' | 'other' | '';
  password: string;
  confirmPassword: string;
  tos: boolean;
  pfp: File | null;
  country: string;
};

const initialFormState: FormState = {
  name: '',
  age: '',
  email: '',
  gender: '',
  password: '',
  confirmPassword: '',
  tos: false,
  pfp: null,
  country: '',
};

export function SignupFormControlled() {
  const [errors, setErrors] = useState<Errors | undefined>(undefined);
  const [userFormData, setUserFormData] =
    useState<Partial<FormState>>(initialFormState);
  const addEntry = useSignupStore((state) => state.addEntry);
  const entries = useSignupStore((state) => state.entries);

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const validate = (values: SignupFormData) => {
    const { error } = signupFormSchema.safeParse(values);

    if (error) {
      const { properties } = treeifyError(error);
      return {
        name: properties?.name?.errors?.[0],
        age: properties?.age?.errors?.[0],
        email: properties?.email?.errors?.[0],
        gender: properties?.gender?.errors?.[0],
        password: properties?.password?.errors?.[0],
        confirmPassword: properties?.confirmPassword?.errors?.[0],
        pfp: properties?.pfp?.errors?.[0],
        country: properties?.country?.errors?.[0],
      };
    }

    return;
  };

  const reset = () => {
    setUserFormData({});
    setErrors(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coersedFormData: SignupFormData = {
      ...formData,
      age: formData.age === '' ? 0 : Number(formData.age),
      gender: formData.gender as 'male' | 'female' | 'other',
      pfp: formData.pfp,
      country: formData.country,
    };

    const errors = validate(coersedFormData);

    console.log(errors, 'errors controlled');
    if (errors) {
      setErrors(errors);
      return;
    }

    let pfpBase64: null | string = null;
    if (formData.pfp) {
      pfpBase64 = await convertToBase64(formData.pfp);
    }

    addEntry({ ...coersedFormData, pfp: pfpBase64, mode: 'controlled' });
    reset();
    console.log('click submit', formData);
  };

  const handleChangeField = (
    { target }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    // { target }: unknown,
    fieldName: keyof SignupFormData
  ) => {
    let value: unknown = target.value;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      value = Boolean(target.checked);
    } else if (target instanceof HTMLInputElement && target.type === 'number') {
      value = Number(target.value);
    } else if (target instanceof HTMLInputElement && target.type === 'file') {
      value = target.files?.[0];
    }

    setUserFormData((prev) => ({ ...prev, [fieldName]: value }));

    const { error } = signupFormSchema.shape[fieldName].safeParse(value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error
        ? error.issues.map((issue) => issue.message).join(', ')
        : undefined,
    }));
  };

  // const hasErrors = errors && Object.values(errors).some((val) => !!val);
  useEffect(() => {
    console.log('zust', entries);
  }, [entries]);

  return (
    <UIForm onSubmit={handleSubmit}>
      <UIForm.Field label="Name" name="name" error={errors?.name}>
        <UIInput
          value={formData.name}
          type="text"
          id="name"
          name="name"
          onChange={(e) => handleChangeField(e, 'name')}
        />
      </UIForm.Field>

      <UIForm.Field label="Age" name="age" error={errors?.age}>
        <UIInput
          value={formData.age}
          type="number"
          id="age"
          name="age"
          onChange={(e) => handleChangeField(e, 'age')}
        />
      </UIForm.Field>
      <UIForm.Field label="Email" name="email" error={errors?.email}>
        <UIInput
          value={formData.email}
          type="email"
          id="email"
          name="email"
          onChange={(e) => handleChangeField(e, 'email')}
        />
      </UIForm.Field>

      <UIForm.Field label="Gender" name="gender" error={errors?.gender}>
        <UISelect
          value={formData.gender}
          id="gender"
          name="gender"
          onChange={(e) => handleChangeField(e, 'gender')}
        >
          <UISelect.Option disabled value="">
            Select Gender
          </UISelect.Option>
          <UISelect.Option value="female">Female</UISelect.Option>
          <UISelect.Option value="male">Male</UISelect.Option>
          <UISelect.Option value="other">Other</UISelect.Option>
        </UISelect>
      </UIForm.Field>

      <UIForm.Field label="Password" name="password" error={errors?.password}>
        <UIInput
          value={formData.password}
          type="password"
          id="password"
          name="password"
          onChange={(e) => handleChangeField(e, 'password')}
        />
      </UIForm.Field>

      <UIForm.Field
        label="Confirm password"
        name="confirmPassword"
        error={errors?.confirmPassword}
      >
        <UIInput
          value={formData.confirmPassword}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => handleChangeField(e, 'confirmPassword')}
        />
      </UIForm.Field>

      <UIForm.Field
        label="Choose your country"
        name="country"
        error={errors?.country}
      >
        <CountryAutocomplete
          value={formData.country}
          type="text"
          id="country"
          name="country"
          onChange={(e) => handleChangeField(e, 'country')}
        />
      </UIForm.Field>

      <UIForm.Field label="Profile picture" name="pfp" error={errors?.pfp}>
        <UIInput
          type="file"
          id="pfp"
          name="pfp"
          accept=".jpg,.jpeg,.png"
          className="file:bg-accent file:text-accent-foreground w-55 cursor-pointer file:rounded file:px-2 file:py-1 file:text-sm"
          onChange={(e) => handleChangeField(e, 'pfp')}
        />
      </UIForm.Field>

      <UIForm.Field label="Tearms of Service" name="tos" error={errors?.tos}>
        <UIInput
          checked={formData.tos}
          type="checkbox"
          id="tos"
          name="tos"
          className="accent-secondary h-5 w-5 cursor-pointer"
          onChange={(e) => handleChangeField(e, 'tos')}
        />
      </UIForm.Field>
      <UIForm.Submit>Sign Up</UIForm.Submit>
      <UIForm.Reset onClick={reset}>Reset</UIForm.Reset>
    </UIForm>
  );
}
