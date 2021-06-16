import express from 'express';

const router = express.Router();


const users = [
   
]

router.get('/fetch',(req, res) => {
    console.log(users);
    res.send(users)

});
router.post('/insert',(req, res) => {
    console.log("post came!");
    const user=req.body;
    users.push(user)
    res.send("succesfully got the pacakage");
})

export default router;