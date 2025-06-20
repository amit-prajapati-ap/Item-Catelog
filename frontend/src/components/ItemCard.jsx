import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/item/${item._id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:scale-[1.02] border border-slate-700/50 hover:border-blue-500/50"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=500';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {item.name}
        </h3>
        <p className="text-sm text-gray-400 mb-1">{item.type}</p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;