import Header from './Header';

/**
 * Загальна обгортка сторінок.
 * Рендерить шапку та контент у main-секції.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="text-center text-xs text-gray-400 py-4 border-t border-gray-200">
        © 2025 ShopReact — навчальний проєкт
      </footer>
    </div>
  );
}
