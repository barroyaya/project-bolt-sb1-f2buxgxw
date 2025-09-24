import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, FileText, TrendingUp, Eye, Printer } from 'lucide-react';
import type { Declaration } from '../types';

interface DeclarationSuccessProps {
  declaration: Declaration;
  onBack: () => void;
}

export default function DeclarationSuccess({ declaration, onBack }: DeclarationSuccessProps) {
  const [progress, setProgress] = useState(80);
  const [currentStatus, setCurrentStatus] = useState('En cours de vérification');

  useEffect(() => {
    // Simulation du suivi en temps réel
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          return prev + 2;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    { name: 'Dépôt électronique', time: '15/10 14h30', status: 'completed' },
    { name: 'Validation documentaire', time: '15/10 15h45', status: 'completed' },
    { name: 'Contrôle conformité ZLECAF', time: 'en cours', status: 'current' },
    { name: 'Liquidation taxes', time: 'prévu 16/10 14h00', status: 'pending' },
    { name: 'BAE + Libération', time: 'prévu 16/10 16h30', status: 'pending' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Soumission Réussie !</h1>
        <p className="text-gray-600 mt-2">Votre déclaration a été transmise avec succès aux douanes</p>
      </div>

      {/* Declaration Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de la Déclaration</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">N° Enregistrement:</span>
                <span className="font-medium">{declaration.numero}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Déposée le:</span>
                <span className="font-medium">15/10/2025 à 14:30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Circuit:</span>
                <span className="font-medium text-green-600">VERT (Contrôle documentaire)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Délai:</span>
                <span className="font-medium">24 heures maximum</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents Transmis</h3>
            <div className="space-y-2">
              {declaration.documents.map((doc) => (
                <div key={doc.id} className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">{doc.nom}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-900">Économies Réalisées</span>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {declaration.economiesZLECAF.toLocaleString()} USD
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-900">Temps Total</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 mt-1">8 minutes</p>
              <p className="text-sm text-blue-700">au lieu de 2 jours !</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Suivi Temps Réel</h3>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Statut Actuel: {currentStatus}</span>
            <span className="text-sm text-gray-500">Prédiction IA: Libération demain 16h30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-right text-sm text-gray-500 mt-1">{progress}%</div>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`flex-shrink-0 w-4 h-4 rounded-full ${
                step.status === 'completed' ? 'bg-green-500' :
                step.status === 'current' ? 'bg-blue-500 animate-pulse' :
                'bg-gray-300'
              }`}></div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className={`font-medium ${
                    step.status === 'completed' ? 'text-green-700' :
                    step.status === 'current' ? 'text-blue-700' :
                    'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  <span className="text-sm text-gray-500">{step.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={onBack}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Retour au Tableau de Bord
        </button>
        <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Printer className="h-5 w-5" />
          <span>Imprimer Quittance</span>
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Eye className="h-5 w-5" />
          <span>Suivi Détaillé</span>
        </button>
      </div>
    </div>
  );
}