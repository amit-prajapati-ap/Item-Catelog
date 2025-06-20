import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addItem } from '../features/itemSlice';
import Button from '../components/Button';
import { Upload, X } from 'lucide-react';

const ITEM_TYPES = [
  'Shirt', 'Pant', 'Shoes', 'Sports Gear', 'Electronics', 
  'Clothing', 'Accessories', 'Books', 'Home & Garden', 'Other'
];

const AddItem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addItemLoading } = useSelector((state) => state.items);

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: []
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (name === 'coverImage') {
      setFormData(prev => ({
        ...prev,
        coverImage: files[0]
      }));
    } else if (name === 'additionalImages') {
      setFormData(prev => ({
        ...prev,
        additionalImages: Array.from(files)
      }));
    }

    // Clear error when file is selected
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const removeAdditionalImage = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!formData.type) {
      newErrors.type = 'Item type is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.coverImage) {
      newErrors.coverImage = 'Cover image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(addItem(formData)).unwrap();
      toast.success('Item successfully added!');
      
      // Reset form
      setFormData({
        name: '',
        type: '',
        description: '',
        coverImage: null,
        additionalImages: []
      });
      
      // Navigate to view items after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Add New Item</h1>
        <p className="text-gray-400">Fill in the details to add a new item to the catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="space-y-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Item Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Enter item name"
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
          </div>

          {/* Item Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-2">
              Item Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.type ? 'border-red-500' : 'border-slate-600'
              }`}
              required
            >
              <option value="">Select item type</option>
              {ITEM_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-sm text-red-400">{errors.type}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 bg-slate-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                errors.description ? 'border-red-500' : 'border-slate-600'
              }`}
              placeholder="Enter item description"
              required
            />
            {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300 mb-2">
              Cover Image *
            </label>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              errors.coverImage ? 'border-red-500' : 'border-slate-600 hover:border-blue-500'
            }`}>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                required
              />
              <label htmlFor="coverImage" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400">
                  {formData.coverImage ? formData.coverImage.name : 'Click to upload cover image'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
            {errors.coverImage && <p className="mt-1 text-sm text-red-400">{errors.coverImage}</p>}
          </div>

          {/* Additional Images */}
          <div>
            <label htmlFor="additionalImages" className="block text-sm font-medium text-gray-300 mb-2">
              Additional Images (Optional)
            </label>
            <div className="border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg p-6 text-center transition-colors">
              <input
                type="file"
                id="additionalImages"
                name="additionalImages"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="hidden"
              />
              <label htmlFor="additionalImages" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-400">
                  {formData.additionalImages.length > 0 
                    ? `${formData.additionalImages.length} files selected` 
                    : 'Click to upload additional images'
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">Multiple files allowed</p>
              </label>
            </div>
            
            {/* Show selected additional images */}
            {formData.additionalImages.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.additionalImages.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-slate-700 p-2 rounded">
                    <span className="text-sm text-gray-300 truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAdditionalImage(index)}
                      className="text-red-400 hover:text-red-300 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              disabled={addItemLoading}
              className='cursor-pointer'
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={addItemLoading}
              disabled={addItemLoading}
              className='cursor-pointer'
            >
              Add Item
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddItem;