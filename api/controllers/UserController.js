/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	login: function(req, res) {
		if (req.method == "GET") {
			return res.view('login');
		} else {
			User.findOne({username: req.body.username})
				.exec(function(err, user) {
					if (user == null) {
						return res.send("No such user");
					}
					if (user.password != req.body.password) {
						return res.send("Wrong password");
					}
					req.session.username = req.body.username;
					return res.redirect('/');
				});
		}
	},

	register: function(req, res) {
		if (req.method == "GET") {
			return res.view('register');
		}
	}
};

