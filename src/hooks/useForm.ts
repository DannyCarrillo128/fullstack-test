import { useState } from 'react';

export const useForm = <T>(fields: T) => {

  const [formState, setFormState] = useState(fields);

  const onInputChange = (event: any) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  return { ...formState, formState, onInputChange };

};
