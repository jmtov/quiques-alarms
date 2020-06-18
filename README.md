## Quique's Alarms App

This is a sample project to use React and Apollo.

### Notes
To either run or build this project, make sure that you have the appropriate environment variables: `REACT_APP_API_ENDPOINT` and `REACT_APP_API_WS_ENDPOINT` stored in your `.env.[ENVIRONMENT]` files.

### Running this project
To run this project:
- Clone or download this repository to a local folder.
- Move to that folder and run `npm i` to install required dependencies.
- Once dependencies are installed start the project running `npm start`

### Building this project
If you have already followed the steps on the 'Running this project' section. Just run the `npm run build`. This will create a build version under the `/build` directory.
To run this build you can use `serve`.

#### Dependencies
##### Apollo Related
This dependencies are required to use Apollo or its features:
- `@apollo/react-hooks`: To use the hooks provided by Apollo such as `useQuery`, `useMutation` and `useSubscription`.
- `apollo-boost`: To provide all the underlying features needed from Apollo to run this project. Contains:
  - `apollo-client`: Described as ['Where all the magic happens'](https://www.npmjs.com/package/apollo-boost).
  - `apollo-cache-inmemory` : Required to host the Queries Cache.
  - `gql`: Needed to parse all the GraphQL query strings.
- `apollo-link-batch-http`: To handle batch mutations (for the shuffle states feaure).
- `apollo-link-ws`: To create a WebSocket link as Apollo requires to handle subscriptions.
- `subscriptions-transport-ws`: To provide the required tools for Apollo Link WS to work.
- `graphql`: Required from Apollo Boost to handle all the GraphQL Queries flow.

##### Common
- `react`: ¯\\_(ツ)_/¯
- `react-dom`: ¯\\_(ツ)_/¯
- `node-sass`: To parse SCSS files into the project.
- `react-router-dom`: To ease the creation of routes.

#### Dev Dependencies
- `eslint-plugin-react`: To enable simple ESLinter code linting.

### About this project
- This project was built with ❤️ using React and Apollo.

### More Challenges
[Mail App](https://github.com/jmtov/quiques-mail)
[Movie Theater](https://github.com/jmtov/quiques-movie-theater)
