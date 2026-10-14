export interface EnquiryData {
  id: string;
  fullName: string;
  mobileNumber: string;
  areaColony: string;
  serviceType: 'Loan Services' | 'Loan Documentation Guidance' | 'Application Process Support' | 'General Enquiry';
  loanAmount?: string;
  message: string;
  createdAt: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  imagePath?: string;
  targetAudience: string;
  keyBenefits: string[];
  requiredDocs: string[];
}
