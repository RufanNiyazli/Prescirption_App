import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Service/api";
import axios from "axios";

const Receipt = () => {
  const { hashId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/get-prescription?hashId=${hashId}`);
        setPrescription(response.data);
      } catch (err) {
        setError("Prescription not found or invalid link.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [hashId]);

  if (loading) {
    return (
      <div className="receipt-loading">
        <p>🔍 Loading prescription...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="receipt-error">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="receipt-container">
      <h1>🧾 Prescription Receipt</h1>
      <p>
        <strong>Prescription Hash ID:</strong> {prescription.hashId}
      </p>
      <p>
        <strong>User ID:</strong> {prescription.userId}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(prescription.createdAt).toLocaleString()}
      </p>
      <p>
        <strong>Notes:</strong> {prescription.notes}
      </p>

      <h3>Medicines:</h3>
      <ul>
        {prescription.medicines.map((med) => (
          <li key={med.id}>
            <strong>{med.name}</strong> ({med.category} - {med.dosageForm})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Receipt;
