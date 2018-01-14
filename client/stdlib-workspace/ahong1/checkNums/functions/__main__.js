/**
* A basic Hello World function
* @acl *
* @param {string} name Who you're saying hello to
* @returns {object}
*/
module.exports = (name = 'world', context, callback) => {

	var AWS = require("aws-sdk");
	AWS.config.update({
			accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
			secretAccessKey: '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',
			region: "us-west-2"
	});
	var DB = new AWS.DynamoDB();


	DB.getItem({
			TableName: "nwHackDemo",
			Key: {
					data: {
							S: "Data"
					}
			}
	}, function(err, data) {


			var results = {

				faster: data.Item.faster.N,
					louder: data.Item.louder.N,
					slower: data.Item.slower.N,
					quieter: data.Item.quieter.N,
					smile: data.Item.smile.N



			}

			callback(null, results);

	})


};