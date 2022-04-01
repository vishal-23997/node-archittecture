import multer from 'multer';
import { Request} from 'express';
import fs from 'fs';

let storage:multer.StorageEngine = multer.diskStorage({
    destination: function (req:Request, file, cb) {
        if (!fs.existsSync('/home/appinventiv/Desktop/VISHAL/jwt/src/media/video')) {
            fs.mkdirSync('/home/appinventiv/Desktop/VISHAL/jwt/src/media/video');
        }
        cb(null, '/home/appinventiv/Desktop/VISHAL/jwt/src/media/video');
    },
    filename: function (req:Request, file, cb) {
        cb(null, file.originalname);
        // cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {

    if (!file.originalname.match(/\.(mp4|avi|mkv)$/)) {
        return cb(new Error('Only mp4/avi/mkv files are allowed !'))
    }
    cb(null, true)

};

const uploadVideo:multer.Multer = multer({ storage: storage, fileFilter: fileFilter });


export default uploadVideo;