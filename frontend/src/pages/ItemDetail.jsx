import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { sendEnquiry, clearCurrentItem, setCurrentItem, fetchItem } from '../features/itemSlice';
import Carousel from '../components/Carousel';
import Button from '../components/Button';
import { ItemDetailSkeleton } from '../components/Loader';
import { ArrowLeft, Mail, Package } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentItem, loading, error, enquiryLoading, items } = useSelector((state) => state.items);

  useEffect(() => {
    if (id) {
      dispatch(fetchItem(id));
    }
  }, [dispatch, id]);

  const handleEnquiry = async () => {
    try {
      await dispatch(sendEnquiry({
        itemId: currentItem._id,
        itemName: currentItem.name,
        timestamp: new Date().toISOString()
      })).unwrap();
      
      toast.success('Enquiry sent successfully! We will get back to you soon.');
    } catch (error) {
      toast.error('Failed to send enquiry. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div>
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Items
          </Button>
        </div>
        <ItemDetailSkeleton />
      </div>
    );
  }

  if (error || !currentItem) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-white mb-2">Item not found</h3>
          <p className="text-gray-400 mb-4">{error || 'The requested item could not be found.'}</p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Items
          </Button>
        </div>
      </div>
    );
  }

  const allImages = [currentItem.coverImage, ...(currentItem.additionalImages || [])];

  return (
    <div>
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Carousel */}
          <div>
            <Carousel images={allImages} autoplay={true} />
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{currentItem.name}</h1>
              <span className="inline-block bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                {currentItem.type}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
              <p className="text-gray-300 leading-relaxed">{currentItem.description}</p>
            </div>

            {currentItem.createdAt && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Added</h3>
                <p className="text-gray-400">
                  {new Date(currentItem.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            )}

            <div className="pt-4">
              <Button
                onClick={handleEnquiry}
                loading={enquiryLoading}
                disabled={enquiryLoading}
                size="lg"
                className="w-full sm:w-auto cursor-pointer"
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Enquiry
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;