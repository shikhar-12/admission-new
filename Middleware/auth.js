const jwt = require('jsonwebtoken');
const UserModel = require('../Model/user');
const checkuserauth = async(req,res,next)=>
{
    // console.log('hello auth');
    const {token} = req.cookies
    // console.log(tkn);
    if(!token)
    {
        req.flash('error','Unauthorized User, Please Login')
        res.redirect('/');
    }
    else
    {
       const verifytoken = jwt.verify(token,'pn@975');
    //    console.log(verifytoken);
       const data = await UserModel.findOne({_id:verifytoken.ID})
    //    console.log(data);
    req.data1 = data;
       next();
    }
}
module.exports = checkuserauth