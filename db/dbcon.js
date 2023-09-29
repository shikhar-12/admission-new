const mongoose = require('mongoose');
const live_url = 'mongodb+srv://shikhars74:shikhar123@admissioncluster.a378mpj.mongodb.net/?retryWrites=true&w=majority';
const local_url = 'mongodb://127.0.0.1:27017/PracticePortal';
const condb = ()=>{
return mongoose.connect(live_url)
.then(()=>{console.log('connected to mongodb succesfull ..**..**')})
.catch((Error)=>(console.log(Error)))}
module.exports= condb;