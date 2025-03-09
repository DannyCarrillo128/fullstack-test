import Link from 'next/link';

import { useQuery } from '@apollo/client';

import { GET_USERS } from '../../../lib/graphql/queries';
import { User } from '@/interfaces/User';

export const Users = () => {

  const { data, loading, error } = useQuery(GET_USERS);
  const users = data?.getUsers;

  return (
    <>
      { loading 
        ? <h1>Loading...</h1>
        : <div>
            {
              users.map((user: User) => (
                <div key={ user.id }>
                  <Link href={ `${ process.env.NEXT_PUBLIC_URL }/users/${ user.id }` }>
                    { user.name }
                  </Link>
                  <br />
                </div>
              ))
            }
          </div>
      }
      {
        error && <h1>Something went wrong.</h1>
      }
    </>
  );

};

export default Users;
