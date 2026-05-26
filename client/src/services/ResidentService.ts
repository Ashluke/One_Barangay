import axios from "axios";
import type { Resident, ResidentRequest } from "../types/ResidentType";

const BASE_URL = "http://localhost:8080/api/residents";

// Normalizes whatever the backend sends into a real boolean
const normalize = (r: any): Resident => ({
  ...r,
  isRegisteredVoter: r.registeredVoter === true
    || r.registeredVoter === 1
    || r.registeredVoter === "true"
});

export const getResidents = async (): Promise<Resident[]> => {
  const res = await axios.get(BASE_URL);
  return res.data.map(normalize);
};

export const createResident = async (data: ResidentRequest) => {
  return axios.post(BASE_URL, {
    ...data,
    registeredVoter: Boolean(data.isRegisteredVoter),
    isRegisteredVoter: undefined
  });
};

// ResidentService.ts - in updateResident
export const updateResident = (id: number, data: ResidentRequest) => {
  const body = {
    ...data,
    registeredVoter: Boolean(data.isRegisteredVoter),
    isRegisteredVoter: undefined
  };
  return axios.put(`${BASE_URL}/${id}`, body);
};

export const deleteResident = (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};