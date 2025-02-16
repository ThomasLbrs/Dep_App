import React, { useState, useEffect } from "react";
import axios from "axios";
import DataFrameViewer from "./components/DataFrameViewer";  // Composant d'affichage JSON

const API_URL = "http://localhost:8000";  // DOIT être "backend" pour Docker



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/Accueil/Affichage_df`);
      console.log("✅ Données reçues :", response.data); // Vérifie si les données arrivent bien dans React
      setData(response.data);
    } catch (error) {
      console.error("❌ Erreur lors de la récupération :", error);
    }
  };
  

  const addRow = async () => {
    try {
      await axios.post(`${API_URL}/Accueil/Ajout_row/`);
      fetchData();
    } catch (error) {
      console.error("❌ Erreur lors de l'ajout :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>DataFrame JSON</h1>
      <button onClick={addRow} style={{ padding: "10px", marginBottom: "10px" }}>
        Ajouter une ligne
      </button>
      {loading ? <p>Chargement...</p> : <DataFrameViewer data={data} />}
    </div>
  );
}

export default App;
