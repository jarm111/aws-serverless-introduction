# AWS Serverless Introduction

Introduction material and simple demo app on serverless development with AWS for Web Development 2 2018 course

## Getting Started

You can find the introduction material and assigments [here](https://github.com/jarm111/aws-serverless-introduction/blob/master/MATERIAL.md) (in Finnish).

### Serverless REST API Demo

`sls-rest-api-demo` directory contains a Serverless Node.js demo REST API created with Serverless Framework.

Steps to get it running:
- Install Serverless Framework with `npm install -g serverless`.
- Set-up your [Provider Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) (need AWS account for that).
- Clone or download the repository.
- In `sls-rest-api-demo` directory run `npm install` to install dependencies.
- For local development you need to install DynamoDB Local with `sls dynamodb install`.
- To start the service locally: `sls offline start`.
- If you want to deploy it to AWS you can do it with `sls deploy`.

### React Client Demo

In `react-client-demo` directory you can find a React client app made with [Create React App](https://github.com/facebook/create-react-app) for use in combination with Serverless REST API Demo.

To get started with it:
- In `react-client-demo` directory run `npm install` to install dependencies.
- Create `.env.development.local` file to root of that directory.
- Add this line to the .env-file `REACT_APP_BASE_URL=http://localhost:4000`. You need to change the url if you host the REST-API in AWS or change the port.
- Run the app with `npm start` in development mode.
