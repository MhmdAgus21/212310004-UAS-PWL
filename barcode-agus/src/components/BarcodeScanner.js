import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-barcode-reader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const productData = [
  { barcode: '9783981305449', name: 'Wafer', price: 2000, stock: 6 },
  { barcode: '789456', name: 'Kecap ABC', price: 5000, stock: 3 },
  { barcode: '654789', name: 'Saos ABC', price: 7000, stock: 5 },
];

function App() {
  const [scannedData, setScannedData] = useState(null);

  const handleScan = (data) => {
    if (data) {
      const product = productData.find((item) => item.barcode === data);
      setScannedData(product);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="container">
      <h1>Toko Agus</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Data product</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Barcode</th>
                <th>Nama</th>
                <th>Harga</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product) => (
                <tr key={product.barcode}>
                  <td>{product.barcode}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <h2>Scan Barcode</h2>
          <BarcodeScannerComponent
            width={400}
            height={300}
            onUpdate={(err, result) => {
              if (result) handleScan(result.text);
              else handleError(err);
            }}
          />
          <button className="btn btn-primary">Start scan</button>
          <h3>Hasil pencarian:</h3>
          {scannedData ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Stok</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{scannedData.name}</td>
                  <td>{scannedData.price}</td>
                  <td>{scannedData.stock}</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Tidak ada data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
