const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));

    const headers = {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
    };

    try {
        // Handle OPTIONS preflight request
        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers: headers,
                body: '{}'
            };
        }

        const item = JSON.parse(event.body);
        item.id = Date.now().toString(); // Simple unique ID for now

        const params = {
            TableName: process.env.TABLE_NAME,
            Item: item,
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            headers: headers,
            body: JSON.stringify({ message: 'Note saved successfully!', noteId: item.id }),
        };
    } catch (err) {
        console.error('Error processing request:', err);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: 'Failed to save note', error: err.message }),
        };
    }
};
