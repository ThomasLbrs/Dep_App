import React from "react";

const DataFrameViewer = ({ data }) => {
  return (
    <div>
      <h2>DataFrame</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Affichage JSON brut */}
    </div>
  );
};

export default DataFrameViewer;
