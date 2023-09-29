const mongoose = require('mongoose');
const UserFormSchema = mongoose.Schema({
   username:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    mobile:{
        type : String,
        required : true
    },
    dob:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    address:{
        type : String,
        required : true
    },
    college:{
        type : String,
        required : true
    },
    course:{
        type : String,
        required : true
    },
    branch:{
        type : String,
        required : true
    },
   user_id:{
        type : String,
        required : true
    }
},{timestamps:true})
const UserFormDetail = mongoose.model('UserDetail',UserFormSchema);
module.exports = UserFormDetail;