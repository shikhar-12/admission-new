const UserFormDetail = require("../Model/UserForm");

class UserFormController 
{
  static UserFormResult = async (req,res)=>{
    try{
      const{_id} = req.data1;
      const result = new UserFormDetail({
        username : req.body.username,
        email : req.body.email,
        mobile : req.body.mobile,
        dob : req.body.dob,
        gender : req.body.gender,
        gender : req.body.gender,
        address : req.body.address,
        college : req.body.college,
        course : req.body.course,
        branch : req.body.branch,
        user_id : _id
      })
      await result.save();
      
      res.redirect('coursedisplay');
    }
    catch(error)
    {
        console.log(error);
    }
  }
  static coursedisplay = async(req,res)=>{
    try{
      const{name,image,_id} = req.data1;
          const rew = await UserFormDetail.find({user_id:_id});
          // console.log(rew);
          res.render('course/display',{d:rew,n:name,img:image});     
    }
    catch(error)
    {
        console.log(error);
    }
  }
  static courseview = async(req,res)=>{
    try{
      const{name,image} = req.data1;
      const rew = await UserFormDetail.findById(req.params.id);
         res.render('course/view',{n:name,img:image,d:rew});
    }
    catch(error)
    {
        console.log(error);
    }
  }
  static courseedit = async(req,res)=>{
    try{
      const{name,image} = req.data1;
      const rew = await UserFormDetail.findById(req.params.id);
        //  console.log(rew);
         res.render('course/edit',{n:name,img:image,d:rew});
    }
    catch(error)
    {
        console.log(error);
    }
  }
  static coursedelete = async(req,res)=>{
    try{
      const rew = await UserFormDetail.findByIdAndDelete(req.params.id);
         res.redirect('admin/dashboard');
    }
    catch(error)
    {
        console.log(error);
    }
  }
  static courseupdate = async(req,res)=>{
    try{
      const rew = await UserFormDetail.findByIdAndUpdate(req.params.id,{
         $set:{
          username : req.body.username,
          email : req.body.email,
          mobile : req.body.mobile,
          dob : req.body.dob,
          gender : req.body.gender,
          gender : req.body.gender,
          address : req.body.address,
          college : req.body.college,
          course : req.body.course,
          branch : req.body.branch 
         }
      });
      // await rew.save();
         res.redirect('/coursedisplay');
    }
    catch(error)
    {
        console.log(error);
    }
  }
}
module.exports= UserFormController;