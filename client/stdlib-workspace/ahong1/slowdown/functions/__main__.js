/**
* A basic Hello World function
 * @acl *
* @param {string} name Who you're saying hello to
* @returns {any}
*/
module.exports = (name = 'world', context, callback) => {
	var AWS = require("aws-sdk");
	AWS.config.update({
			accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
			secretAccessKey: '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',
			region: "us-west-2"
	});
var DB = new AWS.DynamoDB();
var threshold;
var slows;


DB.getItem({
		TableName: "nwHackDemo",
		Key: {
				data: {
						S: "Data"
				}
		}
}, function(err, data) {

		console.log(data.Item.numPeople.N)
		threshold = parseInt(data.Item.numPeople.N) / 5;
		slows = parseInt(data.Item.slower.N) + 1;

		var params = {
				ExpressionAttributeNames: {
						"#NP": "slower"
				},
				ExpressionAttributeValues: {
						":t": {
								N: String(slows)
						}
				},


				ReturnValues: "ALL_NEW",
				TableName: "nwHackDemo",
				UpdateExpression: "SET #NP = :t ",
				Key: {
						data: {
								S: "Data"
						}
				}
		}


		DB.updateItem(params, function(err,data){
			console.log("i'm over here1");
				if (err) console.log(err, err.stack); // an error occurred
				// else     console.log(data);

				if (slows >= threshold) {
					console.log("it's here ma dudes");
					var params = {
						ExpressionAttributeNames: {
								"#NP": "isSlower"
						},
						ExpressionAttributeValues: {
								":t": {
										BOOL: true
								}
						},
	
						ReturnValues: "ALL_NEW",
						TableName: "nwHackDemo",
						UpdateExpression: "SET #NP = :t ",
						Key: {
								data: {
										S: "Data"
								}
						}
				}
					DB.updateItem(params, function(err,data){
						console.log("i'm over here");
						if (err) console.log(err, err.stack); // an error occurred
						// else     console.log(data);

						callback(null, data);
					});
				}

				else callback(null, data);
		})

})

};
