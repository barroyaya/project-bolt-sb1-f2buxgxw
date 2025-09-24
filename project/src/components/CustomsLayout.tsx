import React from 'react';
import { Shield, FileSearch, AlertTriangle, Settings, Bell, User, LogOut, Eye, CheckCircle } from 'lucide-react';

interface CustomsLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function CustomsLayout({ children, currentPage, onPageChange }: CustomsLayoutProps) {
  const menuItems = [
    { id: 'customs-dashboard', label: 'Tableau de Bord', icon: Shield },
    { id: 'document-verification', label: 'Vérification Documents', icon: FileSearch },
    { id: 'risk-analysis', label: 'Analyse des Risques', icon: AlertTriangle },
    { id: 'physical-controls', label: 'Contrôles Physiques', icon: Eye },
    { id: 'approvals', label: 'Validations', icon: CheckCircle },
    { id: 'customs-settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-800 shadow-sm border-b border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-white">DOUANES CI - CONTRÔLE IA</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-red-200 hover:text-white">
                <Bell className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <p className="font-medium text-white">Inspecteur KONE Mamadou</p>
                  <p className="text-red-200">Badge: DCI-2024-789</p>
                </div>
                <button className="p-2 text-red-200 hover:text-white">
                  <User className="h-6 w-6" />
                </button>
                <button className="p-2 text-red-200 hover:text-white">
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onPageChange(item.id)}
                      className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === item.id
                          ? 'bg-red-100 text-red-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}