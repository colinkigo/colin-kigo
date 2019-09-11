console.log('starting cv');

import * as express from "express";
import * as path from "path";
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')

const Comment = require('./../api/models/comment');

const app = express();
let port = process.env.PORT || 3010;

mongoose.connect('mongodb://colin123:' + 
process.env.MONGO_ATLAS_PW + 
'@cluster0-shard-00-00-up8dg.mongodb.net:27017,cluster0-shard-00-01-up8dg.mongodb.net:27017,cluster0-shard-00-02-up8dg.mongodb.net:27017/reviews?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
{
    useNewUrlParser: true
}
).then(result => console.log('ATLAS CONNECTED...'))
.catch(err => console.log(err.errors));;

// app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());


/**
 * GET REVIEWS
 */
app.get('/api/home', (req, res, next) => {
    console.log( 'hellloseeew222' )
    process.env.NODE_ENV === "dev" ? console.log("Node environment:", process.env.NODE_ENV) : console.log("Node environment: NO ENVIRONMENT")
    Comment.find()
        .exec()
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log('Colin is a HFFOOL', err));
});

/** 
 * POST REVIEW
 */
app.post('/api/home', (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        comm: req.body.comm
    });
    
    comment
        .save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

    res.status(201).json({
        message: "Comment was created",
        comment
    })
    next();
});

/** 
 * EDIT REVIEW
 */
app.put('/api/home/:id', (req, res, next) => {
    Comment.findByIdAndUpdate(req.params.id, { $set: req.body })
        .then(response => {
            Comment.findById(response._id)
            .exec()
            .then(result => {
                    console.log("RESPONSE:", result); 
                    res.send(result);
                })
                .catch(err => console.log(err));
        })
        .catch(next);
});

/** 
 * DELETE REVIEW
 */
app.delete('/api/home/:id', (req, res, next) => {
    Comment.deleteOne({ _id: req.params.id }, (err, comment) => {
        if (err)
          return console.error(err);
        console.log('Comment successfully removed from collection!');
        res.status(200).send();
      })
});

app.listen(port, () => {
    console.log(`LISTENING  ON PORT:: ${port}`);
});