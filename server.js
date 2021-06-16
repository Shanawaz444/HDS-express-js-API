import express from 'express';
import usersR from './routes/users.js';
import url from './config/db.config.js';
import  mongoose  from "mongoose";
import cors from "cors";


const app = express();
const PORT=5000;
app.use(cors());



mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  },



).then(()=>{
    console.log('connected to mongodb')

})
.catch(err=>{
    console.log("cannot connect to mongodb :",err);
    process.exit();
});




var schema =mongoose.Schema({
name: {
    type: String,
    required: true,
},
email:{
    type: String,
    required: true,
},
password:{
    type: String,
    required: true,
}

});




var User_Details =mongoose.model('shana',schema);





app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use('/users',usersR);




app.post('/create_users',(req, res)=>{

    console.log('successfully connected to express server!');

    var check=true;

    try{
        User_Details.find({},
            
            function async (err, ttt)  {
                if (err) {
                    res.json(err);
                }
                console.log(ttt);
                for (var i in ttt) {
                    
                    if (ttt[i].email == req.body.email) {
                        
                        check = false;
                        break;
                    }
                }
                console.log("finshed loop")
                if(check==true)
                {
                    var temp=new User_Details();
                    temp.name=req.body.name;
                    temp.password=req.body.password;
                    temp.email=req.body.email;
                
                    try{
                        temp.save(function(err){
                
                            if(err)
                            {
                                res.json({error:1});
                            }
                
                            res.json({
                
                                error:0,
                                message:"Success"
                
                            });
                
                        })
                    }catch(err){
                        console.log("opps! Error creating:"+err.message);
                        res.json({error:3,message:"error entring the data"});
                    }
                }else{
            
                    res.json({error:2,message:"Email already exists"});
            
                }
            });
        
    }catch(err){
        console.log("opps! Error retriving the data:"+err.message);
        res.json({error:1,
            message:"opps! Error retriving the data"
        
        });
    }

    
    
   




});




app.post('/view_data',(req, res)=>{

    console.log('successfully connected to express server!');

    try{
        User_Details.find({},
            
            
            
            function(err,ttt)
        {
            if(err)
            {
                res.json({error:1,message:"error retriving data",name:""});
            }
            if(ttt.length==0){
                res.json({error:2,message:"the database is empty!!! no records found",name:""});
            }else{
                var done=false;
                for(var i in ttt)
                {
                    if(ttt[i].email== req.body.email)
                    {
                        if(ttt[i].password== req.body.password)
                        {
                            done=true;
                            res.json({error:0,message:"successfully logged in",name:ttt[i].name});
                            break;
                        }else{
                            done=true;
                            res.json({error:3,message:"wrong password!",name:""});
                        }
                    }
                }
                if(done==false)
                {
                    res.json({error:4,message:"No email found!",name:""});
                }
            }
        });
    }catch(err){
        console.log("opps! Error retriving the data:"+err.message);
        res.json({error:5,message:err+"please contact our admin",name:""});
    }
   




});






app.get('/proo',(req, res) => {
    console.log('[TEST]!');
    res.send("prooo working!");
})

app.listen(PORT,()=>console.log(`Server running perfectly on port: http://localhost:${PORT}`));