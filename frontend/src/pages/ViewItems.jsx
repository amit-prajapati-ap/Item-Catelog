import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../features/itemSlice';
import ItemCard from '../components/ItemCard';
import { ItemCardSkeleton } from '../components/Loader';
import { Package } from 'lucide-react';

const ViewItems = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-400 text-center">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Error loading items</h3>
          <p className="text-red-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Item Catalog</h1>
        <p className="text-gray-400">Discover our collection of premium items</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <ItemCardSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Package className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">No items found</h3>
          <p className="text-gray-400">Start by adding your first item to the catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewItems;