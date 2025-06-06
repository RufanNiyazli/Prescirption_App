import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../Service/api";
import axios from "axios";
import "../../css/Receipt.css";

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

  const parseNotes = (notes) => {
    if (!notes) return [];
    return notes.split('|').map(note => note.trim()).filter(note => note.length > 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="receipt-loading">
        <div className="loading-spinner"></div>
        <p className="loading-text">🔍 Loading prescription...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="receipt-error">
        <div className="error-icon">❌</div>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  const notesArray = parseNotes(prescription.notes);

  return (
    <div className="receipt-container">
      <div className="receipt-header">
        <h1 className="receipt-title">Medical Prescription</h1>
        <p className="receipt-subtitle">Electronic Prescription System</p>
      </div>

      <div className="receipt-content">
        <div className="prescription-meta">
          <div className="meta-grid">
            <div className="meta-item">
              <div className="meta-label">Prescription ID</div>
              <div className="meta-value hash-id">{prescription.hashId}</div>
            </div>
            
            <div className="meta-item">
              <div className="meta-label">User ID</div>
              <div className="meta-value">{prescription.userId}</div>
            </div>
            
            <div className="meta-item">
              <div className="meta-label">Created Date</div>
              <div className="meta-value">{formatDate(prescription.createdAt)}</div>
            </div>
          </div>
        </div>

        <div className="medicines-section">
          <div className="section-header">
            <div className="section-icon">💊</div>
            <h2 className="section-title">Prescribed Medicines</h2>
            <div className="medicines-count">
              {prescription.medicines.length} items
            </div>
          </div>

          <ul className="medicines-grid">
            {prescription.medicines.map((med, index) => (
              <li key={med.id} className="medicine-card">
                <div className="medicine-header">
                  <h3 className="medicine-name">{med.name}</h3>
                  <div className="medicine-badges">
                    <span className="badge badge-category">
                      🏷️ {med.category}
                    </span>
                    <span className="badge badge-dosage">
                      📏 {med.dosageForm}
                    </span>
                  </div>
                </div>

                {notesArray[index] && (
                  <div className="medicine-instructions">
                    <div className="instructions-header">
                      <div className="instructions-icon">📋</div>
                      <h4 className="instructions-title">Usage Instructions</h4>
                    </div>
                    <ul className="instructions-list">
                      {notesArray[index].split(',').map((instruction, idx) => (
                        <li key={idx} className="instruction-item">
                          <div className="instruction-bullet"></div>
                          <div className="instruction-text">{instruction.trim()}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
