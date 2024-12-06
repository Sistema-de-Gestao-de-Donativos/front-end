import React, { useState } from "react";
import QrReader from "react-qr-barcode-scanner";

const BarcodeScanner = ({ onBarcodeDetected }) => {
  const [scannedData, setScannedData] = useState("");

  const handleScan = (err, result) => {
    if (result) {
      const barcode = result.text;
      setScannedData(barcode);
      if (onBarcodeDetected) {
        onBarcodeDetected(barcode);
      }
    }
    if (err) {
      console.error("Scan error:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h3>Scan a Barcode</h3>
      <QrReader
        onUpdate={handleScan}
        style={{ width: "300px", margin: "0 auto" }}
      />
      <p>
        <strong>Scanned Data:</strong> {scannedData || "Waiting for scan..."}
      </p>
    </div>
  );
};

export default BarcodeScanner;
