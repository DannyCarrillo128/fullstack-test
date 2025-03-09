import { useQuery } from '@apollo/client';

import { GET_MOVEMENTS } from '../../../lib/graphql/queries';

const Finance = () => {

  const { data, loading, error,  } = useQuery(GET_MOVEMENTS);
  const movements: any[] = data?.getMovements;

  return (
    <>
      { loading 
        ? <h1>Loading...</h1>
        : <div>
            <h1>Finance works!</h1>
            <pre>{ JSON.stringify(movements) }</pre>
          </div>
      }
      {
        error && <h1>Something went wrong.</h1>
      }
    </>
  );

};

export default Finance;
