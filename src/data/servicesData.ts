import { ServiceDetail } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'loan-services',
    title: 'Loan Services',
    shortDesc: 'Comprehensive loan guidance and institutional application assistance tailored to your requirements.',
    fullDesc: 'As a trusted loan provider in Gwalior, Arvon Micro Service assists applicants with dependable, end-to-end loan services. We understand your financial requirements, guide you on institutional borrowing criteria, and help prepare your file for smooth processing.',
    imagePath: '/src/assets/images/personal_loan_planning_1790764430815.jpg',
    targetAudience: 'Applicants seeking structured loan assistance in Gwalior',
    keyBenefits: [
      'Requirement analysis and borrowing criteria guidance',
      'Assessment of institutional eligibility standards',
      'Step-by-step assistance with loan file structuring',
      'Dedicated local support throughout the process'
    ],
    requiredDocs: [
      'Identity Proof (Aadhaar Card, PAN Card)',
      'Current & Permanent Address Proof',
      'Recent Bank Account Statements',
      'Proof of Income / Financial Records',
      'Passport size photographs'
    ]
  },
  {
    id: 'documentation-guidance',
    title: 'Loan Documentation Guidance',
    shortDesc: 'Comprehensive file audit to eliminate document errors, mismatches, and avoidable delays.',
    fullDesc: 'Incomplete or mismatched documentation is the most common reason for delayed loan reviews or outright rejections. Our specialized documentation team checks every page—from name spellings on Aadhaar/PAN to bank statement continuity—ensuring your file is complete, compliant, and ready for institutional evaluation.',
    targetAudience: 'Any borrower seeking first-time or repeat loan documentation review',
    keyBenefits: [
      'Pre-submission document discrepancy check',
      'Guidance on correcting PAN-Aadhaar or address variations',
      'Bank statement cash-flow review & highlight points',
      'Organized physical & digital dossier preparation'
    ],
    requiredDocs: [
      'Primary identification & demographic documents',
      'Banking transaction records & existing loan sanction letters',
      'Property or asset documents (where applicable)',
      'Business or employment credentials'
    ]
  },
  {
    id: 'application-process-support',
    title: 'Application Process Support',
    shortDesc: 'End-to-end liaison from initial application submission through to query resolution.',
    fullDesc: 'Applying for a loan can be confusing when bank representatives request multiple clarifications, site verifications, or additional forms. Arvon Micro Service acts as your dependable local facilitator, guiding you through verification calls, branch visits, and timely document submissions.',
    targetAudience: 'Individuals and businesses who want dedicated guidance throughout the application lifecycle',
    keyBenefits: [
      'Step-by-step navigation through banking procedural stages',
      'Prompt response support for underwriting queries',
      'Guidance during physical/field verification visits',
      'Regular status follow-ups until final sanction and disbursement'
    ],
    requiredDocs: [
      'Completed institutional application form',
      'Verified KYC file dossier',
      'Reference contact details & verification availability'
    ]
  }
];

export const GWALIOR_AREAS = [
  'Gol Pahadiya',
  'Lashkar',
  'Morar',
  'City Centre',
  'Thatipur',
  'Phoolbagh',
  'Hazira',
  'Maharaj Bada',
  'Anand Nagar',
  'Padav',
  'Vinay Nagar',
  'Bahodapur',
  'Deen Dayal Nagar',
  'Gwalior Fort Road',
  'Other Area in Gwalior'
];
