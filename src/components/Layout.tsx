
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Users, Target, Info } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/upload-skkni', label: 'Unggah SKKNI', icon: Upload },
    { path: '/peta-mitra', label: 'Peta Materi Mitra', icon: Users },
    { path: '/rekomendasi', label: 'Rekomendasi Mitra', icon: Target },
    { path: '/tentang', label: 'Tentang Kami', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#003366] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#0099FF] rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold">K</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Pusat Pengembangan Talenta Digital</h1>
                <p className="text-sm text-blue-200">Kementerian Komunikasi dan Informatika</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    isActive(item.path)
                      ? 'border-[#0099FF] text-[#003366]'
                      : 'border-transparent text-gray-600 hover:text-[#003366]'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#003366] text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm text-blue-200">
              © 2024 Pusat Pengembangan Talenta Digital - Kementerian Komunikasi dan Informatika
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
