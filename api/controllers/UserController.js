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
					req.session.userId = user.id;
					return res.redirect('/');
				});
		}
	},

	register: function(req, res) {
		if (req.method == "GET") {
			return res.view('register');
		} else {
			User.findOne({username: req.body.username})
				.exec(function(err, user) {
					if (user != null) {
						return res.send("The username has existed");
					} else {
						User.create({username: req.body.username, password: req.body.password})
							.exec(function(err, user) {
								return res.send("successful");			
							});
					}			
				});
		}
	},

	logout: function(req, res) {
		req.session.username = "undefined";
		return res.redirect('/');
	},

	own: function(req, res) {
		User.findOne({username: req.session.username}).populate("own").exec(function(err, model) {
			return res.view('own', {'house': model.own});
		});
	},

	interest: function(req, res) {
		User.findOne({username: req.session.username}).exec(function(err, user) {
			user.interest.add(req.params.id);
			user.save();
			return res.json(user);
		});
	},

	interestedHouse: function(req, res) {
		User.findOne({username: req.session.username}).populateAll().exec(function(err, user) {
			return res.json(user.interest);
		});
	}

};

