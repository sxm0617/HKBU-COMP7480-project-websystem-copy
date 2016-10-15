/**
 * HouseController
 *
 * @description :: Server-side logic for managing Houses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res) {
		if (req.method == "GET") {
			House.find()	
				.where({district: {contains: req.session.district}})
				.where({bedroom: {contains: req.session.bedroom}})
				.where({lift: {contains: req.session.lift}})
				.where({guard: {contains: req.session.guard}})
				.sort('id')
				.paginate({page: req.query.page, limit: 2})	
				.exec(function(err, houses) {
					House.count({district: {contains: req.session.district}}, {bedroom: {contains: req.session.bedroom}},
							{lift: {contains: req.session.lift}}, {guard: {contains: req.session.guard}})
						.exec(function(err, value) {
							var pages = Math.ceil(value / 2	);
							console.log(value);
							if (pages == 0) {
								pages = 1;
							} 
							return res.view('search', {'house': houses, 'count': pages, 'current': req.query.page});							
					});				 					
				});			 					
		}
	},

	result: function(req, res) {
		if (req.method == "GET") {

			req.session.district = req.query.district;
			req.session.bedroom = req.query.bedroom;
			req.session.lift = req.query.lift;
			req.session.guard = req.query.guard;

			House.find()	
				.where({district: {contains: req.query.district}})
				.where({bedroom: {contains: req.query.bedroom}})
				.where({lift: {contains: req.query.lift}})
				.where({guard: {contains: req.query.guard}})
				.sort('id')
				.paginate({page: req.query.page, limit: 2})	
				.exec(function(err, houses) {
					House.count({district: {contains: req.query.district}}, {bedroom: {contains: req.query.bedroom}},
							{lift: {contains: req.query.lift}}, {guard: {contains: req.query.guard}})
						.exec(function(err, value) {
							console.log(value);
							var pages = Math.ceil(value / 2	);
							return res.view('search', {'house': houses, 'count': pages, 'current': req.query.page});
					})				 					
				});			
		}
	},

	list: function(req, res) {
		House.find().exec(function(err, houses) {
			return res.view('index', {'house': houses});
		});
	},

	view: function(req, res) {
		House.findOne({id: req.params.id})
			.exec(function(err, house) {
				return res.view('view', {'house': house, 'userId': req.session.userId});
			});
	},

	admin: function(req, res) {
		House.find().exec(function(err, houses) {
			return res.view('admin', {'house': houses});
		});
	},

	delete: function(req, res) {
		House.findOne({id: req.body.id}).exec(function(err, house) {
			if (house != null) {
				house.destroy();
				return res.redirect('house/admin');
			}
		});
	},

	edit: function(req, res) {
		House.findOne({id: req.params.id}).exec(function(err, house) {
			return res.view('edit', {'house': house});
		});
	},

	update: function(req, res) {
		House.findOne({id: req.body.id}).exec(function(err, house) {
			house.title = req.body.title;
			house.image = req.body.image;
			house.district = req.body.district;
			house.bedroom = req.body.bedroom;
			house.area = req.body.area;			
			house.lift = req.body.lift;
			house.guard = req.body.guard;
			house.price = req.body.price;
			house.save();
			if (req.session.username == "admin") {
				return res.redirect('house/admin');
			} else {
				return res.redirect('/user/own');
			}
		});
	},

	confirmAdd: function(req, res) {
		House.create({title: req.body.title,
			image: req.body.image,
			district: req.body.district,
			bedroom: req.body.bedroom,
			area: req.body.area,		
			lift: req.body.lift,
			guard: req.body.guard,
			price: req.body.price})
			.exec(function(err, house) {
				//return res.json(house);
				console.log(req.session.userId);
				house.ownedBy.add(req.session.userId);
				house.save();
				User.findOne(req.session.userId).populateAll().exec(function(err, user) {
					return res.redirect('/user/own');
				});
				
		});
	},

	add: function(req, res) {
		return res.view('add');
	},

	interestedBy: function(req, res) {
		House.findOne(req.params.id).exec(function(err, house) {
			if (house != null) {
				house.interestedBy.add(req.query.userId);
				house.save(function(err, house) {
					if (err) {
						return res.send("Already declared");
					} else {
						return res.send("Successful");
					}
				});
				
			} else {
				return res.send("House not found");
			}
		});
	},

	interest: function(req, res) {
		House.findOne(req.params.id).populate("interestedBy").exec(function(err, house) {
			return res.view('interestUsers', {'user': house.interestedBy});
		});
	},

	interested: function(req, res) {
		User.findOne(req.session.userId).populate('interest').exec(function(err, user) {
			return res.view('interest', {'house': user.interest});
		});
	},

	uninterest: function(req, res) {
		House.findOne(req.params.id).exec(function(err, house) {
			if (house != null) {
				house.interestedBy.add(req.query.userId);
				house.save(function(err, house) {
					if (err) {
						return res.send("Already declared");
					} else {
						return res.send("Successful");
					}
				});
				
			} else {
				return res.send("House not found");
			}
		});
	}

}; 

