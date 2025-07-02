const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
    };

    try {
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: headers,
                body: '{}'
            };
        }

        if (event.httpMethod === 'GET') {
            const params = {
                TableName: process.env.TABLE_NAME,
            };
            const result = await dynamodb.scan(params).promise();
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(result.Items),
            };
        }

        if (event.httpMethod === 'POST') {
            const item = JSON.parse(event.body);
            item.id = Date.now().toString();

            const params = {
                TableName: process.env.TABLE_NAME,
                Item: item,
            };

            await dynamodb.put(params).promise();

            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify({ message: 'Note saved successfully!', note: item }),
            };
        }

        return {
            statusCode: 400,
            headers: headers,
            body: JSON.stringify({ message: 'Unsupported HTTP method' }),
        };
    } catch (err) {
        console.error('Error processing request:', err);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: 'Failed to process request', error: err.message }),
        };
    }
};
