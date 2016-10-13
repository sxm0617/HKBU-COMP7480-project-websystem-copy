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
					})				 					
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
				return res.view('view', {'house': house});
			});
	}

}; 

