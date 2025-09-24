import React from 'react';
import { TrendingUp, AlertTriangle, FileText, DollarSign, Plus, Eye } from 'lucide-react';
import type { DashboardStats } from '../types';

interface DashboardProps {
  onNewDeclaration: () => void;
}

export default function Dashboard({ onNewDeclaration }: DashboardProps) {
  const stats: DashboardStats = {
    declarationsEnCours: 47,
    alertesZLECAF: 3,
    documentsEnAttente: 12,
    economiesMois: 127000
  };

  const alertes = [
    {
      id: 1,
      type: 'economie',
      message: 'Économie possible : 45,000$ sur import cacao Ghana',
      priority: 'high'
    },
    {
      id: 2,
      type: 'quota',
      message: 'Quota disponible : Textile Burkina Faso (87% restant)',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'expiration',
      message: 'Certificat expire : COO #445 dans 5 jours',
      priority: 'high'
    }
  ];

  const recentDeclarations = [
    {
      id: 'DI2025001246',
      produit: 'Textile Burkina Faso',
      valeur: '850,000 USD',
      statut: 'En cours',
      economies: '25,000 USD'
    },
    {
      id: 'DI2025001245',
      produit: 'Café Éthiopie',
      valeur: '1,200,000 USD',
      statut: 'Approuvé',
      economies: '60,000 USD'
    },
    {
      id: 'DI2025001244',
      produit: 'Mangues Mali',
      valeur: '300,000 USD',
      statut: 'Libéré',
      economies: '15,000 USD'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de vos opérations douanières</p>
        </div>
        <button
          onClick={onNewDeclaration}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle Déclaration</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Déclarations</p>
              <p className="text-3xl font-bold text-gray-900">{stats.declarationsEnCours}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Économies</p>
              <p className="text-3xl font-bold text-green-600">{stats.economiesMois.toLocaleString()} $</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-3xl font-bold text-gray-900">{stats.documentsEnAttente}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertes</p>
              <p className="text-3xl font-bold text-red-600">{stats.alertesZLECAF}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes ZLECAF */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-semibold text-gray-900">Alertes ZLECAF</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alertes.map((alerte) => (
              <div
                key={alerte.id}
                className={`p-4 rounded-lg border-l-4 ${
                  alerte.priority === 'high'
                    ? 'bg-red-50 border-red-400'
                    : 'bg-yellow-50 border-yellow-400'
                }`}
              >
                <p className="text-sm font-medium text-gray-900">{alerte.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Déclarations Récentes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Déclarations Récentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Déclaration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Économies
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDeclarations.map((declaration) => (
                <tr key={declaration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {declaration.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.produit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.valeur}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      declaration.statut === 'Approuvé' ? 'bg-green-100 text-green-800' :
                      declaration.statut === 'En cours' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {declaration.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {declaration.economies}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>Voir</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}