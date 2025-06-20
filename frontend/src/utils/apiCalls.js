const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Replace with actual API URL
import axios from 'axios';

export const getAllItems = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/item/get-all-items`);

    if (data.success) {
      return data.data.items; // Success payload
    } else {
      throw new Error(data.message || 'Failed to fetch items');
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error occurred while fetching items'
    );
  }
};

export const getItem = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/item/get-item/${id}`);

    if (data.success) {
      return data.data; // Success payload
    } else {
      throw new Error(data.message || 'Failed to fetch item');
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error occurred while fetching item'
    );
  }
};

export const createItem = async (itemData) => {
  try {
    const form = new FormData();
    form.append("name", itemData.name);
    form.append("type", itemData.type);
    form.append("description", itemData.description);
    form.append("coverImage", itemData.coverImage); // ✅ File

    itemData.additionalImages.forEach((img) => {
      form.append("additionalImages", img); // ✅ Multiple files with same key
    });
    const { data } = await axios.post(`${API_BASE_URL}/item/add-item`, form);

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || 'Failed to create item');
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error occurred while creating item'
    );
  }
};

export const sendingEnquiry = async (enquiryData) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/send-enquiry`, enquiryData);

    if (data.success) {
      return true
    } else {
      throw new Error(data.message || 'Failed to send enquiry');
    }
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      'Unknown error occurred while sending enquiry'
    );
  }
};