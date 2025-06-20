import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Package, Plus, Home } from 'lucide-react';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors">
              <Package className="h-8 w-8" />
              <span className="text-xl font-bold">ItemCatalog</span>
            </Link>
            
            <div className="flex space-x-4 max-sm:space-x-0">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 max-sm:px-2 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>View Items</span>
              </Link>
              <Link
                to="/add"
                className={`flex items-center space-x-1 px-3 max-sm:px-0 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/add' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Add Item</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;