'use strict';
const AWS = require("aws-sdk");
const uuid = require("uuid");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
    const params = {
        TableName:'finvizdata',
        Limit:1
    }

    dynamoDb.scan(params, (err, result) => {
        if(err){
            console.error(err);
            callback('new Error(cant fetch the data');
            return;
        }

        const response = {
            statusCode:200,
            headers: {
                "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
              },
            body: JSON.stringify(result.Items)
        };
        callback(null, response);
    })
}