const UserFormDetail = require('../Model/UserForm');

class admin{
    static admindashboard = async(req,res)=>{
       try{
        const { name, image, _id} = req.data1;
        const rew = await UserFormDetail.find();
           res.render('admin/dashboard',{d:rew,n:name,img:image});
       }
       catch{

       }
    }
    static admincourseview = async(req,res)=>{
        try{
          const{name,image} = req.data1;
          const rew = await UserFormDetail.findById(req.params.id);
             res.render('admin/view',{n:name,img:image,d:rew});
        }
        catch(error)
        {
            console.log(error);
        }
      }
    static admincourseedit = async(req,res)=>{
        try{
          const{name,image} = req.data1;
          const rew = await UserFormDetail.findById(req.params.id);
            //  console.log(rew);
             res.render('admin/edit',{n:name,img:image,d:rew});
        }
        catch(error)
        {
            console.log(error);
        }
      }
    static admincourseupdate = async(req,res)=>{
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
             res.redirect('/admindashboard');
        }
        catch(error)
        {
            console.log(error);
        }
      }
      static admincoursedelete = async(req,res)=>{
        try{
          const rew = await UserFormDetail.findByIdAndDelete(req.params.id);
             res.redirect('/admindashboard');
        }
        catch(error)
        {
            console.log(error);
        }
      }
}

module.exports= admin;