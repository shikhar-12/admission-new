const express = require('express');
const FrontendController = require('../Controller/FrontendController');
const UserFormController = require('../Controller/UserFormController');
const admin = require('../Controller/admincontroller');
const router = express.Router();
const checkuserauth = require('../Middleware/auth')
// FrontendController
router.get('/',FrontendController.login);
router.get('/register',FrontendController.register);
router.get('/dashboard',checkuserauth,FrontendController.dashboard);
router.get('/admin/dashboard',checkuserauth,FrontendController.admindash);
router.get('/contact',checkuserauth,FrontendController.contact);
router.get('/about',checkuserauth,FrontendController.about);
router.post('/userinsert',FrontendController.userinsert);
router.post('/verifylogin',FrontendController.verifylogin);
router.get('/profile',checkuserauth,FrontendController.profile);
router.post('/updatepassword',checkuserauth,FrontendController.updatepassword);
router.post('/updateprofile',checkuserauth,FrontendController.updateprofile);
router.get('/logout',FrontendController.logout);
// UserFormController
router.post('/UserFormResult',checkuserauth,UserFormController.UserFormResult);
router.get('/coursedisplay',checkuserauth,UserFormController.coursedisplay);
router.get('/courseview/:id',checkuserauth,UserFormController.courseview);
router.get('/courseedit/:id',checkuserauth,UserFormController.courseedit);
router.get('/coursedelete/:id',checkuserauth,UserFormController.coursedelete);
router.post('/courseupdate/:id',checkuserauth,UserFormController.courseupdate);
// router.get('/course/dashboard',UserFormController.redirect);
// admin controller
router.get('/admindashboard',checkuserauth,admin.admindashboard);
router.get('/admincourseedit/:id',checkuserauth,admin.admincourseedit);
router.get('/admincourseview/:id',checkuserauth,admin.admincourseview);
router.get('/admincoursedelete/:id',checkuserauth,admin.admincoursedelete);
router.post('/admincourseupdate/:id',checkuserauth,admin.admincourseupdate);

module.exports = router;