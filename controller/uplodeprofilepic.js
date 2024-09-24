import File from '../modals/filemodel.js';
import getDataUri from '../utils/DataUri.js';
import {v2 as cloudinary} from 'cloudinary';
import { catchError } from '../middleware/catchError.js';
import jwt from 'jsonwebtoken';
import  dotenv from 'dotenv';

dotenv.config({
  path:"\.env"
})

export const uploadProfilePic = catchError(async (req, res, next) => {
  const file = req.file;
  const fileUri = getDataUri(file);
  const Tokensecret=process.env.TOKEN_SECRET

  const token = req.header('Authorization').replace('Bearer ', '');
  const decoded = jwt.verify(token, Tokensecret);
  const userId = decoded.id;

  const myCloud = await cloudinary.uploader.upload(fileUri);
  if (!myCloud) return next(new ErrorHandler('cloudinary Error', 500));

  const fileUploaded = await File.create({
    userId,
    profilepic: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    }
  });

  if (!fileUploaded) return next(new ErrorHandler("File upload failed", 409));

  res.status(200).json({
    success: true,
    fileuploded: fileUploaded,
    message: "Profile picture uploaded successfully"
  });
});

export const getProfilePic = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'shhhhhh');
    const userId = decoded.id;

    const file = await File.findOne({ userId });
    if (!file) {
      return res.status(404).json({ error: 'Profile picture not found' });
    }

    res.status(200).json({ profilePicUrl: file.profilepic });
  } catch (error) {
    console.error('Error fetching profile picture:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
