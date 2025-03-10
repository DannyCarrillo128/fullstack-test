## How to deploy the project locally
- Clone the repository ```git clone git@github.com:DannyCarrillo128/fullstack-test.git```.
- Install dependencies with ```npm i```.
- Create a ```.env``` file in the root directory and set the variables.
- Copy and paste the following into your ```.env``` file:
```
DATABASE_URL="postgresql://postgres:admin@db.xhrheteqianjswqfxvaa.supabase.co:5432/postgres"
NEXT_PUBLIC_URL="http://localhost:3000"
GRAPHQL_URL="http://localhost:3000/api/graphql"
AUTH_SECRET="k1q3d096u5sd3737f8sa1sf3i51df38gf1h5g35j7em5127sa"
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL="https://dev-xjdograpogvrdpev.us.auth0.com"
AUTH0_CLIENT_ID="29F4IEgu5jIuH3jIRsyIEu2Aw7AVFNi8"
AUTH0_CLIENT_SECRET="PcnQNwUG-7dSHM8sqShRUQtxEcVd46a60vESrEEoSvvde6aKgkygAAgkGebKWYPS"
```
- Run the application using ```npm run dev```.


## How to deploy the project in Vercel
- Host the project on GitHub or push changes to it.
- Create an account on Vercel (preferably via GitHub).
- In the Vercel dashboard, click on ***Add new project***.
- Import the GitHub repository.
- Set the production environment variables.
- Copy and paste the following into each environment variable field:
```
DATABASE_URL: postgresql://postgres:admin@db.xhrheteqianjswqfxvaa.supabase.co:5432/postgres
NEXT_PUBLIC_URL: http://fullstack-test-dusky.vercel.app/
GRAPHQL_URL="http://fullstack-test-dusky.vercel.app/api/graphql"
AUTH_SECRET: k1q3d096u5sd3737f8sa1sf3i51df38gf1h5g35j7em5127sa
AUTH0_BASE_URL: http://fullstack-test-dusky.vercel.app
AUTH0_ISSUER_BASE_URL: https://dev-xjdograpogvrdpev.us.auth0.com
AUTH0_CLIENT_ID: 29F4IEgu5jIuH3jIRsyIEu2Aw7AVFNi8
AUTH0_CLIENT_SECRET: PcnQNwUG-7dSHM8sqShRUQtxEcVd46a60vESrEEoSvvde6aKgkygAAgkGebKWYPS
```
- Click on ***Deploy project***.
- Visit the link that is generated: [FinanTrack](https://fullstack-test-dusky.vercel.app "FinanTrack").
