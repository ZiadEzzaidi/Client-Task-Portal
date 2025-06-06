﻿# Client Task Portal - Serverless Project Tracker

## Project Overview

A lightweight, serverless web application that allows freelancers to:

- Track project progress across multiple clients
- Communicate updates in real-time
- Share deliverables securely
- Reduce email back-and-forth

## Why This Project Matters

- Solves real workflow problems for freelancers
- Demonstrates full-stack cloud expertise
- Can be white-labeled or sold as SaaS

## Tech Stack

### Frontend

- **Framework**: React (SPA)
- **Hosting**: GitHub Pages
- **Authentication**: AWS Cognito via Amplify
- **URL**: https://ZiadEzzaidi.github.io/Client-Task-Portal

### Backend (AWS)

- **Compute**: Lambda + API Gateway
- **Database**: DynamoDB
- **Storage**: S3 for file uploads
- **Auth**: Cognito User Pools
- **CI/CD**: GitHub Actions + CDK

## Architecture

![Architecture Diagram](docs/architecture.png)

### Communication Flow

1. Frontend makes HTTPS requests to API Gateway
2. API Gateway triggers Lambda functions
3. Lambda interacts with DynamoDB/S3
4. Responses returned to frontend

## Development Setup

```bash
git clone https://github.com/ZiadEzzaidi/Client-Task-Portal.git
cd Client-Task-Portal
npm install
cd frontend
npm install
npm start
```

## Deployment

### Backend

```bash
cd infrastructure
npx aws-cdk deploy
```

### Frontend

```bash
cd frontend
npm run deploy
```

## Troubleshooting

### Common Issues

1. **Cognito 400 Errors**:

   - Verify User Pool ID and Client ID in .env
   - Check AWS region consistency
   - Ensure CORS is enabled

2. **Deployment Failures**:

   - Check GitHub Actions logs
   - Verify AWS credentials
   - Confirm environment variables

3. **Authentication Issues**:
   - Check Cognito domain setup
   - Verify callback URLs
   - Review Amplify config
