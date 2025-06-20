import { Item } from "../models/Item.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllItem = async (req, res) => {
  try {
    const items = await Item.find()
    res.status(200).json(new ApiResponse(200, { length: items.length, items }, "All Items Fetched Successfully"))
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error occured while fetching all Items", error))
  }
}

const getItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findById(id)
    res.status(200).json(new ApiResponse(200, item, "Item Fetched Successfully"))
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error occured while fetching Item", error))
  }
}

const newItem = async (req, res) => {
  try {
    const { name, type, description } = req.body;

    if (!name || !type) {
      return res.status(400).json(new ApiError(400, "Name and Type are required"));
    }

    // ✅ Validate cover image
    const coverBuffer = req.files?.coverImage?.[0]?.buffer;
    if (!coverBuffer) {
      return res.status(400).json(new ApiError(400, "Cover Image is required"));
    }

    // ✅ Upload cover image to Cloudinary
    const uploadedCover = await uploadOnCloudinary(coverBuffer);
    if (!uploadedCover) {
      return res.status(500).json(new ApiError(500, "Failed to upload cover image"));
    }

    // ✅ Upload additional images
    const additionalImageBuffers = req.files?.additionalImages || [];
    const additionalImageUrls = [];

    for (const image of additionalImageBuffers) {
      const uploadedImg = await uploadOnCloudinary(image.buffer);
      if (uploadedImg) {
        additionalImageUrls.push(uploadedImg.url);
      }
    }

    // ✅ Create item in DB
    const item = await Item.create({
      name,
      coverImage: uploadedCover.url,
      additionalImages: additionalImageUrls,
      type,
      description
    });

    res.status(200).json(new ApiResponse(200, item, "Item created successfully"));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Server error while creating item", error));
  }
};


export { getAllItem, newItem, getItem };