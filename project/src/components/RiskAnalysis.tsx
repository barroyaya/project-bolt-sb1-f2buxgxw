import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, Shield, Target, Brain, BarChart3 } from 'lucide-react';
import type { RiskAssessment } from '../types';

export default function RiskAnalysis() {
  const [selectedDeclaration, setSelectedDeclaration] = useState<string>('DI2025001247');

  const riskAssessments: RiskAssessment[] = [
    {
      declarationId: 'DI2025001247',
      overallRisk: 'medium',
      riskFactors: {
        importerHistory: 0.2,
        productRisk: 0.3,
        originCountry: 0.1,
        valueConsistency: 0.4,
        documentAuthenticity: 0.1
      },
      recommendedControls: ['Vérification documentaire approfondie', 'Contrôle de la valeur'],
      aiConfidence: 0.89
    },
    {
      declarationId: 'DI2025001248',
      overallRisk: 'high',
      riskFactors: {
        importerHistory: 0.7,
        productRisk: 0.6,
        originCountry: 0.4,
        valueConsistency: 0.8,
        documentAuthenticity: 0.5
      },
      recommendedControls: ['Contrôle physique obligatoire', 'Vérification laboratoire', 'Audit complet'],
      aiConfidence: 0.94
    },
    {
      declarationId: 'DI2025001249',
      overallRisk: 'low',
      riskFactors: {
        importerHistory: 0.1,
        productRisk: 0.2,
        originCountry: 0.1,
        valueConsistency: 0.1,
        documentAuthenticity: 0.05
      },
      recommendedControls: ['Contrôle documentaire standard'],
      aiConfidence: 0.96
    }
  ];

  const currentAssessment = riskAssessments.find(r => r.declarationId === selectedDeclaration);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      case 'critical': return 'text-red-800 bg-red-200';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRiskScore = (value: number) => {
    if (value <= 0.3) return 'low';
    if (value <= 0.6) return 'medium';
    if (value <= 0.8) return 'high';
    return 'critical';
  };

  const riskFactorLabels = {
    importerHistory: 'Historique Importateur',
    productRisk: 'Risque Produit',
    originCountry: 'Pays d\'Origine',
    valueConsistency: 'Cohérence Valeur',
    documentAuthenticity: 'Authenticité Documents'
  };

  const globalStats = {
    totalDeclarations: 156,
    highRisk: 12,
    mediumRisk: 34,
    lowRisk: 110,
    fraudDetected: 3,
    economiesRecouvrements: 2400000
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analyse des Risques IA</h1>
          <p className="text-gray-600 mt-1">Évaluation intelligente et prédictive des risques douaniers</p>
        </div>
        <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-lg">
          <Brain className="h-5 w-5 text-purple-600" />
          <span className="text-purple-800 font-medium">IA Active</span>
        </div>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{globalStats.totalDeclarations}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{globalStats.highRisk}</p>
            <p className="text-sm text-gray-600">Risque Élevé</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{globalStats.mediumRisk}</p>
            <p className="text-sm text-gray-600">Risque Moyen</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{globalStats.lowRisk}</p>
            <p className="text-sm text-gray-600">Risque Faible</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-800">{globalStats.fraudDetected}</p>
            <p className="text-sm text-gray-600">Fraudes</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{(globalStats.economiesRecouvrements / 1000000).toFixed(1)}M</p>
            <p className="text-sm text-gray-600">Recouvrements</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sélection de déclaration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Déclarations à Analyser</h3>
          <div className="space-y-3">
            {riskAssessments.map((assessment) => (
              <button
                key={assessment.declarationId}
                onClick={() => setSelectedDeclaration(assessment.declarationId)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selectedDeclaration === assessment.declarationId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{assessment.declarationId}</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(assessment.overallRisk)}`}>
                    {assessment.overallRisk.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Confiance IA: {Math.round(assessment.aiConfidence * 100)}%
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Analyse détaillée */}
        <div className="lg:col-span-2 space-y-6">
          {currentAssessment && (
            <>
              {/* Score de risque global */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Évaluation Globale - {currentAssessment.declarationId}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">
                      Confiance: {Math.round(currentAssessment.aiConfidence * 100)}%
                    </span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold ${getRiskColor(currentAssessment.overallRisk)}`}>
                    <AlertTriangle className="h-6 w-6 mr-2" />
                    RISQUE {currentAssessment.overallRisk.toUpperCase()}
                  </div>
                </div>

                {/* Facteurs de risque */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Facteurs de Risque:</h4>
                  {Object.entries(currentAssessment.riskFactors).map(([factor, value]) => (
                    <div key={factor} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">
                          {riskFactorLabels[factor as keyof typeof riskFactorLabels]}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(getRiskScore(value))}`}>
                          {Math.round(value * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            value <= 0.3 ? 'bg-green-500' :
                            value <= 0.6 ? 'bg-yellow-500' :
                            value <= 0.8 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${value * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommandations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Contrôles Recommandés</h3>
                </div>
                <div className="space-y-3">
                  {currentAssessment.recommendedControls.map((control, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                      </div>
                      <span className="text-orange-800">{control}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Disponibles</h3>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Programmer Contrôle
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Valider Déclaration
                  </button>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                    Demander Documents
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Suspendre Process
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
                    Générer Rapport
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}