/**
 * HouseController
 *
 * @description :: Server-side logic for managing Houses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res) {
		if (req.method == "GET") {
			User.findOne({username: req.session.username})
				.exec(function(err, user) {
					if (user == null) {
						return res.view('login');
					} else {
						return res.view('search');
					}
				});			
		}
	},

	list: function(req, res) {
		House.find().exec(function(err, houses) {
			return res.view('index', {'house': houses});
		});
	}
};

