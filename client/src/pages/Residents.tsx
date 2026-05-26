import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Modal from "../components/Modal";
import { useModal } from "../utils/Modal";

import "../styles/residents.css";

import type { Resident, ResidentRequest } from "../types/ResidentType";
import {
  getResidents,
  createResident,
  updateResident,
  deleteResident
} from "../services/ResidentService";

function Residents() {

  const emptyForm: ResidentRequest = {
    fullName: "",
    age: "",
    civilStatus: "",
    address: "",
    isRegisteredVoter: false
  };

  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, open, close } = useModal();

  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [form, setForm] = useState<ResidentRequest>(emptyForm);

  // =========================
  // LOAD
  // =========================
  const loadResidents = async () => {
    setLoading(true);
    const data = await getResidents();
    setResidents(data);
    setLoading(false);
  };

  useEffect(() => {
    loadResidents();
  }, []);

  // =========================
  // OPEN ADD
  // =========================
  const openAdd = () => {
    setForm(emptyForm);
    setIsEdit(false);
    setEditId(null);
    open();
  };

  // =========================
  // OPEN EDIT
  // =========================
  const openEdit = (r: Resident) => {
    setForm({
      fullName: r.fullName,
      age: String(r.age),
      civilStatus: r.civilStatus,
      address: r.address,
      isRegisteredVoter: r.isRegisteredVoter === true
    });

    setEditId(r.id);
    setIsEdit(true);
    open();
  };

  // =========================
  // HANDLERS (FIXED PROPERLY)
  // =========================

  const handleTextChange = (
    field: keyof Omit<ResidentRequest, "isRegisteredVoter">,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVoterChange = (value: boolean) => {
    setForm(prev => ({
      ...prev,
      isRegisteredVoter: value
    }));
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: number) => {
    if (!confirm("Delete this resident?")) return;

    try {
      await deleteResident(id);
      close();
      loadResidents();
    } catch (err) {
      console.error(err);
      alert("Failed to delete resident");
    }
  };

  // =========================
  // VALIDATION
  // =========================
  const isValidInteger = (value: string) => /^\d+$/.test(value);

  // =========================
  // SAVE
  // =========================
  const handleSave = async () => {

    if (
      !form.fullName ||
      !form.age ||
      !form.civilStatus ||
      !form.address
    ) {
      alert("All fields are required");
      return;
    }

    if (!isValidInteger(form.age)) {
      alert("Age must be a valid number");
      return;
    }

    const payload: ResidentRequest = {
      fullName: form.fullName,
      age: form.age,
      civilStatus: form.civilStatus,
      address: form.address,
      isRegisteredVoter: form.isRegisteredVoter
    };

    try {
      if (isEdit && editId !== null) {
        await updateResident(editId, payload);
      } else {
        await createResident(payload);
      }

      close();
      loadResidents();

    } catch (err) {
      console.error(err);
      alert("Failed to save resident");
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <Layout>
      <div className="residents">

        <div className="header">
          <h2>Residents</h2>
          <button onClick={openAdd}>Add Resident</button>
        </div>

        {loading && <p>Loading...</p>}

        <table className="residentsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Civil Status</th>
              <th>Address</th>
              <th>Voter</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {residents.map(r => (
              <tr key={r.id}>
                <td>{r.fullName}</td>
                <td>{r.age}</td>
                <td>{r.civilStatus}</td>
                <td>{r.address}</td>
                <td>{r.isRegisteredVoter ? "Yes" : "No"}</td>
                <td>
                  <button onClick={() => openEdit(r)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* MODAL */}
        <Modal
          isOpen={isOpen}
          onClose={close}
          title={isEdit ? "Edit Resident" : "Add Resident"}
        >

          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              handleTextChange("fullName", e.target.value)
            }
          />

          <input
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              handleTextChange("age", e.target.value)
            }
          />

          <select
            value={form.civilStatus}
            onChange={(e) =>
              handleTextChange("civilStatus", e.target.value)
            }
          >
            <option value="">Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>

          <input
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              handleTextChange("address", e.target.value)
            }
          />

          {/* FIXED BOOLEAN SELECT */}
          <select
            value={form.isRegisteredVoter ? "true" : "false"}
            onChange={(e) =>
              handleVoterChange(e.target.value === "true")
            }
          >
            <option value="false">Not Voter</option>
            <option value="true">Voter</option>
          </select>

          <button onClick={handleSave}>
            {isEdit ? "Update" : "Save"}
          </button>

          {isEdit && editId !== null && (
            <button
              onClick={() => handleDelete(editId)}
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                color: "white"
              }}
            >
              Delete Resident
            </button>
          )}

        </Modal>

      </div>
    </Layout>
  );
}

export default Residents;