import multer from  "multer";
//const { CloudinaryStorage } = require('multer-storage-cloudinary');


/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  }) */

  const storage=multer.memoryStorage();

  const singleUpload=multer({storage}).single('file');

  export default singleUpload;

 

 /* const videostorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'videos',
      resource_type: 'video', // Set resource type to 'video'
      allowedFormats: ['mp4', 'mov', 'avi', 'mkv'],
    },
  });
  const uploadVideo = multer({ videostorage: videostorage });*/
//const upload = multer({ storage: storage });

//export default upload;
//module.exports = uploadVideo;