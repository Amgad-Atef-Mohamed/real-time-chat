"user strict";
var express = require('express');
var chatRouter = express.Router();
var jwt    = require('jsonwebtoken');
var appSeckertKey = require('../config/appconfig').secret;
var model = require('../models/index');
var md5 = require('md5');

chatRouter.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(!token)
        return res.status(403).json({success: false, message: 'No token provided.'});

    jwt.verify(token, appSeckertKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
        } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
        }
    });

});

chatRouter.get('/', function(req, res){
    model.users.findAll({include:[{
        model: model.messages,
        as: 'userMessages',
        order: [
            ['id', 'DESC'],
        ],
        limit: 1
    }],order: [
        ['id', 'DESC'],
    ],}).then( users => {
        model.messages.findAll({where:{ $or: [
            {'sender_id': users[0].id, 'receiver_id': '2'},
            {'sender_id': '2', 'receiver_id': users[0].id}
        ]},
            include:[{
                model:model.users,
                as: 'user'
            }]}).then( userMessages => {
            res.render('chat', {'users': users,userMessages: userMessages});
        });
    });

});

chatRouter.post('/singleThread', function(req, res){
    var msg = req.body;
    return model.messages.findAll({
        where:{
            $or:[
                {'sender_id': msg.sender_id, 'receiver_id': msg.user_id},
                {'sender_id': msg.user_id, 'receiver_id': msg.sender_id},

            ]
        },
        include: [
            {
                model: model.users,
                as :'user'
            }
        ]}).then(userMessages =>  res.status(200).json(userMessages))
        .catch(error => res.status(400).json(error));
});
module.exports = chatRouter;