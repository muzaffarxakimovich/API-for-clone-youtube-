import osFile from "../utils/file-system.js"
import { extname, join } from "path"
const createFile = (req, res) =>{
    const { title } = req.body
    const { file } = req.files

    const filename = Date.now() + extname(file.name)
    let files = osFile.read("files")
    const newFile = {
        id: files.length ? files.at(-1).id + 1 : 1,
        filename,
        title,
        size: +(file.size / (1024 * 1024)).toFixed(2),
        userId: req.user.id,
        createdAt: new Date().toLocaleString()
    }
    file.mv(join(process.cwd(),"src","uploads","videos",filename), (err)=> console.log(err))
    
    files.push(newFile)
    osFile.write("files",files)
    res.status(201).json({
        status:201,
        title:"file was added successfuly"
    })
}

const getMyFiles = (req, res) =>{
    let files = osFile.read("files")
    let userVideos = files.filter((el)=>el.userId == req.user.id)
    res.status(201).json({
        status:201,
        userVideos,
        message:"Users Videos given!"
    })
}
const deleteUserVideo = (req, res) =>{
    const { id } = req.body
    let files = osFile.read("files")
    let deleted_video = files.find(el => el.id == id)
    if(deleted_video.userId != req.user.id){
        return res.status(400).json({
            status:400,
            message: "this video not belong to this user"
        })
    }
    let newFiles = files.filter((el)=>el.id != id)

    osFile.write("files",newFiles)
    res.status(201).json({
        status:201,
        message:"User Video deleted!"
    })
}

export default {
    createFile,
    getMyFiles,
    deleteUserVideo
}