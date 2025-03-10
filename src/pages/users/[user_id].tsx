import { useEffect, FormEvent, type ReactElement, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

import { UPDATE_USER } from '../../../lib/graphql/mutations';
import { GET_USER_BY_ID } from '../../../lib/graphql/queries';
import { useForm } from '@/hooks/useForm';
import { Sidebar } from '@/components/Sidebar';

export const UserPage = () => {

  const router = useRouter();
  const { user_id } = router.query;

  const { name, role, onInputChange, setFormState } = useForm({
    name: '',
    role: ''
  });

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: user_id }
  });

  const user = data?.getUserById;

  useEffect(() => {
    if (user) {
      setFormState({
        name: user.name,
        role: user.role
      });
    }
  }, [user, setFormState]);

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

    alert('Usuario actualizado.');
  };

  return (
    <>
      {
        loading
        ? <Skeleton className="w-[500px] h-[310px] rounded-xl" />
        : <Card className="flex items-center w-[500px]">
            <CardHeader>
              <CardTitle>Edición de usuario</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={ handleUpdateUser }>
              <div className="grid w-full items-center gap-4 mb-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Nombre</Label>
                  <Input
                    type="text"
                    className="w-[300px]"
                    name="name"
                    value={ name }
                    onChange={ onInputChange }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Rol</Label>
                  <Select
                    name="role"
                    value={ role }
                    onValueChange={ (value) => setFormState(prevState => ({ ...prevState, role: value })) }
                  >
                    <SelectTrigger className="w-[300px]">
                      <SelectValue placeholder="Elige el rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="admin">Administrador</SelectItem>
                        <SelectItem value="user">Usuario</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid justify-items-center p-4">
                <Button type="submit">Guardar</Button>
              </div>
            </form>
            </CardContent>
          </Card>
      }
    </>
  );

};

UserPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default UserPage;
