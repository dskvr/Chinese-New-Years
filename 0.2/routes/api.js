/*
 * Serve JSON to our AngularJS client
 */

exports.state = function (req, res) {
  res.json({
  	name: 'Bob'
  });
};