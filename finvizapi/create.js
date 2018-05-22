'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDb.DocumentClient();

module.exports.cretae = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);

    if(typeof data.text !== 'string') {
        console.error('Validation failed');
        callback(new Error('create data failed'));
        return;
    }

    const params = {
        TableName:'finvizdata',
        Item: {
            id: uuid.v1(),
            newsData: data.text,
            scrapeAt: timestamp
        }
    }

    dynamoDb.put(params, (err, result) => {
        if(err) {
            console.error(err);
            callback(new Error('error'));
            return;
        }

        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        }
        callback(null, response);
    })
}