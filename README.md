# Shop
This project is an e-commerce shop built using Next.js and Prisma. It allows users to browse and purchase various products online.

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes. See deployment for information on how to deploy the project to a live system.

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js - JavaScript runtime
- npm or Yarn - Package manager
- PostgreSQL - Database server

### Installing
Follow these steps to set up the development environment:

1. Clone the repository
2. Install dependencies using `npm install`
3. Copy `.env.example` to `.env` and configure your environment variables
4. Run database migrations using `npx prisma db push
`
5. Start the development server using `npm run dev`
6. Open your web browser and navigate to http://localhost:3000 to see the app in action.

## Documentation

Check out `doc` folder for more information about the project such as database interaction.

## Icons
Icons of Material Design are imported from this [link](https://fonts.google.com/icons).

## Tests
To execute the tests, follow these steps:

1. **Configure Environment Variables**

    * Copy cypress.env.example.json to cypress.env.json.
    * Update the values in cypress.env.json with the appropriate cookies. These cookies can be obtained by logging in while in development mode.

2. **Start the Next.js Application**
    * Ensure that your Next.js application is up and running.

3. **Run Cypress Tests**
    * Run the command `npm run cypress` to initiate the test suite.