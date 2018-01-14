/**
* A basic Hello World function
 * @acl *
* @param {string} name Who you're saying hello to
* @returns {number}
*/


module.exports = (name = 'world', context, callback) => {

  var AWS = require("aws-sdk");
    AWS.config.update({
        accessKeyId: 'AKIAIIZPL74DK4BXD45Q',
        secretAccessKey: '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',
        region: "us-west-2"
    });
  var DB = new AWS.DynamoDB();
  DB.scan({
      TableName: "nwHackDemo",
  }, function(err, data) {

      console.log(data)


      var oldItem = data.Items;
      oldItem[0].Results.M.NumParticipants.N = (parseInt(oldItem[0].Results.M.NumParticipants.N) + 1).toString()
      console.log(oldItem[0].Results.M.NumParticipants.N);

      DB.putItem({
          Item: oldItem[0],
          ReturnConsumedCapacity: "TOTAL",
          TableName: "nwHackDemo"}, function (err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
      })

      callback(null, 1)

  })


};
