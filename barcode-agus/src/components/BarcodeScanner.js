// import React, { useState } from 'react';
// import BarcodeScannerComponent from 'react-barcode-reader';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// const productData = [
//   { barcode: '9783981305449', name: 'Wafer', price: 2000, stock: 6 },
//   { barcode: '789456', name: 'Kecap ABC', price: 5000, stock: 3 },
//   { barcode: '654789', name: 'Saos ABC', price: 7000, stock: 5 },
// ];

// function App() {
//   const [scannedData, setScannedData] = useState(null);

//   const handleScan = (data) => {
//     if (data) {
//       const product = productData.find((item) => item.barcode === data);
//       setScannedData(product);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div className="container">
//       <h1>Toko Agus</h1>
//       <div className="row">
//         <div className="col-md-6">
//           <h2>Data product</h2>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Barcode</th>
//                 <th>Nama</th>
//                 <th>Harga</th>
//                 <th>Stok</th>
//               </tr>
//             </thead>
//             <tbody>
//               {productData.map((product) => (
//                 <tr key={product.barcode}>
//                   <td>{product.barcode}</td>
//                   <td>{product.name}</td>
//                   <td>{product.price}</td>
//                   <td>{product.stock}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="col-md-6">
//           <h2>Scan Barcode</h2>
//           <BarcodeScannerComponent
//             width={400}
//             height={300}
//             onUpdate={(err, result) => {
//               if (result) handleScan(result.text);
//               else handleError(err);
//             }}
//           />
//           <button className="btn btn-primary">Start scan</button>
//           <h3>Hasil pencarian:</h3>
//           {scannedData ? (
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Produk</th>
//                   <th>Harga</th>
//                   <th>Stok</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{scannedData.name}</td>
//                   <td>{scannedData.price}</td>
//                   <td>{scannedData.stock}</td>
//                 </tr>
//               </tbody>
//             </table>
//           ) : (
//             <p>Tidak ada data.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useEffect, useRef } from 'react';
// import Quagga from 'quagga';

// const BarcodeScanner = ({ onDetected }) => {
//     const scannerRef = useRef(null);

//     useEffect(() => {
//         console.log("Initializing Quagga...");  // Debugging log

//         Quagga.init({
//             inputStream: {
//                 name: "Live",
//                 type: "LiveStream",
//                 target: scannerRef.current    // This is your HTML element
//             },
//             decoder: {
//                 readers: ["code_128_reader"] // Specify the type of barcode you want to scan
//             }
//         }, function (err) {
//             if (err) {
//                 console.log("Error initializing Quagga: ", err);
//                 return;
//             }
//             console.log("Initialization finished. Ready to start");
//             Quagga.start();
//         });

//         Quagga.onDetected(handleDetected);

//         return () => {
//             Quagga.offDetected(handleDetected);
//             Quagga.stop();
//         };
//     }, []);

//     const handleDetected = (result) => {
//         console.log("Barcode detected: ", result.codeResult.code);  // Debugging log
//         onDetected(result.codeResult.code);
//     };

//     return (
//         <div>
//             <div ref={scannerRef} style={{ width: '100%', height: '400px', border: '1px solid black' }} />
//         </div>
//     );
// };

// export default BarcodeScanner;