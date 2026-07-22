export interface ClaimsDeclarationFormData {
  insuredName: string;
  incidentDate: string;
  incidentPlace: string;
  vehiclePlate: string;
  policyNumber: string;
  coverageStart: string;
  coverageEnd: string;
  adverseName: string;
  adversePlate: string;
  adverseInsurer: string;
  circumstances: string;
  damageInsuredVehicle: string;
  damageAdverseVehicle: string;
  injuredCount: string;
  deceasedCount: string;
  photos: File[];
  insuranceCertificate: File | null;
}

export const EMPTY_CLAIMS_FORM: ClaimsDeclarationFormData = {
  insuredName: "",
  incidentDate: "",
  incidentPlace: "",
  vehiclePlate: "",
  policyNumber: "",
  coverageStart: "",
  coverageEnd: "",
  adverseName: "",
  adversePlate: "",
  adverseInsurer: "",
  circumstances: "",
  damageInsuredVehicle: "",
  damageAdverseVehicle: "",
  injuredCount: "0",
  deceasedCount: "0",
  photos: [],
  insuranceCertificate: null,
};
