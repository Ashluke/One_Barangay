export interface Resident {
    id: number;
    fullName: string;
    age: string;
    civilStatus: string;
    address: string;
    isRegisteredVoter: boolean;
}

export type ResidentRequest = {
  fullName: string;
  age: string;
  civilStatus: string;
  address: string;
  isRegisteredVoter: boolean;
};