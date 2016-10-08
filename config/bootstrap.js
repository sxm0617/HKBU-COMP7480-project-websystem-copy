/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  
  	var user = {"username": "admin", "password":"123456", "id":1};
    User.create(user).exec(function (err, model)  {
        model.save();
    });
    
    user = {"username": "boss", "password":"123456", "id":2};
    User.create(user).exec(function (err, model)  {
        model.save();
    });

    var houseInfo = {
        "title": "酒店式靚裝，有泳池會所",
        "district": "Festival City",
        "image": "http://orientaldaily.on.cc/cnt/finance/20111228/photo/1228-00204-028b1.jpg",
        "area": 700,
        "price": 18000
    };
    House.create(houseInfo).exec(function (err, model) {
        model.save();
    });

    houseInfo = {
        "title": "2房實用，交通方便",
        "district": "Tin Ma Court",
        "image": "http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg",
        "area": 550,
        "price": 12000
    };
    House.create(houseInfo).exec(function (err, model) {
        model.save();
    });

    houseInfo = {
        "title": "沙田第一城 套3房剛翻新",
        "district": "City One Shatin",
        "image": "http://ps.hket.com/res/images/contents/2014/201411/20141121/479078/yyyy1118077_08_600x400_w.jpg",
        "area": 900,
        "price": 25000
    };
    House.create(houseInfo).exec(function (err, model) {
        model.save();
    });

    houseInfo = {
        "title": "平絕同區",
        "district": "Festival City",
        "image": "http://www.angledesign.net/wp-content/uploads/2013/05/IMG_7041.jpg",
        "area": 700,
        "price": 15000
    };
    House.create(houseInfo).exec(function (err, model) {
        model.save();
    });

  cb();
};
