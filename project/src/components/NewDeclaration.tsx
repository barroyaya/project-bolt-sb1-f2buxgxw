import React, { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, DollarSign, FileText, Globe } from 'lucide-react';
import type { Declaration, Document, ZLECAFAnalysis } from '../types';

interface NewDeclarationProps {
  onBack: () => void;
  onSubmit: (declaration: Declaration) => void;
}

export default function NewDeclaration({ onBack, onSubmit }: NewDeclarationProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    importateur: 'OLAM CÔTE D\'IVOIRE',
    adresse: 'Abidjan, Zone Industrielle Vridi',
    regime: 'IM4',
    portDebarquement: 'Port d\'Abidjan',
    paysOrigine: 'Ghana',
    devise: 'USD'
  });

  const [documents, setDocuments] = useState<Document[]>([]);
  const [zlecafAnalysis, setZlecafAnalysis] = useState<ZLECAFAnalysis | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => {
        // Simulation du traitement IA
        setTimeout(() => {
          const newDoc: Document = {
            id: `doc_${Date.now()}_${index}`,
            nom: file.name,
            type: file.name.toLowerCase().includes('facture') ? 'facture' : 
                  file.name.toLowerCase().includes('connaissement') ? 'connaissement' :
                  file.name.toLowerCase().includes('certificat') ? 'certificat' : 'liste_colisage',
            statut: 'analyzed',
            confiance: 0.95 + Math.random() * 0.05,
            donneesExtraites: {
              montantTotal: '2,500,000 USD',
              vendeur: 'GHANA COCOA BOARD',
              acheteur: 'OLAM CÔTE D\'IVOIRE',
              produit: 'Fèves de cacao',
              quantite: '500 tonnes',
              codeHS: '1801.00.00'
            },
            alertes: []
          };
          setDocuments(prev => [...prev, newDoc]);
        }, 1000 + index * 500);
      });
    }
  };

  const analyzeZLECAF = () => {
    // Simulation de l'analyse ZLECAF
    setTimeout(() => {
      setZlecafAnalysis({
        eligible: true,
        economiesMontant: 500000,
        economiePourcentage: 20,
        tarifNormal: 20,
        tarifZLECAF: 0,
        exigences: {
          certificatOrigine: true,
          contenuRegional: true,
          transformation: true
        }
      });
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-900">IA SUGGEST: Éligibilité ZLECAF détectée !</span>
        </div>
        <p className="text-blue-700 mt-1">Économies estimées : 45,670 USD</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Importateur
          </label>
          <input
            type="text"
            value={formData.importateur}
            onChange={(e) => setFormData({...formData, importateur: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Régime Douanier
          </label>
          <select
            value={formData.regime}
            onChange={(e) => setFormData({...formData, regime: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="IM4">IM4 - Importation définitive</option>
            <option value="IM7">IM7 - Importation temporaire</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Port de Débarquement
          </label>
          <input
            type="text"
            value={formData.portDebarquement}
            onChange={(e) => setFormData({...formData, portDebarquement: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pays d'Origine
          </label>
          <select
            value={formData.paysOrigine}
            onChange={(e) => setFormData({...formData, paysOrigine: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Ghana">Ghana 🔍 Détection auto ZLECAF</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Burkina Faso">Burkina Faso</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setStep(2)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Continuer
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="mt-2 block text-sm font-medium text-gray-900">
              Glissez vos documents ici ou cliquez pour sélectionner
            </span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileUpload}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          PDF, JPG, PNG jusqu'à 10MB
        </p>
      </div>

      {documents.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Documents Analysés</h3>
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.nom}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">
                        Analysé ({Math.round(doc.confiance * 100)}% confiance)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {doc.donneesExtraites && (
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Montant:</span> {doc.donneesExtraites.montantTotal}
                  </div>
                  <div>
                    <span className="font-medium">Produit:</span> {doc.donneesExtraites.produit}
                  </div>
                  <div>
                    <span className="font-medium">Code HS:</span> {doc.donneesExtraites.codeHS}
                  </div>
                  <div>
                    <span className="font-medium">Quantité:</span> {doc.donneesExtraites.quantite}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
        >
          Retour
        </button>
        <button
          onClick={() => {
            analyzeZLECAF();
            setStep(3);
          }}
          disabled={documents.length === 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50"
        >
          Analyser ZLECAF
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {!zlecafAnalysis ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyse ZLECAF en cours...</p>
        </div>
      ) : (
        <>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">ÉLIGIBILITÉ CONFIRMÉE !</h3>
            </div>
            
            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span>Valeur marchandise :</span>
                <span className="font-medium">2,500,000 USD</span>
              </div>
              <div className="flex justify-between">
                <span>Tarif douanier normal :</span>
                <span className="font-medium">{zlecafAnalysis.tarifNormal}%</span>
              </div>
              <div className="flex justify-between">
                <span>Tarif ZLECAF :</span>
                <span className="font-medium text-green-600">{zlecafAnalysis.tarifZLECAF}% ✅</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>💰 ÉCONOMIES TOTALES :</span>
                <span className="text-green-600">{zlecafAnalysis.economiesMontant.toLocaleString()} USD !!!</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Certificat d'origine Ghana valide</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Contenu régional 100% qualifié</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Toutes les exigences ZLECAF respectées</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-md transition-colors"
            >
              Retour
            </button>
            <button
              onClick={() => {
                const declaration: Declaration = {
                  id: `DI${Date.now()}`,
                  numero: `DI2025001247`,
                  status: 'submitted',
                  regime: formData.regime,
                  importateur: formData.importateur,
                  paysOrigine: formData.paysOrigine,
                  valeurTotale: 2500000,
                  economiesZLECAF: zlecafAnalysis.economiesMontant,
                  dateCreation: new Date().toISOString(),
                  dateModification: new Date().toISOString(),
                  articles: [],
                  documents: documents
                };
                onSubmit(declaration);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Soumettre aux Douanes
            </button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour au tableau de bord</span>
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900">Nouvelle Déclaration</h1>
        
        {/* Progress Steps */}
        <div className="mt-6">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Informations générales</span>
            <span>Documents</span>
            <span>Optimisation ZLECAF</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
}