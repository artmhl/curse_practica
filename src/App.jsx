import { HashRouter, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';

/**
 * Кореневий компонент застосунку.
 * Обгортає всі сторінки в ShopProvider (спільний стан кошика та обраного)
 * та HashRouter (маршрутизація через # для сумісності з GitHub Pages).
 */
export default function App() {
  return (
    <ShopProvider>
      <HashRouter>
        <Routes>
          {/* Головна — каталог */}
          <Route path="/" element={<CatalogPage />} />

          {/* Сторінка товару за id */}
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </HashRouter>
    </ShopProvider>
  );
}
