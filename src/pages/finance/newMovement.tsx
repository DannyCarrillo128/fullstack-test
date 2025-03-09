import type { FormEvent } from 'react';

import { useMutation } from '@apollo/client';

import { ADD_MOVEMENT } from '../../../lib/graphql/mutations';
import { useForm } from '@/hooks/useForm';

const NewMovement = () => {

  const userId = '7e281eb2-cd59-4bff-a77b-639c804d2bdb'; // TODO: Get userId from LocalStorage (Auth)

  const { concept, amount, createdAt, onInputChange, onReset } = useForm({
    concept: '',
    amount: 0,
    createdAt: Date.now()
  });

  const [addMovement] = useMutation(ADD_MOVEMENT, {
    variables: { id: userId, concept, amount, createdAt }
  });

  const handleAddMovement = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addMovement({
      variables: {
        id: userId,
        concept,
        amount: Number(amount),
        createdAt: new Date(createdAt).toISOString()
      }
    });

    onReset();
  };  

  return (
    <>
      <h1>Nuevo movimiento financiero</h1>
      <form onSubmit={ handleAddMovement }>
        <select
          name="concept"
          value={ concept }
          onChange={ onInputChange }
        >
          <option value="">Elige el concepto</option>
          <option value="income">Ingreso</option>
          <option value="expense">Egreso</option>
        </select>
        <input
          type="number"
          name="amount"
          value={ amount }
          onChange={ onInputChange }
        />
        <input
          type="datetime-local"
          name="createdAt"
          value={ createdAt }
          onChange={ onInputChange }
        />
        <button type="submit">Crear</button>
      </form>
    </>
  );

};

export default NewMovement;
