import React, { useState } from 'react';
import Layout from './components/Layout';
import CustomsLayout from './components/CustomsLayout';
import Dashboard from './components/Dashboard';
import CustomsDashboard from './components/CustomsDashboard';
import DocumentVerification from './components/DocumentVerification';
import RiskAnalysis from './components/RiskAnalysis';
import PhysicalControls from './components/PhysicalControls';
import NewDeclaration from './components/NewDeclaration';
import DeclarationSuccess from './components/DeclarationSuccess';
import type { Declaration } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isCustomsPortal, setIsCustomsPortal] = useState(false);
  const [currentDeclaration, setCurrentDeclaration] = useState<Declaration | null>(null);

  const handleNewDeclaration = () => {
    setCurrentPage('new-declaration');
  };

  const handleDeclarationSubmit = (declaration: Declaration) => {
    setCurrentDeclaration(declaration);
    setCurrentPage('declaration-success');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
    setIsCustomsPortal(false);
    setCurrentDeclaration(null);
  };

  const handlePageChange = (page: string) => {
    if (page === 'customs-portal') {
      setIsCustomsPortal(true);
      setCurrentPage('customs-dashboard');
    } else if (page.startsWith('customs-')) {
      setIsCustomsPortal(true);
      setCurrentPage(page);
    } else {
      setIsCustomsPortal(false);
      setCurrentPage(page);
    }
  };

  const renderContent = () => {
    if (isCustomsPortal) {
      switch (currentPage) {
        case 'customs-dashboard':
          return <CustomsDashboard />;
        case 'document-verification':
          return <DocumentVerification />;
        case 'risk-analysis':
          return <RiskAnalysis />;
        case 'physical-controls':
          return <PhysicalControls />;
        case 'approvals':
          return (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Module de Validation</h2>
              <p className="text-gray-600 mt-2">Fonctionnalité en cours de développement</p>
            </div>
          );
        case 'customs-settings':
          return (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900">Paramètres Douanes</h2>
              <p className="text-gray-600 mt-2">Fonctionnalité en cours de développement</p>
            </div>
          );
        default:
          return <CustomsDashboard />;
      }
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNewDeclaration={handleNewDeclaration} />;
      case 'new-declaration':
        return (
          <NewDeclaration 
            onBack={handleBackToDashboard}
            onSubmit={handleDeclarationSubmit}
          />
        );
      case 'declaration-success':
        return currentDeclaration ? (
          <DeclarationSuccess 
            declaration={currentDeclaration}
            onBack={handleBackToDashboard}
          />
        ) : null;
      case 'declarations':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Liste des Déclarations</h2>
            <p className="text-gray-600 mt-2">Fonctionnalité en cours de développement</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
            <p className="text-gray-600 mt-2">Fonctionnalité en cours de développement</p>
          </div>
        );
      default:
        return <Dashboard onNewDeclaration={handleNewDeclaration} />;
    }
  };

  const LayoutComponent = isCustomsPortal ? CustomsLayout : Layout;

  return (
    <LayoutComponent currentPage={currentPage} onPageChange={handlePageChange}>
      {renderContent()}
    </LayoutComponent>
  );
}

export default App;