/**
* A basic Hello World function
* @param {string} name Who you're saying hello to
* @returns {string}
*/
module.exports = (name = 'world', context, callback) => {

	var AWS = require("aws-sdk");
    AWS.config.update({
        accessKeyId: 'AKIAI2TGJT2BZA4MD3YA',
        secretAccessKey: '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',
        region: "us-west-2"
		});
		
	var DB = new AWS.DynamoDB({apiVersion: '2012-08-10'});
	
	var params = {
		TableName: "PresentorNotification", 
		ProjectionExpression: "faster"
	};

	var fastVal;
	console.log("here1");
	DB.query(params, function(err, data) {
		 if (err) console.log(err, err.stack); // an error occurred
		 else     console.log(data);           // successful response
		 callback(null, `hello ${name}`);
	})
	

};
