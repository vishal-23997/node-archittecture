
import { Request, Response } from "express";
import uploadSingle from "../middleware/singleupload.helper";
import multer from "multer";
import uploadMultiple from "../middleware/multipleupload.helper";
import uploadVideo from "../middleware/video.helper";
const mt: any = require('media-thumbnail');
import path from 'path';



class MediaController {

    singleUpload = async (req: Request, res: Response) => {
        const uploadImages = uploadSingle.single('image');
        uploadImages(req, res, err => {
            if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
                if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                    res.send({ Status: "Please select only one Image at once !" })

                }
            } else if (err) {
                // handle other errors
                res.send({ Status: "Only jpg/jpeg/png Images are allowed !" })

            }
            else {

                res.send({ Status: "File uploaded succesfully" })
            }
        });
    }

    multipleUpload = async (req: Request, res: Response) => {

        const uploadImages = uploadMultiple.array('image', 3);
        uploadImages(req, res, err => {
            if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
                if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                    res.send({ Status: "Only 3 Images are allowed to upload at Once !" })
                }
            } else if (err) {
                // handle other errors
                res.send({ Status: "Only jpg/jpeg/png Images are allowed !" })
            }
            else {
                res.send({ Status: "Files uploaded succesfully" })
            }
            // Everything is ok.
        });
    }

    videoUpload = async (req: Request, res: Response) => {
        const uploadVideos = uploadVideo.single('video');
        uploadVideos(req, res, err => {
            if (err instanceof multer.MulterError) { // A Multer error occurred when uploading.
                if (err.code === "LIMIT_UNEXPECTED_FILE") { // Too many images exceeding the allowed limit
                    res.send({ Status: "Please select only one Video at once !" })

                }
            } else if (err) {
                // handle other errors
                res.send({ Status: "Only mp4/avi/mkv files are allowed !" })

            }
            else {
                //path.parse(filename).name;
                const fileName:string = path.parse(`${req.file?.originalname}`).name;
                
                mt.forVideo(
                    `src/media/video/${req.file?.originalname}`,
                    `/home/appinventiv/Desktop/VISHAL/jwt/src/media/video_thumbnails/${fileName}.png`, {
                    width: 200
                }).then(() => console.log('Success'))


                res.send({ Status: "File uploaded succesfully" })
            }
            // Everything is ok.
        });
    }



}
export default MediaController;