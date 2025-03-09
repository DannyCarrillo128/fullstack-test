import { ChangeEvent, useState } from 'react';

export const useForm = <T>(fields: T) => {

  const [formState, setFormState] = useState(fields);

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  const onReset = () => {
      setFormState(fields);
    };

  return { ...formState, formState, setFormState, onInputChange, onReset  };

};
