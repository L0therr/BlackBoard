var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//models
var productModel = require('../models/articles');
var orderModel = require('../models/orders');
var userModel = require('../models/users');

/* GET home page. */
router.get('/', async function(req, res, next) {

    var noSockProducts = await productModel.find({stock:0})

    var cntNonReadMsg = (model) => {
        var cnt = 0;
        for(var i=0;i<model.length;i++) {
            for(var j=0;j<model[i].messages.length;j++){
                if(model[i].messages[j].read === false){
                    cnt++;
                }
            }
        }
        return cnt;
    }

    var cntNonFinishedTasks = (model) => {
        var cnt = 0;
        for(var i=0;i<model.length;i++) {
            for(var j=0;j<model[i].tasks.length;j++){
                if(!model[i].tasks[j].dateCloture) {
                    cnt++;
                }
            }
        }
        return cnt;
    }   
    
    
    var homeData = {
        noStockProducts: noSockProducts.length,
        noReadMsg: cntNonReadMsg(await userModel.find()),
        noFinishTasks: cntNonFinishedTasks(await userModel.find({status: 'admin'})),
    }
console.log(homeData)
    res.render('index', {homeData});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
    var users = await userModel.find({
        status: 'admin',
    });
    res.render('tasks', { users });
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {
    var users = await userModel.find();
    res.render('messages', { users });
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
    var users = await userModel.find();
    res.render('users', { users });
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
    var articles = await productModel.find();
    res.render('catalog', { articles });
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
    var orders = await orderModel.find();
    res.render('orders-list', { orders });
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
    var id = req.query.id;
    var orderProducts = [];
    var orders = await orderModel.findOne({
        _id: id
    });

    for (var i = 0; i < orders.articles.length; i++) {
        var currentProduct = await productModel.findOne({
            _id: orders.articles[i],
        })

        orderProducts.push(currentProduct);
    }

    res.render('order', { orders, orderProducts });
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {

    var genderCompare = (model, gend) => {
        var cnt = 0;
        for(var i=0;i<model.length;i++) {
            if(model[i].gender === gend) {
                cnt++;
            }
        }
        return cnt;
    }

    var cntNonReadMsg = (model) => {
        var unread = 0;
        var read = 0;
        for(var i=0;i<model.length;i++) {
            for(var j=0;j<model[i].messages.length;j++){
                if(model[i].messages[j].read === false){
                    unread++;
                } else {
                    read++;
                }
            }
        }
        return [unread, read];
    }

    var cntShipedOrders = (model) => {
        var unshiped = 0;
        var shiped = 0;
        for(var i=0;i<model.length;i++) {
           if(model[i].status_shipment) {
               shiped++;
           } else {
               unshiped++;
           }
        }
        return [unshiped, shiped];
    }

    var aggr = orderModel.aggregate();
    aggr.match({status_payment: "validated"})
    aggr.group({ _id: {year: {$year:'$date_insert'}, month:{$month: '$date_insert'}}, CA:{$sum: '$total'}})
    aggr.sort({ _id : 1})
    var payedOrders = await aggr.exec();
    
    var chartsData = {
        females: genderCompare(await userModel.find(), 'female'),
        males: genderCompare(await userModel.find(), 'male'),

        noReadMsg: cntNonReadMsg(await userModel.find())[0],
        readMsg: cntNonReadMsg(await userModel.find())[1],

        unshiped: cntShipedOrders(await orderModel.find())[0],
        shiped: cntShipedOrders(await orderModel.find())[1],
    }

    console.log(payedOrders)

    res.render('charts', { chartsData, payedOrders });
});


module.exports = router;