import { FormEvent, type ReactElement } from 'react';

import { useMutation } from '@apollo/client';
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
import { CircleCheckBig, CircleX } from 'lucide-react';
import { toast } from 'sonner';

import { ADD_MOVEMENT } from '../../../lib/graphql/mutations';
import { useForm } from '@/hooks/useForm';
import { Sidebar } from '@/components/Sidebar';

const NewMovement = () => {

  const userId = '7e281eb2-cd59-4bff-a77b-639c804d2bdb'; // TODO: Get userId from LocalStorage (Auth)

  const { concept, amount, createdAt, onInputChange, onReset, setFormState } = useForm({
    concept: '',
    amount: 0,
    createdAt: ''
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
    })
    .then(() => {
      onReset();
      toast('Operación exitosa.', {
        description: 'Movimiento registrado.',
        icon: <CircleCheckBig />,
        style: {
          background: '#C2FFB5',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    })
    .catch((error) => {
      toast('Algo salió mal.', {
        description: error || 'Parece que hubo un error.',
        icon: <CircleX />,
        style: {
          background: '#FFB5C0',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      });
    });

    
  };  

  return (
    <Card className="flex items-center w-[500px]">
      <CardHeader>
        <CardTitle>Nuevo movimiento financiero</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={ handleAddMovement }>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Concepto</Label>
              <Select
                name="concept"
                value={ concept }
                onValueChange={(value) => setFormState(prevState => ({ ...prevState, concept: value }))}
              >
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Elige el concepto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="income">Ingreso</SelectItem>
                    <SelectItem value="expense">Egreso</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Monto</Label>
              <Input
                type="number"
                className="w-[300px]"
                name="amount"
                value={ amount }
                onChange={ onInputChange }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Fecha</Label>
              <Input
                type="datetime-local"
                className="w-[300px]"
                name="createdAt"
                value={ createdAt }
                onChange={ onInputChange }
              />
            </div>
          </div>
          <div className="grid justify-items-center p-4">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );

};

NewMovement.getLayout = function getLayout(page: ReactElement) {
  return (
    <Sidebar>{ page }</Sidebar>
  );
};

export default NewMovement;
