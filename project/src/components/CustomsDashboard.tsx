import React from 'react';
import { Shield, AlertTriangle, FileText, Clock, TrendingUp, Eye, CheckCircle, XCircle } from 'lucide-react';

export default function CustomsDashboard() {
  const stats = {
    declarationsEnAttente: 23,
    controlesEnCours: 8,
    alertesRisque: 5,
    validationsJour: 47
  };

  const priorityDeclarations = [
    {
      id: 'DI2025001247',
      importateur: 'OLAM CÔTE D\'IVOIRE',
      produit: 'Fèves de cacao',
      valeur: '2,500,000 USD',
      risque: 'medium',
      statut: 'En vérification',
      delai: '2h restantes'
    },
    {
      id: 'DI2025001248',
      importateur: 'SIFCA GROUP',
      produit: 'Huile de palme',
      valeur: '1,800,000 USD',
      risque: 'high',
      statut: 'Contrôle physique requis',
      delai: '4h restantes'
    },
    {
      id: 'DI2025001249',
      importateur: 'NESTLÉ CI',
      produit: 'Matières premières',
      valeur: '950,000 USD',
      risque: 'low',
      statut: 'Prêt validation',
      delai: '1h restante'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'valuation',
      message: 'Écart de valeur détecté : DI2025001250 (+15% vs prix marché)',
      priority: 'high',
      time: '10 min'
    },
    {
      id: 2,
      type: 'document',
      message: 'Certificat d\'origine suspect : Signature non conforme',
      priority: 'critical',
      time: '25 min'
    },
    {
      id: 3,
      type: 'pattern',
      message: 'Importateur nouveau : Première déclaration > 1M USD',
      priority: 'medium',
      time: '1h'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-50 border-red-400 text-red-800';
      case 'high': return 'bg-orange-50 border-orange-400 text-orange-800';
      case 'medium': return 'bg-yellow-50 border-yellow-400 text-yellow-800';
      default: return 'bg-blue-50 border-blue-400 text-blue-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contrôle Douanier IA</h1>
          <p className="text-gray-600 mt-1">Supervision intelligente des déclarations d'importation</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-lg">
          <Shield className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">Système Opérationnel</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Attente</p>
              <p className="text-3xl font-bold text-orange-600">{stats.declarationsEnAttente}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Contrôles</p>
              <p className="text-3xl font-bold text-blue-600">{stats.controlesEnCours}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Alertes</p>
              <p className="text-3xl font-bold text-red-600">{stats.alertesRisque}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Validées</p>
              <p className="text-3xl font-bold text-green-600">{stats.validationsJour}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alertes Prioritaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Alertes Prioritaires</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.priority)}`}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium">{alert.message}</p>
                  <span className="text-sm opacity-75">il y a {alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Déclarations Prioritaires */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Déclarations Prioritaires</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Déclaration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Délai
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {priorityDeclarations.map((declaration) => (
                <tr key={declaration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {declaration.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.importateur}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.produit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.valeur}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(declaration.risque)}`}>
                      {declaration.risque.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {declaration.statut}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    {declaration.delai}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
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