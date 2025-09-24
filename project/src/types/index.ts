export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
}

export interface Declaration {
  id: string;
  numero: string;
  status: 'draft' | 'processing' | 'submitted' | 'approved' | 'rejected';
  regime: string;
  importateur: string;
  paysOrigine: string;
  valeurTotale: number;
  economiesZLECAF: number;
  dateCreation: string;
  dateModification: string;
  articles: Article[];
  documents: Document[];
}

export interface Article {
  numero: number;
  codeSH: string;
  designation: string;
  origine: string;
  quantite: number;
  unite: string;
  valeurUnitaire: number;
  valeurTotale: number;
  tauxDroit: number;
  montantDroit: number;
  regimePreferentiel?: string;
}

export interface Document {
  id: string;
  nom: string;
  type: 'facture' | 'connaissement' | 'certificat' | 'liste_colisage';
  statut: 'pending' | 'processing' | 'analyzed' | 'validated' | 'error';
  confiance: number;
  donneesExtraites?: any;
  alertes: string[];
}

export interface ZLECAFAnalysis {
  eligible: boolean;
  economiesMontant: number;
  economiePourcentage: number;
  tarifNormal: number;
  tarifZLECAF: number;
  exigences: {
    certificatOrigine: boolean;
    contenuRegional: boolean;
    transformation: boolean;
  };
}

export interface DashboardStats {
  declarationsEnCours: number;
  alertesZLECAF: number;
  documentsEnAttente: number;
  economiesMois: number;
}

export interface CustomsOfficer {
  id: string;
  name: string;
  badge: string;
  department: string;
  level: 'inspector' | 'supervisor' | 'chief';
}

export interface DocumentVerification {
  id: string;
  documentId: string;
  officerId: string;
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'requires_physical';
  verificationDate: string;
  findings: VerificationFinding[];
  riskScore: number;
  recommendedAction: 'approve' | 'physical_exam' | 'reject' | 'additional_docs';
  notes: string;
}

export interface VerificationFinding {
  type: 'discrepancy' | 'missing_info' | 'suspicious' | 'compliant' | 'warning';
  field: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  autoDetected: boolean;
}

export interface CustomsControl {
  id: string;
  declarationId: string;
  controlType: 'documentary' | 'physical' | 'scanner' | 'laboratory';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  assignedOfficer: string;
  scheduledDate: string;
  completedDate?: string;
  findings: ControlFinding[];
  decision: 'release' | 'hold' | 'seize' | 'penalty';
  penaltyAmount?: number;
}

export interface ControlFinding {
  category: 'valuation' | 'classification' | 'origin' | 'quantity' | 'quality' | 'documentation';
  description: string;
  evidence: string[];
  impact: 'none' | 'minor' | 'major' | 'critical';
}

export interface RiskAssessment {
  declarationId: string;
  overallRisk: 'low' | 'medium' | 'high' | 'critical';
  riskFactors: {
    importerHistory: number;
    productRisk: number;
    originCountry: number;
    valueConsistency: number;
    documentAuthenticity: number;
  };
  recommendedControls: string[];
  aiConfidence: number;
}