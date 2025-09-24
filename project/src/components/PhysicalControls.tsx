import React, { useState } from 'react';
import { Package, MapPin, Clock, User, CheckCircle, XCircle, AlertTriangle, Camera } from 'lucide-react';
import type { CustomsControl } from '../types';

export default function PhysicalControls() {
  const [selectedControl, setSelectedControl] = useState<string | null>(null);

  const physicalControls: CustomsControl[] = [
    {
      id: 'CTRL_2025_001',
      declarationId: 'DI2025001248',
      controlType: 'physical',
      status: 'scheduled',
      assignedOfficer: 'Inspecteur TRAORE Sekou',
      scheduledDate: '2025-10-16T09:00:00Z',
      findings: [],
      decision: 'hold'
    },
    {
      id: 'CTRL_2025_002',
      declarationId: 'DI2025001250',
      controlType: 'scanner',
      status: 'in_progress',
      assignedOfficer: 'Inspecteur KOUAME Marie',
      scheduledDate: '2025-10-15T14:30:00Z',
      findings: [
        {
          category: 'quantity',
          description: 'Écart de poids détecté: +3.2% par rapport à la déclaration',
          evidence: ['scanner_image_001.jpg', 'weight_report.pdf'],
          impact: 'minor'
        }
      ],
      decision: 'hold'
    },
    {
      id: 'CTRL_2025_003',
      declarationId: 'DI2025001247',
      controlType: 'physical',
      status: 'completed',
      assignedOfficer: 'Inspecteur KONE Mamadou',
      scheduledDate: '2025-10-15T10:00:00Z',
      completedDate: '2025-10-15T11:30:00Z',
      findings: [
        {
          category: 'quality',
          description: 'Qualité conforme aux standards - Fèves de cacao Grade A',
          evidence: ['quality_report.pdf', 'photos_echantillon.jpg'],
          impact: 'none'
        },
        {
          category: 'quantity',
          description: 'Poids vérifié conforme: 500,000 kg exactement',
          evidence: ['weighing_certificate.pdf'],
          impact: 'none'
        }
      ],
      decision: 'release'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case 'release': return 'text-green-600 bg-green-100';
      case 'hold': return 'text-orange-600 bg-orange-100';
      case 'seize': return 'text-red-600 bg-red-100';
      case 'penalty': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'none': return 'text-green-600';
      case 'minor': return 'text-yellow-600';
      case 'major': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const controlTypeLabels = {
    physical: 'Contrôle Physique',
    scanner: 'Scanner/Rayons X',
    laboratory: 'Analyse Laboratoire',
    documentary: 'Contrôle Documentaire'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contrôles Physiques</h1>
          <p className="text-gray-600 mt-1">Gestion et suivi des contrôles physiques des marchandises</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Package className="h-5 w-5" />
          <span>Programmer Contrôle</span>
        </button>
      </div>

      {/* Stats des contrôles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Programmés</p>
              <p className="text-3xl font-bold text-blue-600">
                {physicalControls.filter(c => c.status === 'scheduled').length}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">En Cours</p>
              <p className="text-3xl font-bold text-orange-600">
                {physicalControls.filter(c => c.status === 'in_progress').length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Terminés</p>
              <p className="text-3xl font-bold text-green-600">
                {physicalControls.filter(c => c.status === 'completed').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Libérations</p>
              <p className="text-3xl font-bold text-green-600">
                {physicalControls.filter(c => c.decision === 'release').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Liste des contrôles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Contrôles en Cours</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Contrôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Déclaration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspecteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Programmé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Décision
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {physicalControls.map((control) => (
                <tr key={control.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {control.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {control.declarationId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {controlTypeLabels[control.controlType]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(control.status)}`}>
                      {control.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {control.assignedOfficer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(control.scheduledDate).toLocaleString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDecisionColor(control.decision)}`}>
                      {control.decision.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setSelectedControl(control.id)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Détails
                    </button>
                    {control.status === 'scheduled' && (
                      <button className="text-green-600 hover:text-green-900">
                        Démarrer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Détails du contrôle sélectionné */}
      {selectedControl && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {(() => {
            const control = physicalControls.find(c => c.id === selectedControl);
            if (!control) return null;

            return (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Détails du Contrôle - {control.id}
                  </h3>
                  <button
                    onClick={() => setSelectedControl(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Déclaration</label>
                      <p className="text-lg font-semibold text-gray-900">{control.declarationId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type de Contrôle</label>
                      <p className="text-gray-900">{controlTypeLabels[control.controlType]}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inspecteur Assigné</label>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-900">{control.assignedOfficer}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Date Programmée</label>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-900">
                          {new Date(control.scheduledDate).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    {control.completedDate && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Date de Fin</label>
                        <p className="text-gray-900">
                          {new Date(control.completedDate).toLocaleString('fr-FR')}
                        </p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Statut</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(control.status)}`}>
                        {control.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Constatations */}
                {control.findings.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Constatations</h4>
                    <div className="space-y-4">
                      {control.findings.map((finding, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className={`h-5 w-5 ${getImpactColor(finding.impact)}`} />
                              <span className="font-medium text-gray-900 capitalize">
                                {finding.category.replace('_', ' ')}
                              </span>
                            </div>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              finding.impact === 'none' ? 'bg-green-100 text-green-800' :
                              finding.impact === 'minor' ? 'bg-yellow-100 text-yellow-800' :
                              finding.impact === 'major' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {finding.impact.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{finding.description}</p>
                          {finding.evidence.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Preuves:</p>
                              <div className="flex flex-wrap gap-2">
                                {finding.evidence.map((evidence, evidenceIndex) => (
                                  <div key={evidenceIndex} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded text-sm">
                                    <Camera className="h-3 w-3 text-gray-500" />
                                    <span className="text-gray-700">{evidence}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Décision:</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getDecisionColor(control.decision)}`}>
                      {control.decision.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    {control.status === 'in_progress' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                          Libérer
                        </button>
                        <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                          Retenir
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                          Saisir
                        </button>
                      </>
                    )}
                    <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                      Rapport
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}