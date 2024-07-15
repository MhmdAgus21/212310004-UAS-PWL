import React, {
    useState,
    useRef,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import Quagga from "@ericblade/quagga2";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Scanner from "./Scanner";

const productData = [
    { barcode: '1044114181711', name: 'Rokok camel', price: 2000, stock: 6 },
    { barcode: '5240017140152', name: 'Kecap ABC', price: 5000, stock: 3 },
    { barcode: '5104244481207', name: 'Saos ABC', price: 7000, stock: 5 },
    { barcode: '3015616459255', name: 'Kopi Indocafe', price: 4000, stock: 5 },
    { barcode: '3111444479592', name: 'Kopi MiX', price: 1000, stock: 6 },
    { barcode: '0670891474312', name: 'Kopi liong bulan', price: 3000, stock: 8 },
    { barcode: '3122187411404', name: 'Kopi Nako', price: 5000, stock: 5 },
];

function App() {
    const sizeCamera = { width: 400, height: 300 };
    const [scanning, setScanning] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [cameraId, setCameraId] = useState(null);
    const [results, setResults] = useState([]);
    const [torchOn, setTorch] = useState(false);
    const scannerRef = useRef(null);
    const listData = productData;
    const ResultData = useMemo(() => {
        let computedData = listData;
        if (results) {
            computedData = computedData.filter((listData) => {
                return Object.keys(listData).some((key) =>
                    listData[key].toString().toLowerCase().includes(results)
                );
            });
        }
        return computedData;
    }, [listData, results]);
    useEffect(() => {
        const enableCamera = async () => {
            await Quagga.CameraAccess.request(null, {});
        };
        const disableCamera = async () => {
            await Quagga.CameraAccess.release();
        };
        const enumerateCameras = async () => {
            const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
            console.log("Cameras Detected: ", cameras);
            return cameras;
        };
        enableCamera()
            .then(disableCamera)
            .then(enumerateCameras)
            .then((cameras) => setCameras(cameras))
            .then(() => Quagga.CameraAccess.disableTorch())
            .catch((err) => alert("kamera tidak terdeteksi"));
        return () => disableCamera();
    }, []);

    // const onTorchClick = useCallback(() => {
    //     const torch = !torchOn;
    //     setTorch(torch);
    //     if (torch) {
    //         Quagga.CameraAccess.enableTorch();
    //     } else {
    //         Quagga.CameraAccess.disableTorch();
    //     }
    // }, [torchOn, setTorch]);

    console.log(results)
    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-md-6">
                    <h2>Data Product</h2>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center mb-3 mb-lg-0 bg-white border rounded w-250px">
                            <input type="text" className="form-control form-control-sm form-control-flush" defaultValue={results} onChange={(e) => setResults(e.target.value.toLowerCase())} />
                            <span className="svg-icon svg-icon-1 svg-icon-gray-400 me-1">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <rect
                                        opacity="0.5"
                                        x="17.0365"
                                        y="15.1223"
                                        width="8.15546"
                                        height="2"
                                        rx="1"
                                        transform="rotate(45 17.0365 15.1223)"
                                        fill="currentColor"
                                    ></rect>
                                    <path
                                        d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                            </span>
                        </div>
                        <button className="btn btn-sm bg-light-primary fs-7" disabled={true}>
                            <span className="text-primary fw-bold">Total item {ResultData.length}</span>
                        </button>
                    </div>
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
                            {ResultData.length > 0 ? (
                                ResultData.map((product) => (
                                    <tr key={product.barcode}>
                                        <td>{product.barcode}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4}>No record found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <h2>Scan Barcode</h2>
                    <button
                        className="btn btn-info"
                        type="button"
                        onClick={() => setScanning(!scanning)}
                    >
                        <span className="font-weight-normal ms-1">
                            {scanning ? "Stop" : "Start"} Scanner
                        </span>
                    </button>
                    {scanning && (
                        <div className="scaners my-3">
                            <div
                                className="bg-light rounded"
                                style={{ width: sizeCamera.width, height: sizeCamera.height }}
                            >
                                <div ref={scannerRef}>
                                    <canvas
                                        className="drawingBuffer"
                                        style={{ position: "absolute" }}
                                        width={sizeCamera.width}
                                        height={sizeCamera.height}
                                    />
                                    {scanning ? (
                                        <Scanner
                                            scannerRef={scannerRef}
                                            cameraId={cameraId}
                                            onDetected={(result) => setResults([result])}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
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
    <footer className="bg-primary text-white text-center py-3 mt-4">
        <p>&copy; 2024 Toko Agus. All rights reserved.</p>
    </footer>
);

export default App;



// import React, { useState } from 'react';
// import BarcodeScannerComponent from 'react-barcode-reader';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import BarcodeScanner from './components/BarcodeScanner'


// const productData = [
//     { barcode: '8997217370854', name: 'Rokok', price: 2000, stock: 6 },
//     { barcode: '789456', name: 'Kecap ABC', price: 5000, stock: 3 },
//     { barcode: '654789', name: 'Saos ABC', price: 7000, stock: 5 },
//     { barcode: '1010101', name: 'Sakatonik ABC', price: 18000, stock: 5 },
// ];

// function App() {
//     const [scannedData, setScannedData] = useState(null);
//     const [displayData, setDisplayData] = useState(null);

//     const handleDisplayData = () => {
//         setDisplayData(scannedData);
//       };

//   const handleDetected = (data) => {
//     setScannedData(data.codeResult.code);
//   };

//     const handleScan = (data) => {
//         if (data) {
//             const product = productData.find((item) => item.barcode === data);
//             setScannedData(product);
//         }
//     };

//     const handleError = (err) => {
//         console.error(err);
//     };

//     return (
//         <div className="container">
//             <Header />
//             {/* <h1>Toko Agus 1</h1> */}
//             <div className="row">
//                 <div className="col-md-6">
//                     <h2>Data Product</h2>
//                     <table className="table">
//                         <thead>
//                             <tr>
//                                 <th>Barcode</th>
//                                 <th>Nama</th>
//                                 <th>Harga</th>
//                                 <th>Stok</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {productData.map((product) => (
//                                 <tr key={product.barcode}>
//                                     <td>{product.barcode}</td>
//                                     <td>{product.name}</td>
//                                     <td>{product.price}</td>
//                                     <td>{product.stock}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//                 <div className="col-md-6">
//                     <h2>Scan Barcode</h2>
//                     <BarcodeScannerComponent
//                         width={400}
//                         height={300}
//                         onUpdate={(err, result) => {
//                             if (result) handleScan(result.text);
//                             else handleError(err);
//                         }}
//                     />
//                     <button className="btn btn-primary">Start scan</button>
//                     <h3>Hasil Pencarian:</h3>
//                     {scannedData ? (
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Produk</th>
//                                     <th>Harga</th>
//                                     <th>Stok</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>{scannedData.name}</td>
//                                     <td>{scannedData.price}</td>
//                                     <td>{scannedData.stock}</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>Tidak ada data.</p>
//                     )}
//                 </div>
//             </div>

//             {/* <div>
//             <h1>Barcode Scanner</h1>
//                 <BarcodeScanner onDetected={handleDetected} />
//                 {scannedData && (
//                     <div>
//                     <button onClick={handleDisplayData}>Display Scanned Data</button>
//                     </div>
//                 )}
//                 {displayData && (
//                     <div>
//                     <h2>Scanned Data</h2>
//                     <p>{displayData}</p>
//                     </div>
//                 )}
//             </div> */}
//             <Footer />
//         </div>
//     );
// }

// const Header = () => (
//     <header className="bg-primary text-white text-center py-3">
//         <h2>Selamat Datang di Toko Agus</h2>
//     </header>
// );

// const Footer = () => (
//     <footer className="bg-primary text-white text-center py-3 mt-4">
//         <p>&copy; 2024 Toko Agus. All rights reserved.</p>
//     </footer>
// );

// export default App;





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




// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <View style={{ flex: 1 }}>
//       <StatusBar hidden={false} backgroundColor="white" />
//      <No2/>

//     </View>
   
//   );
// }

// export default App;


