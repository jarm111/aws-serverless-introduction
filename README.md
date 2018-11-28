# AWS Serverless Introduction

Introduction material and simple demo app on serverless development with AWS for Web Development 2 2018 course

## Getting Started

You can find the introduction material and assigments [here](https://github.com/jarm111/aws-serverless-introduction/blob/master/MATERIAL.md) (in finnish).

### Serverless REST API Demo

`sls-rest-api-demo` directory contains a Serverless Node.js demo REST API created with Serverless Framework.

Steps to get it running:
- Install Serverless Frame work `npm install -g serverless`.
- Set-up your [Provider Credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/) (need AWS account for that).
- Clone or download the repository.
- In `sls-rest-api-demo` directory run `npm install` to install dependencies.
- For local development you need to install DynamoDB Local with `sls dynamodb install`.
- To start the service locally: `sls offline start`.
- If you want to deploy it to AWS you can do it with `sls deploy`.
