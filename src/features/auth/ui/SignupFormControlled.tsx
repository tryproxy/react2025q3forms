import { UIForm } from '@/shared/uikit/ui-form';
import { UIInput } from '@/shared/uikit/ui-input';
import { useEffect, useState } from 'react';
import { signupSchema, type SignupData } from '../model/signup.schema';
import { useSignupStore } from '../model/use-signup-store';

type Errors = Partial<Record<keyof SignupData, string>>;
type FormState = {
  name: string;
  age: string;
};

const initialFormState: FormState = {
  name: '',
  age: '',
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

  const validate = (values: SignupData) => {
    const { error } = signupSchema.safeParse(values);
    if (error) return error.format();
    return;
  };

  const reset = () => {
    setUserFormData({});
    setErrors(undefined);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const coersedFormData: SignupData = {
      ...formData,
      age: formData.age === '' ? 0 : Number(formData.age),
    };

    const errors = validate(coersedFormData);

    if (errors) return;

    addEntry({ ...coersedFormData, mode: 'controlled' });
    reset();
    console.log('click submit', formData);
  };

  const handleOnChangeField = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof SignupData
  ) => {
    const rawValue = e.target.value;

    setUserFormData((prev) => ({ ...prev, [fieldName]: rawValue }));

    const valueForValidation =
      fieldName === 'age' && rawValue !== '' ? Number(rawValue) : rawValue;

    const singleFieldSchema = signupSchema.shape[fieldName];
    const result = singleFieldSchema.safeParse(valueForValidation);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: result.error
        ? result.error.issues.map((issue) => issue.message).join(', ')
        : undefined,
    }));
  };

  const hasErrors = errors && Object.values(errors).some((val) => !!val);

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
          onChange={(e) => handleOnChangeField(e, 'name')}
        />
      </UIForm.Field>

      <UIForm.Field label="Age" name="age" error={errors?.age}>
        <UIInput
          value={formData.age}
          type="number"
          id="age"
          name="age"
          onChange={(e) => handleOnChangeField(e, 'age')}
        />
      </UIForm.Field>

      <UIForm.Submit disabled={hasErrors}>Sign Up</UIForm.Submit>
      <UIForm.Reset onClick={reset}>Reset</UIForm.Reset>
    </UIForm>
  );
}
