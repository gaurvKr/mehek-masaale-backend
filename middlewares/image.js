import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";

const mongoUrl = 'mongodb+srv://NareshJatav:AsDf1234@cluster0.sopo6.mongodb.net/mehek_masaale_app?retryWrites=true&w=majority'

const storage = new GridFsStorage({
    url: mongoUrl,
    file: (req, file)=> {
        return new Promise((resolve,reject)=>{
            const filename = `image-${Date.now()}-${file.originalname}`
            const fileInfo = {
                filename: filename,
                bucketName: 'images'
            };
            resolve(fileInfo);
        }).catch((err) => console.log(err))
    }
})

const upload = multer({storage})

export default upload