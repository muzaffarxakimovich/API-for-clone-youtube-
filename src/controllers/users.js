import fs, { access } from "fs"
import osFile from "../utils/file-system.js"
import { extname, join } from "path"
import argon from "argon2"
import JWT from "jsonwebtoken"

const register = async (req,res)=>{
    const { username, password } = req.body
    const { profile } = req.files

    let filename = Date.now() + extname(profile.name)

    const users = osFile.read("users")
    let hashPass = await argon.hash(password)
    
    const existUser = users.find(user=> user.username == username)
    if(existUser){
        return res.status(409).json({
            status: 409,
            message: "username is alerady taken"
        })
    }
    const newUser = {
        id: users.length ? users.at(-1).id + 1 : 1,
        username,
        password: hashPass,
        profile_img: filename
    }
    users.push(newUser)
    osFile.write("users",users)

    profile.mv(join(process.cwd(),"src","uploads",filename), (err)=> console.log(err))
    return res.status(201).json({
        status:201,
        message: "user was registered successfully",
        accessToken: JWT.sign({id:newUser.id,username:newUser.username,role:"ADMIN"},process.env.SECRET_KEY, {expiresIn:"30m"}),
        refreshToken: JWT.sign({id:newUser.id,username:newUser.username,role:"ADMIN"},process.env.SECRET_KEY, {expiresIn:"1h"})
    })
}
const login = async (req,res)=>{
    const { username, password } = req.body
    const users = osFile.read("users")

    const existUser = users.find(user => user.username == username)
    if(!existUser){
        return res.status(404).json({
            status:404,
            message:"Username or password error"
        })
    }
    if(!await argon.verify(existUser.password,password)){
        return res.status(404).json({
            status:404,
            message:"Username or password error"
        })
    }
    return res.status(201).json({
        status:201,
        message: "user was registered successfully",
        accessToken: JWT.sign({id:existUser.id,username:existUser.username,role:"ADMIN"},process.env.SECRET_KEY, {expiresIn:"30m"}),
        refreshToken: JWT.sign({id:existUser.id,username:existUser.username,role:"ADMIN"},process.env.SECRET_KEY, {expiresIn:"1h"})
    })
}

export default {
    register,
    login
}