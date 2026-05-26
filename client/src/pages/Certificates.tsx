import { useState } from "react";
import Layout from "../components/Layout";
import "../styles/certificates.css";

import { generateIndigency } from "../services/CertificateService";
import { downloadFile } from "../utils/DownloadFile";
import type {
  CertificateForm,
  CertificateRequest
} from "../types/CertificateType";

function Certificates() {
  // UI STATE (STRING ONLY)
  const [form, setForm] = useState<CertificateForm>({
    fullName: "",
    age: "",
    civilStatus: "",
    income: ""
  });

  const [loading, setLoading] = useState(false);

  // INPUT HANDLER
  const handleChange = (
    field: keyof CertificateForm,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // VALIDATION
  const isValidInteger = (value: string) => /^\d+$/.test(value);

  // GENERATE CERTIFICATE
  const generate = async () => {

  // VALIDATION FIRST, BEFORE LOADING
  if (!form.fullName || !form.age || !form.civilStatus || !form.income) {
    alert("All fields are required");
    return;
  }

  if (!isValidInteger(form.age) || !isValidInteger(form.income)) {
    alert("Age and Income must be whole numbers");
    return;
  }

  // ONLY SET LOADING AFTER VALIDATION PASSES
  setLoading(true);

  try {
    const payload: CertificateRequest = {
      fullName: form.fullName,
      age: Number(form.age),
      civilStatus: form.civilStatus,
      income: Number(form.income)
    };

    const blob = await generateIndigency(payload);
    downloadFile(blob, "Barangay_Indigency.docx");

  } catch (err) {
    console.error(err);
    alert("Failed to generate certificate");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <div className="certPage">

        <div className="formBox">
          <h2>Barangay Indigency</h2>

          <input
            placeholder="Full Name"
            value={form.fullName}
            onChange={(e) =>
              handleChange("fullName", e.target.value)
            }
          />

          <input
            placeholder="Age (e.g 18)"
            value={form.age}
            onChange={(e) =>
              handleChange("age", e.target.value)
            }
          />

          <select
            value={form.civilStatus}
            onChange={(e) =>
              handleChange("civilStatus", e.target.value)
            }
          >
            <option value="">Select Civil Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Other">Other</option>
          </select>

          <input
            placeholder="Income (e.g 100000)"
            value={form.income}
            onChange={(e) =>
              handleChange("income", e.target.value)
            }
          />

          <button onClick={generate} disabled={loading}>
            {loading ? "Generating..." : "Generate Certificate"}
          </button>

        </div>

      </div>
    </Layout>
  );
}

export default Certificates;