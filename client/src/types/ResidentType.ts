// client handling and validation
export interface Resident {
    id: number;
    fullName: string;
    age: string;
    civilStatus: string;
    address: string;
    isRegisteredVoter: boolean;
}

// send to server
export type ResidentRequest = {
  fullName: string;
  age: string;
  civilStatus: string;
  address: string;
  isRegisteredVoter: boolean;
};