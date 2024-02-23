# YouApp - Frontend

### 1. Install dependencies

`npm i`

<br/>

### 2. Configure database

I chose **Supabase** platform to store data.

Steps to reproduce:

- Go to [Supabase](https://supabase.com/) and start your project
- In the [dashboard](https://supabase.com/dashboard/projects) click new project, follow the instructions, generate a password and keep a copy of it
- You need the connection URI for **DATABASE_URL** in **.env** that looks like this:

`postgres://postgres.xqheiejnwcagcolaoahf:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`

- Paste your password into the placeholder without the square brackets, copy the url, and store it in **.env** alongside **BASE_FILE_URL** and **NEXTAUTH_SECRET**

```js
DATABASE_URL =
  'postgres://postgres.xqheiejnwcagcolaoahf:dummypassword@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres';
```

- **BASE_FILE_URL** must be the same with the Backend's **BASE_URL**

```js
BASE_FILE_URL = 'http://localhost:8080/uploads';
```

<br/>

### 3. Change the port in next.config.mjs to the Backend's running port

```js
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
    ],
  },
```

  <br />

### 4. Change the port in AboutForm.tsx to the Backend's running port

```js
// At line 99:
// With no 's'

'http://localhost:8080/upload';
```

<br />

### 5. Generate a secret key for NextAuth

`openssl rand -base64 32`

Store it in **.env**

```js
NEXTAUTH_SECRET = 'PASTE_GENERATED_KEY_HERE';
```

<br/>

### 6. Run the application

`npm run dev`

<br/>

# Project Description

### This project implemented:

- **Mobile first** design philosophy

- **Atomic design** methodology

- **NextAuth** as an authentication library with its experimental _version ^5.0.0-beta.9_ with its simplified set up and universal **auth()** that replaces getServerSession, getSession, withAuth, getToken and useSession in most cases

- Newly stable **Server Actions** from the latest release of **NextJS 14** where I manipulated data directly using **PrismaClient** without the need of API endpoints

- **Streaming** making use of **Suspense**

- **Static & Dynamic rendering**

- Form validations in /register and /auth

- Protected routes and controls

User can visit another user's profile by directly using their username as the slug, but can't manipulate their data.

User can't visit the /auth and /register page when they've logged in.

- **Metadata**
