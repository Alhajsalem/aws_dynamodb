var express  = require('express');
var app      = express();
var aws      = require('aws-sdk');


// Load your AWS credentials and try to instantiate the object.
aws.config.loadFromPath(__dirname + '/config.json');

var dynamodb = new aws.DynamoDB({apiVersion: '2012-08-10'});

app.get('/create', function (req, res) {


    var params = {
        AttributeDefinitions: [
            {
                AttributeName: req.query.name,  // Partition key
                AttributeType: "S"
            },
            {
                AttributeName: req.query.task, // Sort key
                AttributeType: "S"
            }
        ],
        KeySchema: [
            {
                AttributeName: req.query.name,
                KeyType: "HASH"
            },
            {
                AttributeName: req.query.task,
                KeyType: "RANGE"
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        TableName: req.query.tablename
    };
    dynamodb.createTable(params, function (err, data) {
        if (err) {
            res.send(err);
            console.log(err);
        }


        else{
            res.send(data);
            console.log(data);

        }
    });
});

// Start server.
var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('AWS dynamodb example app listening at http://%s:%s', host, port);
});

