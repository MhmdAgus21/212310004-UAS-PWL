
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
            <Header />
            {/* <h1>Toko Agus 1</h1> */}
            <div className="row">
                <div className="col-md-6">
                    <h2>Data Product</h2>
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
                    <h3>Hasil Pencarian:</h3>
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
            <Footer />
        </div>
    );
}

const Header = () => (
    <header className="bg-primary text-white text-center py-3">
        <h2>Selamat Datang di Toko Agus</h2>
    </header>
);

const Footer = () => (
    <footer className="bg-light text-center py-3 mt-4">
        <p>&copy; 2024 Toko Agus. All rights reserved.</p>
    </footer>
);

export default App;



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





// import React, { useRef, useState, useCallback } from 'react';
// import Webcam from 'react-webcam';
// import * as cocoSsd from '@tensorflow-models/coco-ssd';
// import '@tensorflow/tfjs';

// const productList = [
//   { barcode: '9783981305449', name: 'wafer', price: 2000, stock: 6 },
//   { barcode: '8 998127 514123', name: 'rokok', price: 5000, stock: 2 },
//   { barcode: '654789', name: 'saos abc', price: 7000, stock: 5 }
// ];

// const App = () => {
//   const webcamRef = useRef(null);
//   const [scanning, setScanning] = useState(false);
//   const [product, setProduct] = useState(null);

//   const detectBarcode = useCallback(async () => {
//     const model = await cocoSsd.load();
//     setInterval(async () => {
//       if (webcamRef.current && webcamRef.current.video.readyState === 4) {
//         const video = webcamRef.current.video;
//         const predictions = await model.detect(video);
//         predictions.forEach(prediction => {
//           if (prediction.class === 'barcode') {
//             const detectedBarcode = prediction.bbox; // Assuming this gives you the barcode value
//             const foundProduct = productList.find(product => product.barcode === detectedBarcode);
//             if (foundProduct) {
//               setProduct(foundProduct);
//             }
//           }
//         });
//       }
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       <h1>Toko Agus</h1>
//       <div>
//         <Webcam ref={webcamRef} />
//         <button onClick={() => { setScanning(true); detectBarcode(); }}>
//           Start Scan
//         </button>
//       </div>
//       <div>
//         <h2>Hasil Pencarian:</h2>
//         {product && (
//           <table>
//             <thead>
//               <tr>
//                 <th>Produk</th>
//                 <th>Harga</th>
//                 <th>Stok</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{product.name}</td>
//                 <td>{product.price}</td>
//                 <td>{product.stock}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState } from 'react';
// const App = () => {
//   const [barcode, setBarcode] = useState('');
//   const [product, setProduct] = useState(null);

//   const products = [
//     { barcode: '9783981305449', nama: 'wafer', harga: 2000, stok: 6 },
//     { barcode: '789456', nama: 'kecap abc', harga: 5000, stok: 3 },
//     { barcode: '654789', nama: 'saos abc', harga: 7000, stok: 5 },
//   ];

//   const handleScan = () => {
//     const foundProduct = products.find((p) => p.barcode === barcode);
//     setProduct(foundProduct);
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div>
//         <h3>Data product</h3>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>barcode</th>
//               <th>nama</th>
//               <th>harga</th>
//               <th>stok</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.barcode}>
//                 <td>{product.barcode}</td>
//                 <td>{product.nama}</td>
//                 <td>{product.harga}</td>
//                 <td>{product.stok}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div>
//         <h3>Toko Agus</h3>
//         <img src="barcode_image_url" alt="Barcode" style={{ width: '100px' }} />
//         <br />
//         <input
//           type="text"
//           value={barcode}
//           onChange={(e) => setBarcode(e.target.value)}
//           placeholder="Masukkan barcode"
//         />
//         <button onClick={handleScan}>Start scan</button>
//         <h4>Hasil pencarian:</h4>
//         {product ? (
//           <table border="1">
//             <thead>
//               <tr>
//                 <th>Produk</th>
//                 <th>harga</th>
//                 <th>stok</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{product.nama}</td>
//                 <td>{product.harga}</td>
//                 <td>{product.stok}</td>
//               </tr>
//             </tbody>
//           </table>
//         ) : (
//           <p>Produk tidak ditemukan</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
