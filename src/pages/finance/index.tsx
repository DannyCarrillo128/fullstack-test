import { useQuery } from '@apollo/client';

import { GET_MOVEMENTS } from '../../../lib/graphql/queries';
import { Movement } from '@/interfaces/Movement';

const Finance = () => {

  const { data, loading, error,  } = useQuery(GET_MOVEMENTS);
  const movements: Movement[] = data?.getMovements;

  return (
    <>
      { loading 
        ? <h1>Loading...</h1>
        : <div>
            {
              movements.map(((movement) => (
                <p key={ movement.id }>{ movement.concept } | { movement.amount } | { movement.createdAt } | { movement.user?.name } </p>
              )))
            }
          </div>
      }
      {
        error && <h1>Something went wrong.</h1>
      }
    </>
  );

};

export default Finance;
