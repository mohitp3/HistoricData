var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new user
    const user = new Userdb({
        email : req.body.email,
        time: req.body.time,
        message : req.body.message,
        environment : req.body.environment,
        component : req.body.component,
        data: req.body.data

    })
    console.log(user);
    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data);
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Something went wrong"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    let params = {};
    if(req.query.email){
        params['email'] = req.query.email;
    }
    if(req.query.environment){
        params['environment'] = req.query.environment;
    }
    if(req.query.component){
        params['component'] = req.query.component;
    }
    if(req.query.message){
        params['message'] = req.query.message;
    }
    if(req.query.fromDate){
        params['created_at'] = {};
        params.created_at['$gte'] = req.query.fromDate ? new Date(req.query.fromDate) : new Date(new Date().setDate(new Date().getDate()-30))
     }
    if(req.query.toDate){
        params.created_at['$lt'] = req.query.toDate ? new Date(req.query.toDate) : new Date()        
    }
    if(Object.keys(params).length > 0){

        Userdb.find(params)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with filter "})
                }else{
                    res.send(data)
                }
            }).catch(err =>{
                res.status(500).send({ message: "Erro retrieving  "})
            })

    }else if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}
