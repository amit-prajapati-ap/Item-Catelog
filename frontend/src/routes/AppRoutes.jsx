import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ViewItems from '../pages/ViewItems';
import AddItem from '../pages/AddItem';
import ItemDetail from '../pages/ItemDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ViewItems />} />
        <Route path="add" element={<AddItem />} />
        <Route path="item/:id" element={<ItemDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;