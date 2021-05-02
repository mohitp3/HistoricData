const axios = require('axios');



exports.homeroute = (req,res)=>{
    axios.get('http://localhost:3000/api/users').then((response)=>{
            // console.log(response);
            res.render('index',{users:response.data});

        }).catch(err=>{
            res.send(err);
        });   
    };
exports.filterRoute = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:req.query}).then((response)=>{
            console.log(response);
            res.render('index',{users:response.data});

        }).catch(err=>{
            res.send(err);
        });   
    };
exports.addUser = (req,res)=>{
    res.render('add_user');
    };
exports.updateUser = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
        .then((userdata)=>{
            // console.log(userdata)
            res.render('update_user',{user:userdata.data});

        }).catch(err=>{
            res.send(err);
        });   

    };
