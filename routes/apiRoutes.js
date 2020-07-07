const router = require("express").Router();
const db = require("../model/User");

router.get("/save", (req, res) => {
    db.find({})
    .then(user => res.json(user))
    .catch(err => console.log(err));
});

router.post("/save", (req, res) => {
    const { username, score } = req.body
    console.log("The username is " + username);
    console.log("The score is " + score);

    db.create({username: username, score: score})
    .then(() => {
        res.json(true);
    }).catch(err => console.log(err));
});



module.exports = router;