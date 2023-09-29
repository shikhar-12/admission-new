const UserModel = require("../Model/user");
const UserFormDetail = require("../Model/UserForm");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
// const flash = require('connect-flash');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

cloudinary.config({
  cloud_name: "dgl0ugw9p",
  api_key: "233799267255433",
  api_secret: "JcgJ5SbrsgtWVCuQ2ne9ZRCjmUU",
});

class FrontendController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        message: req.flash("error"),
        pmessage: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", {
        message: req.flash("error"),
        pmessage: req.flash("abc"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static dashboard = async (req, res) => {
    try {
      const { name, image, _id} = req.data1;
      const btech = await UserFormDetail.findOne({user_id:_id,course: "B.Tech"});
      const bca = await UserFormDetail.findOne({user_id:_id,course: "BCA"});
      const mca = await UserFormDetail.findOne({user_id:_id,course: "MCA"});
      res.render("dashboard", { n: name, img: image,bt:btech,bc:bca,mc:mca});
    } catch (error) {
      console.log(error);
    }
  };
  static about = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("about", { n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("contact", { n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };
  static userinsert = async (req, res) => {
    try {
      const {
        name: un,
        email: em,
        password: pw,
        confirmpassword: cpw,
      } = req.body;
      const naa = req.files.image;
      //  console.log(naa);
      const upld = await cloudinary.uploader.upload(naa.tempFilePath, {
        folder: "profileimage",
      });
      // console.log(upld);
      // console.log({un,em,pw,cpw});
      const user = await UserModel.findOne({ email: em });
      // console.log(user)
      if (user) {
        req.flash("error", "Email Already Exist");
        res.redirect("/register");
      } else {
        if (un && em && pw && cpw) {
          if (pw == cpw) {
            const hashpassword = await bcrypt.hash(pw, 10);
            //console.log(hashpassword);
            const result = new UserModel({
              name: un,
              email: em,
              password: hashpassword,
              image: {
                public_id: upld.public_id,
                url: upld.secure_url,
              },
            });
            await result.save();
            req.flash("success", "Registration Successfull Please Login");
            res.redirect("/");
          } else {
            req.flash("abc", "Password Do not Match");
            res.redirect("/register");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });

        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (isMatched) {
            //  //generate token
            // const token = jwt.sign({ ID: user._id }, "pn@975");
            // // console.log(token);
            // res.cookie("token", token);
            // res.redirect("/dashboard");
            if(user.role=='student'){
              // generate token
              const token = jwt.sign({ ID: user._id }, "pn@975");
              // console.log(token);
              res.cookie("token", token);
              res.redirect("/dashboard");
                         }
                         if(user.role=='admin'){
                          // generate token
                          const token = jwt.sign({ ID: user._id }, "pn@975");
                          // console.log(token);
                          res.cookie("token", token);
                          res.redirect("/admindashboard");
                                     }
          } else {
            req.flash("error", "Email or password is not valid");
            return res.redirect("/");
          }
        } else {
          req.flash("error", "You are not a registered user");
          return res.redirect("/");
        }
      } else {
        req.flash("error", "All Fields Required");
        return res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.data1;
      res.render("profile", { n: name, img: image, eml:email });
    } catch (error) {
      console.log(error);
    }
  };
  static updatepassword = async (req, res) => {
    try {
      const { id } = req.data1;
      //  console.log(req.body);
      const { old_password, new_password, cpassword } = req.body;
      if (old_password && new_password && cpassword) {
        const user = await UserModel.findById(id);
        const ismatch = await bcrypt.compare(old_password, user.password);
        if (!ismatch) {
          req.flash("error", "Old password is incorrect.");
          return res.redirect("/profile");
        } else {
          if (new_password !== cpassword) {
            req.flash("error", "Password and confirm password do not match.");
            return res.redirect("/profile");
          } else {
            const newHashpassword = await bcrypt.hash(new_password, 10);
            await UserModel.findByIdAndUpdate(id, {
              $set: { password: newHashpassword },
            });
            req.flash(
              "success",
              "Password changed successfully. Please log in with your new password."
            );
            return res.redirect("/logout");
          }
        }
      } else {
        req.flash("error", "All fields are required.");
        return res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static updateprofile = async (req, res) => {
    try {
      // const {cname,cimage } = req.body;
      const{id} = req.data1
      // console.log(req.body)
      // console.log(req.files.cimage)
      if (req.files) {
        const user = await UserModel.findById(id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.files.cimage;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "profileimage",

        });
        var data = {
            name: req.body.name,
            email: req.body.email,
            image: {
                public_id: myimage.public_id,
                url: myimage.secure_url,
            },
        };
    } else {
        var data = {
            name: req.body.name,
            email: req.body.email,

        }
    }
    const update_profile = await UserModel.findByIdAndUpdate(id, data)
    res.redirect('/profile')
    } catch (error) {
      console.log(error);
    }
  };
  static admindash = async (req, res) => {
    try {
      const { name, image } = req.data1;
      res.render("admin/dashboard", { n: name, img: image });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = FrontendController;
