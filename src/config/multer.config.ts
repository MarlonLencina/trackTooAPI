import multer from "multer";

import path from "path"

export const pathAvatars = path.resolve(__dirname, '..', '..', 'uploads')

console.log(pathAvatars)

export const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, pathAvatars)
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + "-" + uniqueSuffix)
 }})
 