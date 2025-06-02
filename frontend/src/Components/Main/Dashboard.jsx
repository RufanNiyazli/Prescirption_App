import React, { useState } from "react";
import "../../css/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchMedicine,
  selectMedicine,
  removeMedicine,
  clearMedicine,
} from "../../Redux/medicineSlice";

const Dashboard = () => {
  const [keyword, setKeyWord] = useState("");
  const dispatch = useDispatch();

  const { searchResults, selectedMedicines, loading } = useSelector(
    (state) => state.medicine
  );

  useEffect(() => {
    if (keyword.trim() !== "") {
      const delay = setTimeout(() => {
        dispatch(fetchMedicine(keyword));
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [keyword, dispatch]);

  const handleSelect = (medicine) => {
    dispatch(selectMedicine(medicine));
  };

  const handleRemove = (id) => {
    dispatch(removeMedicine(id));
  };

  const clearAll = () => {
    dispatch(clearMedicine());
  };

  return (
    <div className="main">
      <div className="header">
        <h1 className="greeting">Welcome to MediSearch</h1>
        <p className="subtitle">Search and select medicines easily</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <svg
              className="search-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyWord(e.target.value)}
              placeholder="Search for medicines..."
              className="search-input"
            />
          </div>

          {keyword && (
            <div className="search-results">
              {loading ? (
                <div className="loading-container">
                  <div className="spinner"></div>
                  <span className="loading-text">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="results-container">
                  <h3 className="results-title">
                    Search Results ({searchResults.length})
                  </h3>
                  {searchResults.map((medicine) => (
                    <div key={medicine.id} className="medicine-item">
                      <div className="medicine-info">
                        <h4 className="medicine-name">{medicine.name}</h4>
                        {medicine.description && (
                          <p className="medicine-description">
                            {medicine.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleSelect(medicine)}
                        disabled={selectedMedicines.find(
                          (m) => m.id === medicine.id
                        )}
                        className={`select-btn ${
                          selectedMedicines.find((m) => m.id === medicine.id)
                            ? "selected"
                            : ""
                        }`}
                      >
                        {selectedMedicines.find((m) => m.id === medicine.id)
                          ? "Selected"
                          : "Select"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                keyword &&
                !loading && (
                  <div className="no-results">
                    <svg
                      className="no-results-icon"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.463-.64-6.327-1.76C3.688 12.78 3 11.427 3 10c0-4.418 3.582-8 8-8s8 3.582 8 8c0 1.427-.688 2.78-2.673 3.24A7.96 7.96 0 0112 15z"
                      />
                    </svg>
                    <p>No medicines found for "{keyword}"</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      <div className="selected-section">
        <div className="selected-header">
          <h3 className="selected-title">
            Selected Medicines ({selectedMedicines.length})
          </h3>
          {selectedMedicines.length > 0 && (
            <button onClick={clearAll} className="clear-all-btn">
              Clear All
            </button>
          )}
        </div>

        {selectedMedicines.length > 0 ? (
          <div className="selected-medicines">
            {selectedMedicines.map((medicine) => (
              <div key={medicine.id} className="selected-medicine-item">
                <div className="selected-medicine-info">
                  <h4 className="selected-medicine-name">{medicine.name}</h4>
                  {medicine.description && (
                    <p className="selected-medicine-description">
                      {medicine.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleRemove(medicine.id)}
                  className="remove-btn"
                  title="Remove medicine"
                >
                  <svg
                    className="remove-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 00-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <p className="empty-state-title">No medicines selected yet</p>
            <p className="empty-state-subtitle">
              Search and select medicines to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
