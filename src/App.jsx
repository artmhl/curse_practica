import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

/**
 * Кореневий компонент застосунку.
 * Обгортає всі сторінки в ShopProvider (спільний стан кошика та обраного)
 * та BrowserRouter (маршрутизація).
 */
export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Routes>
          {/* Головна — каталог */}
          <Route path="/" element={<CatalogPage />} />

          {/* Сторінка товару за id */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ShopProvider>
  );
}
