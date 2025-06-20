import express from 'express';
import { getAllItem, getItem, newItem } from '../controllers/items.controller.js';
import {upload} from '../middleware/multer.middleware.js';

const itemRouter = express.Router();

itemRouter.get('/get-all-items', getAllItem);
itemRouter.get('/get-item/:id', getItem);

itemRouter.post(
  '/add-item',
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 } // Adjust maxCount as needed
  ]),
  newItem
);

export {itemRouter};