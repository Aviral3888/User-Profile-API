const express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) => {
    res.render("user/addOrEdit", {
        viewTitle: "Insert User Details"
    });
});

router.post('/', (req, res) => {
    if(req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
})

function insertRecord(req, res){
    var user = new User();

    user.name = req.body.name;
    user.age = req.body.age;
    user.email = req.body.email;
    user.gender = req.body.gender;
    user.mobile = req.body.mobile;
    user.dob = req.body.dob;
    user.city = req.body.city;
    user.state = req.body.state;
    user.country = req.body.country;
    user.address = req.body.address;
    user.save( (err, doc) => {
        if (!err)
            res.redirect('user/list');
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("user/addOrEdit", {
                    viewTitle: "Insert User Details",
                    user: req.body
                });
            }
            else
                console.log('Error during record insertion : '+ err);
        }
    });
}

function updateRecord(req, res){
    User.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){res.redirect('user/list');}
        else{
            if (err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("user/addOrEdit", {
                    viewTitle: 'Update User',
                    user: req.body
                });
            }
            else{
                console.log('Error during record update: '+ err);
            }
        }
    });
}

router.get('/list', (req, res) => {
    User.find( (err, docs) => {
        if (!err){
            res.render("user/list", {
                // list:docs
                list:docs.map( doc => doc.toJSON())
            });
        }
        else{
            console.log('Error in retrieving user data: '+ err);
        }
    })
})


function handleValidationError(err, body){
   for(field in err.errors)
   {
        switch (err.errors[field].path){
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'age':
                body['ageError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'gender':
                body['genderError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'dob':
                body['dobError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            case 'state':
                body['stateError'] = err.errors[field].message;
                break;
            case 'country':
                body['countryError'] = err.errors[field].message;
                break;
            case 'address':
                body['addressError'] = err.errors[field].message;
                break;
            
            default:
                break;
        }
   }
}


router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if(!err){
            res.render("user/addOrEdit", {
                viewTitle: "Update User",
                user: doc.toJSON()
            })
        }
    })
});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err){
            res.redirect('/user/list');
        }
        else{
            console.log('Error in employee delete : ' + err);
        }
    });
});


module.exports = router;

