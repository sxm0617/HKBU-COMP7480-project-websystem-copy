/**
 * HouseController
 *
 * @description :: Server-side logic for managing Houses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	search: function(req, res) {
		if (req.method == "GET") {
			console.log("get");
			User.findOne({username: req.session.username})
				.exec(function(err, user) {
					if (user == null) {
						return res.redirect('/user/login');
					} else {
						House.find().where({district: ""}).exec(function(err, houses) {
							return res.view('search', {'house': houses, 'count': 1, 'current': 1});				 					
						});
					}
				});	
		} else {
			// console.log("here");			
			// console.log("here2");
			// House.find()	
			// 	.where({district: {contains: req.query.district}})
			// 	.where({bedroom: {contains: req.query.bedroom}})
			// 	.where({lift: {contains: req.query.lift}})
			// 	.where({guard: {contains: req.query.guard}})
			// 	.sort('id')
			// 	.paginate({page: req.query.page, limit: 2})	
			// 	.exec(function(err, houses) {
			// 		console.log("here3")
			// 		House.count({district: {contains: req.query.district}}, {bedroom: {contains: req.query.bedroom}},
			// 				{lift: {contains: req.query.lift}}, {guard: {contains: req.query.guard}})
			// 			.exec(function(err, value) {
			// 				var pages = Math.ceil(value / 2	);
			// 				return res.view('search', {'house': houses, 'count': pages, 'current': req.query.page});
			// 		})					 					
			// 	});
		}
	},

	result: function(req, res) {
		if (req.method == "GET") {
			var houseModel = {
				district: req.query.district,
				bedroom: req.query.bedroom,
				lift: req.query.lift,
				guard:req.query.guard
			};
			if (houseModel.district == "") {
				delete houseModel.district;
			}
			if (houseModel.bedroom == "") {
				delete houseModel.bedroom;
			}
			if (houseModel.lift == "") {
				delete houseModel.lift;
			}
			if (houseModel.district == "") {
				delete houseModel.guard;
			}
			
			House.find(houseModel)
				.sort('id')
				.paginate({page: req.query.page, limit: 2})
				.exec(function(err, houses) {
					House.count({district: {contains: req.query.district}}, {bedroom: {contains: req.query.bedroom}},
							{lift: {contains: req.query.lift}}, {guard: {contains: req.query.guard}})
						.exec(function(err, value) {
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
				return res.view('view', {'house': house});
			});
	}

}; 

