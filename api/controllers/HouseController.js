/**
 * HouseController
 *
 * @description :: Server-side logic for managing Houses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res) {
		if (req.method == "GET") {
			return res.view('search');
		}
	},
};

