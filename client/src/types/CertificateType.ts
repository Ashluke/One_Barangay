// client handling and validation
export interface CertificateForm {
  fullName: string;
  age: string;
  civilStatus: string;
  income: string;
}

// send to server
export interface CertificateRequest {
  fullName: string;
  age: number;
  civilStatus: string;
  income: number;
}