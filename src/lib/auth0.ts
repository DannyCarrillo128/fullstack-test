export const getAuth0Roles = async (userId: any) => {

  const resp = await fetch(`${ process.env.AUTH0_ISSUER_BASE_URL }/api/v2/users/${ userId }/roles`, {
    headers: {
      Authorization: `Bearer ${ process.env.AUTH0_MANAGEMENT_API_TOKEN }`,
    }
  });

  if (!resp.ok) {
    throw new Error('Falied fetch user roles.');
  }

  const roles = await resp.json();
  
  if (roles.length > 0) return roles[0].name;

  return 'user';

};
