import React, { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, XCircle, Eye, Download, ZoomIn as Zoom, RotateCw } from 'lucide-react';
import type { Document, DocumentVerification as DocVerification, VerificationFinding } from '../types';

export default function DocumentVerification() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<{ [key: string]: string }>({});

  const documentsToVerify = [
    {
      id: 'doc_1',
      declarationId: 'DI2025001247',
      nom: 'Facture Commerciale - OLAM.pdf',
      type: 'facture',
      importateur: 'OLAM CÔTE D\'IVOIRE',
      valeur: '2,500,000 USD',
      aiAnalysis: {
        confiance: 0.94,
        findings: [
          {
            type: 'compliant',
            field: 'Montant total',
            description: 'Montant cohérent avec les documents annexes',
            severity: 'low',
            autoDetected: true
          },
          {
            type: 'warning',
            field: 'Signature',
            description: 'Signature électronique détectée - Vérification manuelle recommandée',
            severity: 'medium',
            autoDetected: true
          }
        ] as VerificationFinding[],
        extractedData: {
          vendeur: 'GHANA COCOA BOARD',
          acheteur: 'OLAM CÔTE D\'IVOIRE',
          montant: '2,500,000 USD',
          devise: 'USD',
          dateFacture: '10/10/2025',
          numeroFacture: 'GCB-2025-4567'
        }
      }
    },
    {
      id: 'doc_2',
      declarationId: 'DI2025001247',
      nom: 'Certificat Origine Ghana.pdf',
      type: 'certificat',
      importateur: 'OLAM CÔTE D\'IVOIRE',
      valeur: '2,500,000 USD',
      aiAnalysis: {
        confiance: 0.98,
        findings: [
          {
            type: 'compliant',
            field: 'Signature officielle',
            description: 'Signature et cachet officiels Ghana Export Promotion Authority',
            severity: 'low',
            autoDetected: true
          },
          {
            type: 'compliant',
            field: 'Code HS',
            description: 'Code HS 1801.00.00 conforme pour fèves de cacao',
            severity: 'low',
            autoDetected: true
          },
          {
            type: 'compliant',
            field: 'Éligibilité ZLECAF',
            description: '100% origine Ghana - Éligible tarif préférentiel',
            severity: 'low',
            autoDetected: true
          }
        ] as VerificationFinding[],
        extractedData: {
          paysOrigine: 'Ghana',
          produit: 'Fèves de cacao',
          codeHS: '1801.00.00',
          quantite: '500,000 kg',
          certificatNum: 'GH-COO-2025-8901',
          dateEmission: '08/10/2025'
        }
      }
    },
    {
      id: 'doc_3',
      declarationId: 'DI2025001248',
      nom: 'Connaissement Maritime.pdf',
      type: 'connaissement',
      importateur: 'SIFCA GROUP',
      valeur: '1,800,000 USD',
      aiAnalysis: {
        confiance: 0.87,
        findings: [
          {
            type: 'discrepancy',
            field: 'Poids déclaré',
            description: 'Écart de 2.3% entre poids brut et net déclaré',
            severity: 'medium',
            autoDetected: true
          },
          {
            type: 'suspicious',
            field: 'Port de chargement',
            description: 'Port inhabituel pour ce type de marchandise',
            severity: 'high',
            autoDetected: true
          }
        ] as VerificationFinding[],
        extractedData: {
          navire: 'MSC MEDITERRANEAN',
          portChargement: 'Port de Lomé',
          portDechargement: 'Port d\'Abidjan',
          poidsBrut: '1,850 tonnes',
          poidsNet: '1,807 tonnes',
          dateChargement: '12/10/2025'
        }
      }
    }
  ];

  const handleVerification = (docId: string, status: string) => {
    setVerificationStatus(prev => ({ ...prev, [docId]: status }));
  };

  const getFindingColor = (type: string) => {
    switch (type) {
      case 'compliant': return 'text-green-700 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'discrepancy': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'suspicious': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getFindingIcon = (type: string) => {
    switch (type) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'discrepancy': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'suspicious': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vérification des Documents</h1>
          <p className="text-gray-600 mt-1">Contrôle intelligent assisté par IA</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
          <Eye className="h-5 w-5 text-blue-600" />
          <span className="text-blue-800 font-medium">{documentsToVerify.length} documents en attente</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Liste des documents */}
        <div className="space-y-4">
          {documentsToVerify.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{doc.nom}</h3>
                    <p className="text-sm text-gray-600">{doc.declarationId} - {doc.importateur}</p>
                    <p className="text-sm font-medium text-green-600">{doc.valeur}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-600">
                    IA: {Math.round(doc.aiAnalysis.confiance * 100)}%
                  </span>
                </div>
              </div>

              {/* Analyse IA */}
              <div className="space-y-2 mb-4">
                <h4 className="font-medium text-gray-900">Analyse IA:</h4>
                {doc.aiAnalysis.findings.map((finding, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${getFindingColor(finding.type)}`}>
                    <div className="flex items-start space-x-2">
                      {getFindingIcon(finding.type)}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{finding.field}</p>
                        <p className="text-sm">{finding.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Données extraites */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Données Extraites:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(doc.aiAnalysis.extractedData).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="ml-1 text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions de vérification */}
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedDocument(doc.id)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Examiner</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Télécharger</span>
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleVerification(doc.id, 'approved')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      verificationStatus[doc.id] === 'approved'
                        ? 'bg-green-600 text-white'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    Valider
                  </button>
                  <button
                    onClick={() => handleVerification(doc.id, 'requires_physical')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      verificationStatus[doc.id] === 'requires_physical'
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    Contrôle Physique
                  </button>
                  <button
                    onClick={() => handleVerification(doc.id, 'rejected')}
                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                      verificationStatus[doc.id] === 'rejected'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visualiseur de document */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Visualiseur de Document</h3>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Zoom className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <RotateCw className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {selectedDocument ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Document sélectionné: {selectedDocument}</p>
                <p className="text-sm text-gray-500 mt-2">Visualisation du document en cours...</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Sélectionnez un document à examiner</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}