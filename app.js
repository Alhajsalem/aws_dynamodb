var express  = require('express');
var app      = express();
var aws      = require('aws-sdk');
var queueUrl = "";
var receipt  = "";

// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + '/config.json');

var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});



app.get('/create', function (req, res) {

    var params = {
        AttributeDefinitions: [
            {
                AttributeName: "Artist",
                AttributeType: "S"
            },
            {
                AttributeName: "SongTitle",
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: "Artist",
                KeyType: "HASH"
            },
            {
                AttributeName: "SongTitle",
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        TableName: "Music"
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
         data = {
         TableDescription: {
         AttributeDefinitions: [
         {
         AttributeName: "Artist",
         AttributeType: "S"
         },
         {
         AttributeName: "SongTitle",
         AttributeType: "S"
         }
         ],
         CreationDateTime: <Date Representation>,
         ItemCount: 0,
         KeySchema: [
         {
         AttributeName: "Artist",
         KeyType: "HASH"
         },
         {
         AttributeName: "SongTitle",
         KeyType: "RANGE"
         }
         ],
         ProvisionedThroughput: {
         ReadCapacityUnits: 5,
         WriteCapacityUnits: 5
         },
         TableName: "Music",
         TableSizeBytes: 0,
         TableStatus: "CREATING"
         }
         }
         */
    });


});

// Start server.
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AWS dynamodb example app listening at http://%s:%s', host, port);
});

