require('dotenv').config()
import express from 'express'
import {activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole} from '../controllers/user.controller'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'

const userRouter = express.Router()

userRouter.post('/registration', registrationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout',isAuthenticated, authorizeRoles('user','admin'),logoutUser)
userRouter.get('/refresh',updateAccessToken)
userRouter.get('/me',isAuthenticated,getUserInfo)

userRouter.post('/social-auth',socialAuth)
userRouter.put('/update-info', isAuthenticated,updateUserInfo)
userRouter.put('/update-password',isAuthenticated,updatePassword)
userRouter.put('/update-avatar',isAuthenticated,updateProfilePicture)
userRouter.put('/role',isAuthenticated,authorizeRoles("admin"),updateUserRole)
userRouter.get('/',isAuthenticated,authorizeRoles("admin"),getAllUsers)
userRouter.delete('/:id',isAuthenticated,authorizeRoles("admin"),deleteUser)

export default userRouter



