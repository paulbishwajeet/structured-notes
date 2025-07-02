# Structured Notes Portfolio Management Application

This application helps investors manage their structured notes portfolio, providing a system for entering note details and viewing projected income.

## Features

*   **Note Entry & Management:** Manual entry form for structured note details.
*   **Basic Projection:** Displays a simplified projection of monthly income based on entered note details.
*   **AWS Backend Integration:** Stores note details in AWS DynamoDB via an AWS Lambda function exposed through API Gateway.

## Technology Stack

*   **Frontend:** React, Tailwind CSS
*   **Backend:** Node.js (AWS Lambda), AWS API Gateway, AWS DynamoDB
*   **Deployment:** AWS Serverless Application Model (SAM) CLI

## Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
*   [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
*   [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
*   [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-samcli.html) (for macOS, `brew tap aws/tap && brew install aws-sam-cli`)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd structured-notes
    ```

2.  **Install Frontend Dependencies:**

    ```bash
    npm install
    ```

3.  **Install Backend Dependencies:**

    ```bash
    cd backend/notes-api
    npm install aws-sdk
    cd ../..
    ```

## AWS Configuration

Configure your AWS CLI with your credentials. You will need your AWS Access Key ID, Secret Access Key, and preferred AWS region.

```bash
aws configure
```

Follow the prompts to enter your credentials and default region.

### A Note on AWS Credentials

You will not find any `AWS_SECRET_ACCESS_KEY` or `AWS_ACCESS_KEY_ID` credentials stored in this project's files. This is a deliberate security measure and follows AWS best practices.

Here’s how the application gets the necessary permissions:

1.  **For Local Development (Using the SAM CLI):** When you run commands like `sam deploy` from your local machine, the AWS SAM CLI uses the credentials you have configured in your development environment, typically from the `~/.aws/credentials` file.

2.  **When Deployed in AWS:** The `template.yaml` file defines an IAM Role for the Lambda function. This role grants the function temporary, secure credentials to interact with other AWS services like DynamoDB. You do not need to manage any keys in the deployed application.

## Running Locally (Frontend & Mock API)

For local development and testing, you can run a mock API server.

1.  **Start the Mock API Server:**

    ```bash
    node server.js
    ```
    Keep this terminal open and running.

2.  **Start the React Development Server:**

    ```bash
    npm run dev
    ```
    Open your browser to `http://localhost:5173` (or the address shown in your terminal).

    *Note: The frontend is currently configured to use the deployed AWS API Gateway. To test with the local mock API, you would temporarily change the API endpoint in `src/components/NoteEntryForm.jsx` from the AWS URL back to `http://localhost:3001/api/notes`.*

## Deployment to AWS

To deploy your serverless backend to AWS:

1.  **Build the SAM Application:**

    ```bash
    sam build
    ```

2.  **Deploy to AWS:**

    ```bash
    sam deploy --guided
    ```
    Follow the interactive prompts:
    *   `Stack Name [sam-app]:` Enter `structured-notes` (or your preferred stack name).
    *   `AWS Region [us-east-1]:` Confirm or enter your desired AWS region.
    *   `Confirm changes before deploy [y/N]:` Type `y` and press Enter.
    *   `Allow SAM CLI IAM role creation [Y/n]:` Type `Y` and press Enter.
    *   `Disable rollback [y/N]:` Type `y` and press Enter.
    *   `NotesApiFunction has no authentication. Is this okay? [y/N]:` Type `y` and press Enter.
    *   `Save arguments to configuration file [Y/n]:` Type `Y` and press Enter.

    The deployment process will create an AWS Lambda function, an API Gateway endpoint, and a DynamoDB table in your AWS account.

3.  **Get the API Gateway Endpoint URL:**

    After successful deployment, the SAM CLI output should display the API Gateway endpoint URL under `Outputs`. If not, you can retrieve it using the AWS CLI:

    ```bash
    aws cloudformation describe-stacks --stack-name structured-notes --query "Stacks[0].Outputs[?OutputKey=='NotesApi'].OutputValue" --output text
    ```

4.  **Update Frontend with Live API Gateway URL:**

    Open `src/components/NoteEntryForm.jsx` and update the `fetch` URL to your deployed API Gateway endpoint. Replace `https://mpcdsrza58.execute-api.us-east-1.amazonaws.com/Prod/notes` with your actual URL.

    ```javascript
    // In src/components/NoteEntryForm.jsx
    const response = await fetch('YOUR_API_GATEWAY_URL_HERE', {
    // ...
    });
    ```

## Usage

1.  Open the application in your browser.
2.  Fill in the structured note details in the form.
3.  Click "Populate with Test Data" to quickly fill the form with sample data.
4.  Click "Add Note & View Projection" to save the note to AWS and see a basic projected income table.

## Future Enhancements

*   Real-time market data integration (Alpha Vantage, Yahoo Finance)
*   Advanced portfolio analytics and charting
*   Automated monitoring and alert system
*   OCR integration with AWS Textract for document data extraction
*   AI-powered field mapping