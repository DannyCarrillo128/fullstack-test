import type { FormEvent } from 'react';
import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@apollo/client';

import { GET_USER_BY_ID } from '../../../lib/graphql/queries';
import { useForm } from '@/hooks/useForm';
import { UPDATE_USER } from '../../../lib/graphql/mutations';

export const UserPage = () => {

  const router = useRouter();
  const { user_id } = router.query;

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: user_id }
  });

  const user = data?.getUserById;

  const { name, role, onInputChange } = useForm({
    name: user.name,
    role: user.role
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    variables: { id: user_id, name, role }
  });

  const handleUpdateUser = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateUser({
      variables: {
        id: user_id,
        name,
        role
      }
    });
  };

  return (
    <>
      {
        loading
        ? <h1>Loading...</h1>
        : <div>
            <h1>Editar usuario</h1>
            <form onSubmit={ handleUpdateUser }>
              <input
                type="text"
                name="name"
                value={ name }
                onChange={ onInputChange }
              />
              <select
              name="role"
                value={ role }
                onChange={ onInputChange }
                >
                <option value="">Elige el rol</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
              <button type="submit">Actualizar</button>
            </form>
          </div>
      }
      {
        error && <h1>Something went wrong.</h1>
      }
    </>
  );

};

export default UserPage;
