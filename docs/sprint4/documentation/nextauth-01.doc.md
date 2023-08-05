# NextAuth Single Sign-On Documentation

## Frontend Implementation

### Overview
This feature provides users with the ability to sign in via Google or Github. It's implemented using an open source project called NextAuth and it supports many login providers (i.e. Google, Twitter, etc.)

### Components
- GoogleSignInButton: This is a React component that displays a button for Google SSO. When the button is clicked, it triggers the "signIn()" function from NextAuth with Google as the provider and "/feed" as the callback URL.
- GithubSignInButton: This is a React component that displays a button for Github SSO. When the button is clicked, it triggers the "signIn()" function from NextAuth with Github as the provider and "/feed" as the callback URL.

## Backend Implementation

### Overview
The backend of this feature is mostly configuration for NextAuth that lists the providers and session strategy.

### Providers
We have configured Google and Github as the providers, as they seem to be one of the most used platforms, making account login accessible to everyone.

We create OAuth clients on their platforms (i.e. GCP and Github Developer). These web clients are connected to our application using a client id and client secret hidden in the .env file, along with NextAuth's API.

### Session Strategy
The session strategy is set to "jwt". This means that user sessions will be handled with JSON Web Tokens, which are serverless, instead of database sessions. This is handled behind the scenes in NextAuth's backend.

### NextAuth backend

NextAuth is designed to work seamlessly with various OAuth providers and implements the OAuth 2.0 authorization framework. All necessary information is stored in a JWT, which is signed and then stored on the client side as a cookie. 

### OAuth Flow

When a user clicks on the "Continue with Google" or "Continue with Github" button, NextAuth initiates the OAuth 2.0 flow. More can be read here: https://oauth.net/2/.

### JWT Sessions

NextAuth creates a JSON Web Token that represents the authenticated user's session. Json Web Tokens are a way for securely transferring information as a JSON payload (or object). These sessions are then linked to a user after they are logged in and that session is parsed to to retrieve the session data.