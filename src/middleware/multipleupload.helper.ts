import multer from 'multer';
import { Request } from 'express';
import fs from 'fs';

let storage:multer.StorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('/home/appinventiv/Desktop/VISHAL/jwt/src/media/images')) {
            fs.mkdirSync('/home/appinventiv/Desktop/VISHAL/jwt/src/media/images');
        }
        cb(null, '/home/appinventiv/Desktop/VISHAL/jwt/src/media/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, Date.now() + '-' + file.originalname);
    }
})

const fileFilter = (req: Request, file: any, cb: any) => {

    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
        // upload only png and jpg format
        return cb(new Error('Only jpg/jpeg/png Images are allowed !'))
    }
    cb(null, true)

};

const uploadMultiple:multer.Multer = multer({ storage: storage, fileFilter: fileFilter });


export default uploadMultiple;