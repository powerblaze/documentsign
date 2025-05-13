// Core application types
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  image?: string;
}

export interface Document {
  id: string;
  title: string;
  filename: string;
  contentType: string;
  size: number;
  uploadedBy: string;
  createdAt: Date;
  status: DocumentStatus;
  signers: Signer[];
}

export enum DocumentStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  COMPLETED = 'completed',
  DECLINED = 'declined',
  EXPIRED = 'expired',
}

export interface Signer {
  id: string;
  email: string;
  name?: string;
  status: SignatureStatus;
  role?: string;
  order?: number;
  signedAt?: Date;
  expiresAt?: Date;
}

export enum SignatureStatus {
  PENDING = 'pending',
  SIGNED = 'signed',
  DECLINED = 'declined',
}

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  fromEmail: string;
  fromName: string;
}

export enum NotificationType {
  REQUEST_SIGNATURE = 'request_signature',
  DOCUMENT_SIGNED = 'document_signed',
  DOCUMENT_COMPLETED = 'document_completed',
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  documentId?: string;
}

// Mock data functions for development
export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Employment Contract',
    filename: 'employment_contract.pdf',
    contentType: 'application/pdf',
    size: 245000,
    uploadedBy: 'user1',
    createdAt: new Date('2023-04-15'),
    status: DocumentStatus.PENDING,
    signers: [
      {
        id: 's1',
        email: 'john@example.com',
        name: 'John Doe',
        status: SignatureStatus.SIGNED,
        signedAt: new Date('2023-04-16'),
      },
      {
        id: 's2',
        email: 'jane@example.com',
        name: 'Jane Smith',
        status: SignatureStatus.PENDING,
      },
    ],
  },
  {
    id: '2',
    title: 'Non-Disclosure Agreement',
    filename: 'nda_2023.pdf',
    contentType: 'application/pdf',
    size: 124000,
    uploadedBy: 'user1',
    createdAt: new Date('2023-04-10'),
    status: DocumentStatus.COMPLETED,
    signers: [
      {
        id: 's3',
        email: 'partner@example.com',
        name: 'Partner Corp',
        status: SignatureStatus.SIGNED,
        signedAt: new Date('2023-04-12'),
      },
    ],
  },
  {
    id: '3',
    title: 'Consulting Agreement',
    filename: 'consulting_2023.pdf',
    contentType: 'application/pdf',
    size: 310000,
    uploadedBy: 'user1',
    createdAt: new Date('2023-04-18'),
    status: DocumentStatus.DRAFT,
    signers: [],
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    userId: 'user1',
    type: NotificationType.REQUEST_SIGNATURE,
    title: 'Signature requested',
    message: 'John Doe has requested your signature on "Partnership Agreement"',
    isRead: false,
    createdAt: new Date('2023-04-20'),
    documentId: '4',
  },
  {
    id: 'n2',
    userId: 'user1',
    type: NotificationType.DOCUMENT_SIGNED,
    title: 'Document signed',
    message: 'Jane Smith has signed "Employment Contract"',
    isRead: true,
    createdAt: new Date('2023-04-16'),
    documentId: '1',
  },
];