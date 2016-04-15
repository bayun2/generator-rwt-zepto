'use strict';
const express = require('express');
const app = express();
const dns = require('dns');
const request = require('request');
const config = require('./monitor.config.js');

app.use('/', function(req, res) {
    var hitted = false; // 命中
    var path = req.path.substring(1);

    config['proxy_pass'][0]['rewrite'].forEach(function(obj) {
        if (path.match(obj.rule)) {
            hitted = true;
            var url = path.replace(obj.rule, obj.target);
            request({
                method:req.method,
                url:url,
                headers:req.headers
            }).pipe(res);
        }
    })
    if (!hitted) {
        dns.resolve4(req.hostname, function(err, address) {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                var ip = address[0];
                var url = 'http://' + ip + ':' + config.port + req.url;
                req.headers['Host'] = req.headers.host;
                request({
                    method:req.method,
                    url:url,
                    headers:req.headers
                }).pipe(res);
            }
        })
    }
});
app.listen(config.port, function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('proxy begining');
    }
})
