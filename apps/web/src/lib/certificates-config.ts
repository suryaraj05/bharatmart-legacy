export interface DocumentSubItem {
  id: string
  label: string
  filePrefix: string
  pageCount: number
}

export interface CertificateDoc {
  id: string
  title: string
  subtitle: string
  legalReference: string
  routePath: string
  aliasPaths?: string[]
  envPinKey: string
  defaultPin: string
  pageCount: number
  hasSubItems?: boolean
  subItems?: DocumentSubItem[]
  badge: string
}

export type CertificateDocKey =
  | 'company-registration-certificate'
  | 'share-certificate'
  | 'confirmation-statement'
  | 'account-statement-1'
  | 'account-statement-2'
  | 'accounts-certificate'
  | 'account-statements'
  | 'financial-statements'

export const REGISTRATION_DOC: CertificateDoc = {
  id: 'company-registration-certificate',
  title: 'Registration/ Incorporation Certificate',
  subtitle: 'Certificate of Incorporation of a Private Limited Company',
  legalReference: 'Companies House • Company Number: 16582568',
  routePath: '/company-registration-certificate',
  aliasPaths: ['/registration-incorporation-certificate', '/incorporation-certificate'],
  envPinKey: 'CERT_PIN_REGISTRATION',
  defaultPin: '84920173',
  pageCount: 1,
  badge: 'Statutory Incorporation',
}

export const SHARE_DOC: CertificateDoc = {
  id: 'share-certificate',
  title: 'Share Certificate',
  subtitle: 'Registered Share Certificates of BharatMart (UK) Limited',
  legalReference: 'Companies Act 2006 • Registered Share Holdings',
  routePath: '/share-certificate',
  envPinKey: 'CERT_PIN_SHARE',
  defaultPin: '71639428',
  pageCount: 1,
  hasSubItems: true,
  subItems: [
    {
      id: 'cert-1',
      label: 'Share Certificate (15/07/2025)',
      filePrefix: 'sub_1_page',
      pageCount: 1,
    },
    {
      id: 'cert-2',
      label: 'Share Certificate 01 (25/07/2026)',
      filePrefix: 'sub_2_page',
      pageCount: 1,
    },
    {
      id: 'cert-3',
      label: 'Share Certificate 02 (25/07/2026)',
      filePrefix: 'sub_3_page',
      pageCount: 1,
    },
  ],
  badge: 'Capital & Equity',
}

export const CONFIRMATION_DOC: CertificateDoc = {
  id: 'confirmation-statement',
  title: 'Confirmation Statement',
  subtitle: 'Companies House CS01(ef) Confirmation Statement',
  legalReference: 'Companies House • Ref: XF6D4PS8 • Company No: 16582568',
  routePath: '/confirmation-statement',
  envPinKey: 'CERT_PIN_CONFIRMATION',
  defaultPin: '52840916',
  pageCount: 3,
  badge: 'Statutory Return (CS01)',
}

export const STATEMENT_1_DOC: CertificateDoc = {
  id: 'account-statement-1',
  title: 'Account Statement 1',
  subtitle: 'Bank Account Statement (01/08/2026 – 31/10/2026)',
  legalReference: 'Companies Act 2006 • Bharat Mart Ltd • 6 Pages',
  routePath: '/account-statement-1',
  aliasPaths: ['/statement-1', '/statement1'],
  envPinKey: 'CERT_PIN_ACCOUNTS',
  defaultPin: '39051874',
  pageCount: 6,
  badge: 'Statement 1 (Aug–Oct 2026)',
}

export const STATEMENT_2_DOC: CertificateDoc = {
  id: 'account-statement-2',
  title: 'Account Statement 2',
  subtitle: 'Bank Account Statement (15/07/2025 – 31/07/2026)',
  legalReference: 'Companies Act 2006 • Bharat Mart Ltd • 6 Pages',
  routePath: '/account-statement-2',
  aliasPaths: ['/statement-2', '/statement2'],
  envPinKey: 'CERT_PIN_ACCOUNTS',
  defaultPin: '39051874',
  pageCount: 6,
  badge: 'Statement 2 (2025–2026)',
}

export const ACCOUNTS_DOC: CertificateDoc = {
  id: 'account-statements',
  title: 'Account Statements',
  subtitle: 'Management Accounts & Unaudited Financial Statements',
  legalReference: 'Companies Act 2006 • Bharat Mart Ltd (Company No: 16582568)',
  routePath: '/account-statements',
  aliasPaths: [
    '/accounts-certificate',
    '/financial-statements',
    '/company-accounts',
  ],
  envPinKey: 'CERT_PIN_ACCOUNTS',
  defaultPin: '39051874',
  pageCount: 6,
  badge: 'Financial Statements',
}

export const CERTIFICATE_DOCUMENTS: Record<CertificateDocKey, CertificateDoc> = {
  'company-registration-certificate': REGISTRATION_DOC,
  'share-certificate': SHARE_DOC,
  'confirmation-statement': CONFIRMATION_DOC,
  'account-statement-1': STATEMENT_1_DOC,
  'account-statement-2': STATEMENT_2_DOC,
  'account-statements': ACCOUNTS_DOC,
  'accounts-certificate': ACCOUNTS_DOC,
  'financial-statements': ACCOUNTS_DOC,
}

export const ALL_CERTIFICATE_DOCS: CertificateDoc[] = [
  REGISTRATION_DOC,
  SHARE_DOC,
  CONFIRMATION_DOC,
  STATEMENT_1_DOC,
  STATEMENT_2_DOC,
  ACCOUNTS_DOC,
]

export function getCertificateDoc(idOrAlias: string): CertificateDoc | undefined {
  if (idOrAlias in CERTIFICATE_DOCUMENTS) {
    return CERTIFICATE_DOCUMENTS[idOrAlias as CertificateDocKey]
  }
  for (const doc of ALL_CERTIFICATE_DOCS) {
    if (
      doc.id === idOrAlias ||
      doc.aliasPaths?.includes(idOrAlias) ||
      doc.aliasPaths?.includes('/' + idOrAlias)
    ) {
      return doc
    }
  }
  return undefined
}

export function getExpectedPin(doc: CertificateDoc): string {
  const customPin = process.env[doc.envPinKey]
  if (customPin && /^\d{8}$/.test(customPin.trim())) {
    return customPin.trim()
  }
  return doc.defaultPin
}
