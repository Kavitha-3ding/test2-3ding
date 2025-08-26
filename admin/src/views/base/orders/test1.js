// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import { io } from 'socket.io-client';

// // // // // const socket = io('http://localhost:3001');

// // // // // const OrderDetails = () => {
// // // // //   const { orderId } = useParams();
// // // // //   const [order, setOrder] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [optionsData, setOptionsData] = useState({
// // // // //     technologyOptions: {},
// // // // //     materialCosts: {},
// // // // //     densityCosts: {},
// // // // //     qualityCosts: {},
// // // // //   });
// // // // //   const [fileOptions, setFileOptions] = useState({});
// // // // //   const [customPrices, setCustomPrices] = useState({});

// // // // //   useEffect(() => {
// // // // //     fetchOrderDetails();
// // // // //     fetchOptionsData();

// // // // //     socket.on('orderUpdated', ({ orderId: updatedOrderId, updatedOrder }) => {
// // // // //       if (updatedOrderId === orderId) {
// // // // //         setOrder(updatedOrder);
// // // // //         initializeFileOptions(updatedOrder);
// // // // //       }
// // // // //     });

// // // // //     return () => {
// // // // //       socket.off('orderUpdated');
// // // // //     };
// // // // //   }, []);



// // // // //   const fetchOrderDetails = async () => {
// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`);
// // // // //       if (!response.ok) {
// // // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // // //       }
// // // // //       const data = await response.json();
// // // // //       setOrder(data);
// // // // //       initializeFileOptions(data);
// // // // //     } catch (error) {
// // // // //       setError(error.message);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchOptionsData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('http://localhost:3001/options');
// // // // //       const data = await response.json();
// // // // //       setOptionsData(data);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching options data:', error);
// // // // //     }
// // // // //   };

// // // // //   const initializeFileOptions = (orderData) => {
// // // // //     const initialFileOptions = {};
// // // // //     const initialCustomPrices = {};

// // // // //     orderData.files.forEach((file) => {
// // // // //       initialFileOptions[file._id] = {
// // // // //         technology: file.options?.technology || 'FDM/FFF',
// // // // //         material: file.options?.material || 'PLA',
// // // // //         color: file.options?.color || '',
// // // // //         quality: file.options?.quality || 'Draft',
// // // // //         density: file.options?.density || '20%',
// // // // //         // quantity: file.options?.quantity || 1,
// // // // //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// // // // //         customPrice: file.customPrice || 0,
// // // // //       };

// // // // //       initialCustomPrices[file._id] = file.customPrice || 0;
// // // // //     });

// // // // //     setFileOptions(initialFileOptions);
// // // // //     setCustomPrices(initialCustomPrices);
// // // // //   };

// // // // //   const updateAllItemTotals = () => {
// // // // //     setFileOptions((prevState) => {
// // // // //       const updatedFileOptions = { ...prevState };
// // // // //       order.files.forEach((file) => {
// // // // //         updatedFileOptions[file._id] = {
// // // // //           ...updatedFileOptions[file._id],
// // // // //           itemTotal: calculateItemTotal(
// // // // //             updatedFileOptions[file._id]?.material || 'PLA',
// // // // //             updatedFileOptions[file._id]?.density || '20%',
// // // // //             updatedFileOptions[file._id]?.quality || 'Draft',
// // // // //             file.buildVolume,
// // // // //             updatedFileOptions[file._id]?.quantity || 0,
// // // // //             customPrices[file._id] || 0
// // // // //           ),
// // // // //         };
// // // // //       });
// // // // //       return updatedFileOptions;
// // // // //     });
// // // // //   };

// // // // //   const handleOptionChange = (fileId, optionType, value) => {
// // // // //     setFileOptions((prevState) => {
// // // // //       const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // // // //       if (optionType === 'technology') {
// // // // //         const newTechnologyOptions = optionsData.technologyOptions[value];
// // // // //         updatedOptions.material = newTechnologyOptions.material[0] || '';
// // // // //         updatedOptions.color = newTechnologyOptions.color[0] || '';
// // // // //         updatedOptions.quality = newTechnologyOptions.quality[0] || '';
// // // // //         updatedOptions.density = newTechnologyOptions.density[0] || '';
// // // // //       }

// // // // //       return { ...prevState, [fileId]: updatedOptions };
// // // // //     });
// // // // //     updateAllItemTotals(); // Recalculate all item totals
// // // // //   };

// // // // //   const handleCustomPriceChange = (fileId, value) => {
// // // // //     setCustomPrices((prevState) => ({
// // // // //       ...prevState,
// // // // //       [fileId]: parseFloat(value) || 0, // Ensure custom price is parsed as float
// // // // //     }));
// // // // //     updateAllItemTotals(); // Recalculate all item totals

// // // // //     // Update itemTotal when custom price changes
// // // // //     setFileOptions((prevState) => ({
// // // // //       ...prevState,
// // // // //       [fileId]: {
// // // // //         ...prevState[fileId],
// // // // //         customPrice: parseFloat(value) || 0,
// // // // //         itemTotal: calculateItemTotal(
// // // // //           prevState[fileId]?.material || 'PLA',
// // // // //           prevState[fileId]?.density || '20%',
// // // // //           prevState[fileId]?.quality || 'Draft',
// // // // //           order.files.find((file) => file._id === fileId).buildVolume,
// // // // //           prevState[fileId]?.quantity || 1,
// // // // //           parseFloat(value) || 0 // Pass new custom price to calculateItemTotal
// // // // //         ),
// // // // //       },
// // // // //     }));
// // // // //   };


// // // // //   const handleSubmitOrder = async () => {
// // // // //     try {
// // // // //       const updatedFiles = order.files.map((file) => ({
// // // // //         ...file,
// // // // //         options: fileOptions[file._id],
// // // // //         itemTotal: fileOptions[file._id]?.itemTotal || 0,
// // // // //         customPrice: customPrices[file._id], // Ensure custom price is sent to the server
// // // // //       }));

// // // // //       const updatedOrder = {
// // // // //         ...order,
// // // // //         files: updatedFiles,
// // // // //         subtotal,          // Add subtotal
// // // // //         shippingCharges,   // Add shipping charges
// // // // //         gst,               // Add GST
// // // // //         total,             // Add total
// // // // //       };

// // // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify(updatedOrder),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         console.log('Order updated successfully');
// // // // //         setOrder(data); // Update the order in the state with the response data
// // // // //       } else {
// // // // //         console.error('Error updating order');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error updating order:', error);
// // // // //     }
// // // // //   };


// // // // //   const calculatePrice = (material, density, quality, buildVolume) => {
// // // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// // // // //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // // //     return Math.round(totalPrice);
// // // // //   };

// // // // //   // const calculateItemTotal = (
// // // // //   //   material,
// // // // //   //   density,
// // // // //   //   quality,
// // // // //   //   buildVolume,
// // // // //   //   quantity,
// // // // //   //   customPrice = 0
// // // // //   // ) => {
// // // // //   //   if (quantity === 0) return 0;
// // // // //   //   const materialCost = optionsData.materialCosts[material] || 0;
// // // // //   //   const densityCost = optionsData.densityCosts[density] || 0;
// // // // //   //   const qualityCost = optionsData.qualityCosts[quality] || 0;

// // // // //   //   if (customPrice !== 0) {
// // // // //   //     // Use custom price if provided
// // // // //   //     return Math.round(customPrice * quantity);
// // // // //   //   } else {
// // // // //   //     // Otherwise, calculate using standard price calculation
// // // // //   //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // // //   //     return Math.round(totalPrice * quantity);
// // // // //   //   }
// // // // //   // };

// // // // //   const calculateItemTotal = (
// // // // //     material,
// // // // //     density,
// // // // //     quality,
// // // // //     buildVolume,
// // // // //     quantity,
// // // // //     customPrice = 0
// // // // //   ) => {
// // // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // // // //     if (customPrice !== 0) {
// // // // //       return Math.round(customPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // // //     } else {
// // // // //       const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // // //       return Math.round(totalPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // // //     }
// // // // //   };


// // // // //   // const calculateSubtotal = () => {
// // // // //   //   return order.files.reduce((acc, file) => {
// // // // //   //     const fileTotal = calculateItemTotal(
// // // // //   //       fileOptions[file._id]?.material || 'PLA',
// // // // //   //       fileOptions[file._id]?.density || '20%',
// // // // //   //       fileOptions[file._id]?.quality || 'Draft',
// // // // //   //       file.buildVolume,
// // // // //   //       fileOptions[file._id]?.quantity || 1,
// // // // //   //       customPrices[file._id] || 0
// // // // //   //     );
// // // // //   //     return acc + fileTotal;
// // // // //   //   }, 0);
// // // // //   // };


// // // // //   const calculateSubtotal = () => {
// // // // //     return order.files.reduce((acc, file) => {
// // // // //       const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // // // //       const fileTotal =
// // // // //         quantity > 0
// // // // //           ? calculateItemTotal(
// // // // //               fileOptions[file._id]?.material || 'PLA',
// // // // //               fileOptions[file._id]?.density || '20%',
// // // // //               fileOptions[file._id]?.quality || 'Draft',
// // // // //               file.buildVolume,
// // // // //               quantity,
// // // // //               customPrices[file._id] || 0
// // // // //             )
// // // // //           : 0; // Skip adding to subtotal if quantity is 0
// // // // //       return acc + fileTotal;
// // // // //     }, 0);
// // // // //   };

// // // // //   const calculateGST = (subtotal) => {
// // // // //     return Math.round(subtotal * 0.18);
// // // // //   };

// // // // //   const calculateTotal = (subtotal, gst, shippingCharges) => {
// // // // //     return subtotal + gst + shippingCharges;
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <div>Loading...</div>;
// // // // //   }

// // // // //   if (error) {
// // // // //     return <div>Error: {error}</div>;
// // // // //   }

// // // // //   if (!order) {
// // // // //     return <div>No order found</div>;
// // // // //   }

// // // // //   const subtotal = calculateSubtotal();
// // // // //   const gst = calculateGST(subtotal);
// // // // //   const shippingCharges = order.shippingCharges || 0;
// // // // //   const total = calculateTotal(subtotal, gst, shippingCharges);

// // // // //   return (
// // // // //     <div className="container mt-5">
// // // // //       <div className="card">
// // // // //         <div className="card-header">
// // // // //           <h3>
// // // // //             Order Details <small className="text-muted">Order ID: {order.orderId}</small>
// // // // //             <spna>subtotal:{subtotal}</spna><span>Total:{total}</span>
// // // // //           </h3>
// // // // //         </div>
// // // // //         <div className="card-body">
// // // // //           <table className="table table-striped">
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <th className='col-md-1'>Serial No.</th>
// // // // //                 <th className='col-md-1'>File Name</th>
// // // // //                 <th className='col-md-1'>Technology</th>
// // // // //                 <th className='col-md-1'>Material</th>
// // // // //                 <th className='col-md-1'>Color</th>
// // // // //                 <th className='col-md-1'>Quality</th>
// // // // //                 <th className='col-md-1'>Density</th>
// // // // //                 <th className='col-md-1'>Quantity</th>
// // // // //                 <th className='col-md-1'>Volume</th>
// // // // //                 <th className='col-md-1'>Price</th>
// // // // //                 <th className='col-md-1'>Custom Price</th>
// // // // //                 <th className='col-md-1'>Total</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {order.files.map((file, index) => (
// // // // //                 <tr key={file._id}>
// // // // //                   <td>{index + 1}</td>
// // // // //                   <td>{file.originalName}
// // // // //                     <br />
// // // // //                     {file.dimensions
// // // // //                       ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // // // //                       : '-'}</td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.technology || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'technology', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {Object.keys(optionsData.technologyOptions).map((technology) => (
// // // // //                         <option key={technology} value={technology}>
// // // // //                           {technology}
// // // // //                         </option>
// // // // //                       ))}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.material || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'material', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material.map(
// // // // //                         (material) => (
// // // // //                           <option key={material} value={material}>
// // // // //                             {material}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.color || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'color', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color.map(
// // // // //                         (color) => (
// // // // //                           <option key={color} value={color}>
// // // // //                             {color}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.quality || ''}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality.map(
// // // // //                         (quality) => (
// // // // //                           <option key={quality} value={quality}>
// // // // //                             {quality}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.density || ''}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density.map(
// // // // //                         (density) => (
// // // // //                           <option key={density} value={density}>
// // // // //                             {density}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <input
// // // // //                       type="number"
// // // // //                       className="form-control"
// // // // //                       value={fileOptions[file._id]?.quantity || 0}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'quantity', parseInt(e.target.value, 10) || 0)}
// // // // //                       min="0"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td> {file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : '-'}</td>
// // // // //                   <td>
// // // // //                     {calculatePrice(
// // // // //                       fileOptions[file._id]?.material,
// // // // //                       fileOptions[file._id]?.density,
// // // // //                       fileOptions[file._id]?.quality,
// // // // //                       file.buildVolume
// // // // //                     )}
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <input
// // // // //                       type="number"
// // // // //                       className="form-control"
// // // // //                       value={fileOptions[file._id]?.customPrice || 0}
// // // // //                       onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// // // // //                       min="0"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     {calculateItemTotal(
// // // // //                       fileOptions[file._id]?.material,
// // // // //                       fileOptions[file._id]?.density,
// // // // //                       fileOptions[file._id]?.quality,
// // // // //                       file.buildVolume,
// // // // //                       fileOptions[file._id]?.quantity,
// // // // //                       fileOptions[file._id]?.customPrice
// // // // //                     )}
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //           <button className="btn btn-primary" onClick={handleSubmitOrder}>
// // // // //             Save Order
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OrderDetails;


// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import { io } from 'socket.io-client';

// // // // // const socket = io('http://localhost:3001');

// // // // // const OrderDetails = () => {
// // // // //   const { orderId } = useParams();
// // // // //   const [order, setOrder] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [optionsData, setOptionsData] = useState({
// // // // //     technologyOptions: {},
// // // // //     materialCosts: {},
// // // // //     densityCosts: {},
// // // // //     qualityCosts: {},
// // // // //   });
// // // // //   const [fileOptions, setFileOptions] = useState({});
// // // // //   const [customPrices, setCustomPrices] = useState({});
// // // // //   const [customShippingPrice, setCustomShippingPrice] = useState(0);


// // // // //   useEffect(() => {
// // // // //     fetchOrderDetails();
// // // // //     fetchOptionsData();

// // // // //     socket.on('orderUpdated', ({ orderId: updatedOrderId, updatedOrder }) => {
// // // // //       if (updatedOrderId === orderId) {
// // // // //         setOrder(updatedOrder);
// // // // //         initializeFileOptions(updatedOrder);
// // // // //       }
// // // // //     });

// // // // //     return () => {
// // // // //       socket.off('orderUpdated');
// // // // //     };
// // // // //   }, []);



// // // // //   const fetchOrderDetails = async () => {
// // // // //     try {
// // // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`);
// // // // //       if (!response.ok) {
// // // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // // //       }
// // // // //       const data = await response.json();
// // // // //       setOrder(data);
// // // // //       initializeFileOptions(data);
// // // // //     } catch (error) {
// // // // //       setError(error.message);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const fetchOptionsData = async () => {
// // // // //     try {
// // // // //       const response = await fetch('http://localhost:3001/options');
// // // // //       const data = await response.json();
// // // // //       setOptionsData(data);
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching options data:', error);
// // // // //     }
// // // // //   };

// // // // //   const initializeFileOptions = (orderData) => {
// // // // //     const initialFileOptions = {};
// // // // //     const initialCustomPrices = {};

// // // // //     orderData.files.forEach((file) => {
// // // // //       initialFileOptions[file._id] = {
// // // // //         technology: file.options?.technology || 'FDM/FFF',
// // // // //         material: file.options?.material || 'PLA',
// // // // //         color: file.options?.color || '',
// // // // //         quality: file.options?.quality || 'Draft',
// // // // //         density: file.options?.density || '20%',
// // // // //         // quantity: file.options?.quantity || 1,
// // // // //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// // // // //         customPrice: file.customPrice || 0,
// // // // //       };

// // // // //       initialCustomPrices[file._id] = file.customPrice || 0;
// // // // //     });

// // // // //     setFileOptions(initialFileOptions);
// // // // //     setCustomPrices(initialCustomPrices);
// // // // //   };

// // // // //   const updateAllItemTotals = () => {
// // // // //     setFileOptions((prevState) => {
// // // // //       const updatedFileOptions = { ...prevState };
// // // // //       order.files.forEach((file) => {
// // // // //         updatedFileOptions[file._id] = {
// // // // //           ...updatedFileOptions[file._id],
// // // // //           itemTotal: calculateItemTotal(
// // // // //             updatedFileOptions[file._id]?.material || 'PLA',
// // // // //             updatedFileOptions[file._id]?.density || '20%',
// // // // //             updatedFileOptions[file._id]?.quality || 'Draft',
// // // // //             file.buildVolume,
// // // // //             updatedFileOptions[file._id]?.quantity || 0,
// // // // //             customPrices[file._id] || 0
// // // // //           ),
// // // // //         };
// // // // //       });
// // // // //       return updatedFileOptions;
// // // // //     });
// // // // //   };

// // // // //   const handleOptionChange = (fileId, optionType, value) => {
// // // // //     setFileOptions((prevState) => {
// // // // //       const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // // // //       if (optionType === 'technology') {
// // // // //         const newTechnologyOptions = optionsData.technologyOptions[value];
// // // // //         updatedOptions.material = newTechnologyOptions.material[0] || '';
// // // // //         updatedOptions.color = newTechnologyOptions.color[0] || '';
// // // // //         updatedOptions.quality = newTechnologyOptions.quality[0] || '';
// // // // //         updatedOptions.density = newTechnologyOptions.density[0] || '';
// // // // //       }

// // // // //       return { ...prevState, [fileId]: updatedOptions };
// // // // //     });
// // // // //     updateAllItemTotals(); // Recalculate all item totals
// // // // //   };

// // // // //   const handleCustomPriceChange = (fileId, value) => {
// // // // //     setCustomPrices((prevState) => ({
// // // // //       ...prevState,
// // // // //       [fileId]: parseFloat(value) || 0, // Ensure custom price is parsed as float
// // // // //     }));
// // // // //     updateAllItemTotals(); // Recalculate all item totals

// // // // //     // Update itemTotal when custom price changes
// // // // //     setFileOptions((prevState) => ({
// // // // //       ...prevState,
// // // // //       [fileId]: {
// // // // //         ...prevState[fileId],
// // // // //         customPrice: parseFloat(value) || 0,
// // // // //         itemTotal: calculateItemTotal(
// // // // //           prevState[fileId]?.material || 'PLA',
// // // // //           prevState[fileId]?.density || '20%',
// // // // //           prevState[fileId]?.quality || 'Draft',
// // // // //           order.files.find((file) => file._id === fileId).buildVolume,
// // // // //           prevState[fileId]?.quantity || 1,
// // // // //           parseFloat(value) || 0 // Pass new custom price to calculateItemTotal
// // // // //         ),
// // // // //       },
// // // // //     }));
// // // // //   };


// // // // //   const handleSubmitOrder = async () => {
// // // // //     try {
// // // // //       const updatedFiles = order.files.map((file) => ({
// // // // //         ...file,
// // // // //         options: fileOptions[file._id],
// // // // //         // itemTotal: fileOptions[file._id]?.itemTotal || 0,
// // // // //         customPrice: customPrices[file._id], // Ensure custom price is sent to the server
// // // // //         price: calculatePrice(
// // // // //           fileOptions[file._id]?.material || 'PLA',
// // // // //           fileOptions[file._id]?.density || '20%',
// // // // //           fileOptions[file._id]?.quality || 'Draft',
// // // // //           file.buildVolume
// // // // //         ),
// // // // //         itemTotal: calculateItemTotal(
// // // // //           fileOptions[file._id]?.material,
// // // // //           fileOptions[file._id]?.density,
// // // // //           fileOptions[file._id]?.quality,
// // // // //           file.buildVolume,
// // // // //           fileOptions[file._id]?.quantity,
// // // // //           fileOptions[file._id]?.customPrice
// // // // //         )
// // // // //       }));

// // // // //       const updatedOrder = {
// // // // //         ...order,
// // // // //         files: updatedFiles,
// // // // //         subtotal,      
// // // // //         gst,    
// // // // //         // shippingCharges,   // Add shipping charges
// // // // //         shippingCharges: customShippingPrice || shippingCharges, 
// // // // //         total,           
// // // // //       };

// // // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
// // // // //         method: 'PUT',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //         },
// // // // //         body: JSON.stringify(updatedOrder),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         console.log('Order updated successfully');
// // // // //         setOrder(data); // Update the order in the state with the response data
// // // // //       } else {
// // // // //         console.error('Error updating order');
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error updating order:', error);
// // // // //     }
// // // // //   };


// // // // //   const calculatePrice = (material, density, quality, buildVolume) => {
// // // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// // // // //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // // //     return Math.round(totalPrice);
// // // // //   };

// // // // //   const calculateItemTotal = (
// // // // //     material,
// // // // //     density,
// // // // //     quality,
// // // // //     buildVolume,
// // // // //     quantity,
// // // // //     customPrice = 0
// // // // //   ) => {
// // // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // // // //     if (customPrice !== 0) {
// // // // //       return Math.round(customPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // // //     } else {
// // // // //       const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // // //       return Math.round(totalPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // // //     }
// // // // //   };


// // // // //   const calculateSubtotal = () => {
// // // // //     return order.files.reduce((acc, file) => {
// // // // //       const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // // // //       const fileTotal =
// // // // //         quantity > 0
// // // // //           ? calculateItemTotal(
// // // // //             fileOptions[file._id]?.material || 'PLA',
// // // // //             fileOptions[file._id]?.density || '20%',
// // // // //             fileOptions[file._id]?.quality || 'Draft',
// // // // //             file.buildVolume,
// // // // //             quantity,
// // // // //             customPrices[file._id] || 0
// // // // //           )
// // // // //           : 0; // Skip adding to subtotal if quantity is 0
// // // // //       return acc + fileTotal;
// // // // //     }, 0);
// // // // //   };

// // // // //   const calculateGST = (subtotal) => {
// // // // //     return Math.round(subtotal * 0.18);
// // // // //   };

// // // // //   // const calculateTotal = (subtotal, gst, shippingCharges) => {
// // // // //   //   return subtotal + gst + shippingCharges;
// // // // //   // };

// // // // //   const calculateTotal = (subtotal, gst, shippingCharges) => {
// // // // //     const effectiveShippingCharges = customShippingPrice !== 0 ? customShippingPrice : shippingCharges;
// // // // //     return subtotal + gst + effectiveShippingCharges;
// // // // //   };


// // // // //   if (loading) {
// // // // //     return <div>Loading...</div>;
// // // // //   }

// // // // //   if (error) {
// // // // //     return <div>Error: {error}</div>;
// // // // //   }

// // // // //   if (!order) {
// // // // //     return <div>No order found</div>;
// // // // //   }

// // // // //   const subtotal = calculateSubtotal();
// // // // //   const gst = calculateGST(subtotal);
// // // // //   const shippingCharges = order.shippingCharges || 0;
// // // // //   const total = calculateTotal(subtotal, gst, shippingCharges);
// // // // //   const price = calculatePrice();

// // // // //   return (
// // // // //     <div className="container mt-5">
// // // // //       <div className="card">
// // // // //         <div className="card-header">
// // // // //           <h3>
// // // // //             Order Details <small className="text-muted">Order ID: {order.orderId}</small>
// // // // //           </h3>
// // // // //           <p> <span className='mx-5'>subtotal:{subtotal}</span><span className='mx-5'>Total:{total}</span>
// // // // //             <span className='mx-5'>GST:{gst}</span> <span className='mx-5'>S.Chrg:{shippingCharges}</span></p>
// // // // //         </div>
// // // // //         <div className="mb-3 m-5 col-md-2">
// // // // //           <label htmlFor="customShippingPrice" className="fw-bold form-label">Custom Shipping Price</label>
// // // // //           <input
// // // // //             type="number"
// // // // //             id="customShippingPrice"
// // // // //             className="form-control"
// // // // //             value={customShippingPrice}
// // // // //             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// // // // //           />
// // // // //         </div>
// // // // //         <div className="card-body">
// // // // //           <table className="table table-striped">
// // // // //             <thead>
// // // // //               <tr>
// // // // //                 <th className='col-md-1'>Serial No.</th>
// // // // //                 <th className='col-md-1'>File Name</th>
// // // // //                 <th className='col-md-1'>Technology</th>
// // // // //                 <th className='col-md-1'>Material</th>
// // // // //                 <th className='col-md-1'>Color</th>
// // // // //                 <th className='col-md-1'>Quality</th>
// // // // //                 <th className='col-md-1'>Density</th>
// // // // //                 <th className='col-md-1'>Quantity</th>
// // // // //                 <th className='col-md-1'>Volume</th>
// // // // //                 <th className='col-md-1'>Price</th>
// // // // //                 <th className='col-md-1'>Custom Price</th>
// // // // //                 <th className='col-md-1'>Total</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {order.files.map((file, index) => (
// // // // //                 <tr key={file._id}>
// // // // //                   <td>{index + 1}</td>
// // // // //                   <td>{file.originalName}
// // // // //                     <br />
// // // // //                     {file.dimensions
// // // // //                       ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // // // //                       : '-'}</td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.technology || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'technology', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {Object.keys(optionsData.technologyOptions).map((technology) => (
// // // // //                         <option key={technology} value={technology}>
// // // // //                           {technology}
// // // // //                         </option>
// // // // //                       ))}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.material || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'material', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material.map(
// // // // //                         (material) => (
// // // // //                           <option key={material} value={material}>
// // // // //                             {material}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.color || ''}
// // // // //                       onChange={(e) =>
// // // // //                         handleOptionChange(file._id, 'color', e.target.value)
// // // // //                       }
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color.map(
// // // // //                         (color) => (
// // // // //                           <option key={color} value={color}>
// // // // //                             {color}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.quality || ''}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality.map(
// // // // //                         (quality) => (
// // // // //                           <option key={quality} value={quality}>
// // // // //                             {quality}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <select
// // // // //                       className="form-select"
// // // // //                       value={fileOptions[file._id]?.density || ''}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // // // //                     >
// // // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density.map(
// // // // //                         (density) => (
// // // // //                           <option key={density} value={density}>
// // // // //                             {density}
// // // // //                           </option>
// // // // //                         )
// // // // //                       )}
// // // // //                     </select>
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <input
// // // // //                       type="number"
// // // // //                       className="form-control"
// // // // //                       value={fileOptions[file._id]?.quantity || 0}
// // // // //                       onChange={(e) => handleOptionChange(file._id, 'quantity', parseInt(e.target.value, 10) || 0)}
// // // // //                       min="0"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td> {file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : '-'}</td>
// // // // //                   <td>
// // // // //                     {calculatePrice(
// // // // //                       fileOptions[file._id]?.material,
// // // // //                       fileOptions[file._id]?.density,
// // // // //                       fileOptions[file._id]?.quality,
// // // // //                       file.buildVolume
// // // // //                     )}
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     <input
// // // // //                       type="number"
// // // // //                       className="form-control"
// // // // //                       value={fileOptions[file._id]?.customPrice || 0}
// // // // //                       onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// // // // //                       min="0"
// // // // //                     />
// // // // //                   </td>
// // // // //                   <td>
// // // // //                     {calculateItemTotal(
// // // // //                       fileOptions[file._id]?.material,
// // // // //                       fileOptions[file._id]?.density,
// // // // //                       fileOptions[file._id]?.quality,
// // // // //                       file.buildVolume,
// // // // //                       fileOptions[file._id]?.quantity,
// // // // //                       fileOptions[file._id]?.customPrice
// // // // //                     )}
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //           <button className="btn btn-primary" onClick={handleSubmitOrder}>
// // // // //             Save Order
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default OrderDetails;


// // // // import React, { useEffect, useState } from 'react';
// // // // import { useParams } from 'react-router-dom';
// // // // import { io } from 'socket.io-client';

// // // // const socket = io('http://localhost:3001');

// // // // const OrderDetails = () => {
// // // //   const { orderId } = useParams();
// // // //   const [order, setOrder] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [optionsData, setOptionsData] = useState({
// // // //     technologyOptions: {},
// // // //     materialCosts: {},
// // // //     densityCosts: {},
// // // //     qualityCosts: {},
// // // //   });
// // // //   const [fileOptions, setFileOptions] = useState({});
// // // //   const [customPrices, setCustomPrices] = useState({});
// // // //   const [customShippingPrice, setCustomShippingPrice] = useState(0);


// // // //   useEffect(() => {
// // // //     fetchOrderDetails();
// // // //     fetchOptionsData();

// // // //     socket.on('orderUpdated', ({ orderId: updatedOrderId, updatedOrder }) => {
// // // //       if (updatedOrderId === orderId) {
// // // //         setOrder(updatedOrder);
// // // //         initializeFileOptions(updatedOrder);
// // // //       }
// // // //     });

// // // //     return () => {
// // // //       socket.off('orderUpdated');
// // // //     };
// // // //   }, []);



// // // //   const fetchOrderDetails = async () => {
// // // //     try {
// // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`);
// // // //       if (!response.ok) {
// // // //         throw new Error(`HTTP error! status: ${response.status}`);
// // // //       }
// // // //       const data = await response.json();
// // // //       setOrder(data);
// // // //       initializeFileOptions(data);
// // // //     } catch (error) {
// // // //       setError(error.message);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchOptionsData = async () => {
// // // //     try {
// // // //       const response = await fetch('http://localhost:3001/options');
// // // //       const data = await response.json();
// // // //       setOptionsData(data);
// // // //     } catch (error) {
// // // //       console.error('Error fetching options data:', error);
// // // //     }
// // // //   };

// // // //   const initializeFileOptions = (orderData) => {
// // // //     const initialFileOptions = {};
// // // //     const initialCustomPrices = {};

// // // //     orderData.files.forEach((file) => {
// // // //       initialFileOptions[file._id] = {
// // // //         technology: file.options?.technology || 'FDM/FFF',
// // // //         material: file.options?.material || 'PLA',
// // // //         color: file.options?.color || '',
// // // //         quality: file.options?.quality || 'Draft',
// // // //         density: file.options?.density || '20%',
// // // //         // quantity: file.options?.quantity || 1,
// // // //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// // // //         customPrice: file.customPrice || 0,
// // // //       };

// // // //       initialCustomPrices[file._id] = file.customPrice || 0;
// // // //     });

// // // //     setFileOptions(initialFileOptions);
// // // //     setCustomPrices(initialCustomPrices);
// // // //   };

// // // //   const updateAllItemTotals = () => {
// // // //     setFileOptions((prevState) => {
// // // //       const updatedFileOptions = { ...prevState };
// // // //       order.files.forEach((file) => {
// // // //         updatedFileOptions[file._id] = {
// // // //           ...updatedFileOptions[file._id],
// // // //           itemTotal: calculateItemTotal(
// // // //             updatedFileOptions[file._id]?.material || 'PLA',
// // // //             updatedFileOptions[file._id]?.density || '20%',
// // // //             updatedFileOptions[file._id]?.quality || 'Draft',
// // // //             file.buildVolume,
// // // //             updatedFileOptions[file._id]?.quantity || 0,
// // // //             customPrices[file._id] || 0
// // // //           ),
// // // //         };
// // // //       });
// // // //       return updatedFileOptions;
// // // //     });
// // // //   };

// // // //   const handleOptionChange = (fileId, optionType, value) => {
// // // //     setFileOptions((prevState) => {
// // // //       const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // // //       if (optionType === 'technology') {
// // // //         const newTechnologyOptions = optionsData.technologyOptions[value];
// // // //         updatedOptions.material = newTechnologyOptions.material[0] || '';
// // // //         updatedOptions.color = newTechnologyOptions.color[0] || '';
// // // //         updatedOptions.quality = newTechnologyOptions.quality[0] || '';
// // // //         updatedOptions.density = newTechnologyOptions.density[0] || '';
// // // //       }

// // // //       return { ...prevState, [fileId]: updatedOptions };
// // // //     });
// // // //     updateAllItemTotals(); // Recalculate all item totals
// // // //   };

// // // //   const handleCustomPriceChange = (fileId, value) => {
// // // //     setCustomPrices((prevState) => ({
// // // //       ...prevState,
// // // //       [fileId]: parseFloat(value) || 0, // Ensure custom price is parsed as float
// // // //     }));
// // // //     updateAllItemTotals(); // Recalculate all item totals

// // // //     // Update itemTotal when custom price changes
// // // //     setFileOptions((prevState) => ({
// // // //       ...prevState,
// // // //       [fileId]: {
// // // //         ...prevState[fileId],
// // // //         customPrice: parseFloat(value) || 0,
// // // //         itemTotal: calculateItemTotal(
// // // //           prevState[fileId]?.material || 'PLA',
// // // //           prevState[fileId]?.density || '20%',
// // // //           prevState[fileId]?.quality || 'Draft',
// // // //           order.files.find((file) => file._id === fileId).buildVolume,
// // // //           prevState[fileId]?.quantity || 1,
// // // //           parseFloat(value) || 0 // Pass new custom price to calculateItemTotal
// // // //         ),
// // // //       },
// // // //     }));
// // // //   };


// // // //   const handleSubmitOrder = async () => {
// // // //     try {
// // // //       const updatedFiles = order.files.map((file) => ({
// // // //         ...file,
// // // //         options: fileOptions[file._id],
// // // //         // itemTotal: fileOptions[file._id]?.itemTotal || 0,
// // // //         customPrice: customPrices[file._id], // Ensure custom price is sent to the server
// // // //         price: calculatePrice(
// // // //           fileOptions[file._id]?.material || 'PLA',
// // // //           fileOptions[file._id]?.density || '20%',
// // // //           fileOptions[file._id]?.quality || 'Draft',
// // // //           file.buildVolume
// // // //         ),
// // // //         itemTotal: calculateItemTotal(
// // // //           fileOptions[file._id]?.material,
// // // //           fileOptions[file._id]?.density,
// // // //           fileOptions[file._id]?.quality,
// // // //           file.buildVolume,
// // // //           fileOptions[file._id]?.quantity,
// // // //           fileOptions[file._id]?.customPrice
// // // //         )
// // // //       }));

// // // //       const updatedOrder = {
// // // //         ...order,
// // // //         files: updatedFiles,
// // // //         subtotal,
// // // //         gst,
// // // //         // shippingCharges,   // Add shipping charges
// // // //         shippingCharges: customShippingPrice || shippingCharges,
// // // //         total,
// // // //       };

// // // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
// // // //         method: 'PUT',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //         },
// // // //         body: JSON.stringify(updatedOrder),
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         console.log('Order updated successfully');
// // // //         setOrder(data); // Update the order in the state with the response data
// // // //       } else {
// // // //         console.error('Error updating order');
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error updating order:', error);
// // // //     }
// // // //   };


// // // //   const calculatePrice = (material, density, quality, buildVolume) => {
// // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// // // //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // //     return Math.round(totalPrice);
// // // //   };

// // // //   const calculateItemTotal = (
// // // //     material,
// // // //     density,
// // // //     quality,
// // // //     buildVolume,
// // // //     quantity,
// // // //     customPrice = 0
// // // //   ) => {
// // // //     const materialCost = optionsData.materialCosts[material] || 0;
// // // //     const densityCost = optionsData.densityCosts[density] || 0;
// // // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // // //     if (customPrice !== 0) {
// // // //       return Math.round(customPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // //     } else {
// // // //       const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // // //       return Math.round(totalPrice * (quantity || 0)); // Use 0 if quantity is 0
// // // //     }
// // // //   };


// // // //   const calculateSubtotal = () => {
// // // //     return order.files.reduce((acc, file) => {
// // // //       const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // // //       const fileTotal =
// // // //         quantity > 0
// // // //           ? calculateItemTotal(
// // // //             fileOptions[file._id]?.material || 'PLA',
// // // //             fileOptions[file._id]?.density || '20%',
// // // //             fileOptions[file._id]?.quality || 'Draft',
// // // //             file.buildVolume,
// // // //             quantity,
// // // //             customPrices[file._id] || 0
// // // //           )
// // // //           : 0; // Skip adding to subtotal if quantity is 0
// // // //       return acc + fileTotal;
// // // //     }, 0);
// // // //   };

// // // //   const calculateGST = (subtotal) => {
// // // //     return Math.round(subtotal * 0.18);
// // // //   };

// // // //   // const calculateTotal = (subtotal, gst, shippingCharges) => {
// // // //   //   return subtotal + gst + shippingCharges;
// // // //   // };

// // // //   const calculateTotal = (subtotal, gst, shippingCharges) => {
// // // //     const effectiveShippingCharges = customShippingPrice !== 0 ? customShippingPrice : shippingCharges;
// // // //     return subtotal + gst + effectiveShippingCharges;
// // // //   };


// // // //   if (loading) {
// // // //     return <div>Loading...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div>Error: {error}</div>;
// // // //   }

// // // //   if (!order) {
// // // //     return <div>No order found</div>;
// // // //   }

// // // //   const subtotal = calculateSubtotal();
// // // //   const gst = calculateGST(subtotal);
// // // //   const shippingCharges = order.shippingCharges || 0;
// // // //   const total = calculateTotal(subtotal, gst, shippingCharges);
// // // //   const price = calculatePrice();

// // // //   // const handleDownload = async (id, originalName) => {
// // // //   //   try {
// // // //   //     const response = await fetch(`http://localhost:3001/download/${id}`);
// // // //   //     const blob = await response.blob();

// // // //   //     const filenameWithoutExtension = originalName.replace(/\.[^/.]+$/, '');
// // // //   //     const extension = originalName.split('.').pop(); // Extract file extension
// // // //   //     const filename = `${filenameWithoutExtension}.${extension}`;

// // // //   //     const url = window.URL.createObjectURL(new Blob([blob]));
// // // //   //     const link = document.createElement('a');
// // // //   //     link.href = url;
// // // //   //     link.setAttribute('download', filename); // Set download filename
// // // //   //     document.body.appendChild(link);
// // // //   //     link.click();
// // // //   //     document.body.removeChild(link);
// // // //   //   } catch (error) {
// // // //   //     console.error('Error downloading file:', error);
// // // //   //   }
// // // //   // };

// // // //   const handleDownload = async (id) => {
// // // //     try {
// // // //       // Fetch the download URL from the backend
// // // //       const response = await fetch(`http://localhost:3001/download/${id}`);
// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to fetch download link");
// // // //       }

// // // //       // Redirect user to S3 file URL
// // // //       window.location.href = response.url;
// // // //     } catch (error) {
// // // //       console.error('Error downloading file:', error);
// // // //     }
// // // //   };

// // // //   const handleDownloadAll = async (orderId) => {
// // // //     try {
// // // //       console.log("Downloading ZIP for order:", orderId);
// // // //       const response = await fetch(`http://localhost:3001/download/order/${orderId}`);

// // // //       if (!response.ok) {
// // // //         throw new Error("Failed to fetch ZIP file");
// // // //       }

// // // //       // Convert response to a downloadable file
// // // //       const blob = await response.blob();
// // // //       const link = document.createElement("a");
// // // //       link.href = window.URL.createObjectURL(blob);
// // // //       link.download = `${orderId}.zip`;
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //     } catch (error) {
// // // //       console.error("Error downloading ZIP:", error);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="container mt-5">
// // // //       <div className="card">
// // // //         <div className="card-header">
// // // //           <h3>
// // // //             Order Details <small className="text-muted">Order ID: {order.orderId}</small>
// // // //           </h3>
// // // //           <p> <span className='mx-5'>subtotal:{subtotal}</span><span className='mx-5'>Total:{total}</span>
// // // //             <span className='mx-5'>GST:{gst}</span> <span className='mx-5'>S.Chrg:{shippingCharges}</span>
// // // //             <button className="btn btn-primary mx-5" onClick={() => handleDownloadAll(orderId)}>Download All Files</button>
// // // //           </p>
// // // //         </div>
// // // //         <div className="mb-3 m-5 col-md-2">
// // // //           <label htmlFor="customShippingPrice" className="fw-bold form-label">Custom Shipping Price</label>
// // // //           <input
// // // //             type="number"
// // // //             id="customShippingPrice"
// // // //             className="form-control"
// // // //             value={customShippingPrice}
// // // //             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// // // //           />
// // // //         </div>
// // // //         <div className="card-body">
// // // //           <table className="table table-striped">
// // // //             <thead>
// // // //               <tr>
// // // //                 <th className='col-md-1'>Serial No.</th>
// // // //                 <th className='col-md-1'>File Name</th>
// // // //                 <th className='col-md-1'>Technology</th>
// // // //                 <th className='col-md-1'>Material</th>
// // // //                 <th className='col-md-1'>Color</th>
// // // //                 <th className='col-md-1'>Quality</th>
// // // //                 <th className='col-md-1'>Density</th>
// // // //                 <th className='col-md-1'>Quantity</th>
// // // //                 <th className='col-md-1'>Volume</th>
// // // //                 <th className='col-md-1'>Price</th>
// // // //                 <th className='col-md-1'>Custom Price</th>
// // // //                 <th className='col-md-1'>Total</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody>
// // // //               {order.files.map((file, index) => (
// // // //                 <tr key={file._id}>
// // // //                   <td>{index + 1}</td>
// // // //                   {/* <td>{file.originalName}
// // // //                     <br />
// // // //                     {file.dimensions
// // // //                       ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // // //                       : '-'}<br />
// // // //                     <button onClick={() => handleDownload(file._id)}>Download</button>
// // // //                   </td> */}
// // // //                   <td>
// // // //                     <a className='border border-bottom pointer' onClick={() => handleDownload(file._id)}>
// // // //                       {file.originalName}
// // // //                       <br />
// // // //                       {file.dimensions
// // // //                         ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // // //                         : '-'}<br />
// // // //                       {/* <button onClick={() => handleDownload(file._id)}>Download</button> */}
// // // //                       {/* <button onClick={() => handleDownload(file._id, file.originalName)}>Download</button> */}
// // // //                     </a>
// // // //                   </td>
// // // //                   <td>
// // // //                     <select
// // // //                       className="form-select"
// // // //                       value={fileOptions[file._id]?.technology || ''}
// // // //                       onChange={(e) =>
// // // //                         handleOptionChange(file._id, 'technology', e.target.value)
// // // //                       }
// // // //                     >
// // // //                       {Object.keys(optionsData.technologyOptions).map((technology) => (
// // // //                         <option key={technology} value={technology}>
// // // //                           {technology}
// // // //                         </option>
// // // //                       ))}
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <select
// // // //                       className="form-select"
// // // //                       value={fileOptions[file._id]?.material || ''}
// // // //                       onChange={(e) =>
// // // //                         handleOptionChange(file._id, 'material', e.target.value)
// // // //                       }
// // // //                     >
// // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material.map(
// // // //                         (material) => (
// // // //                           <option key={material} value={material}>
// // // //                             {material}
// // // //                           </option>
// // // //                         )
// // // //                       )}
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <select
// // // //                       className="form-select"
// // // //                       value={fileOptions[file._id]?.color || ''}
// // // //                       onChange={(e) =>
// // // //                         handleOptionChange(file._id, 'color', e.target.value)
// // // //                       }
// // // //                     >
// // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color.map(
// // // //                         (color) => (
// // // //                           <option key={color} value={color}>
// // // //                             {color}
// // // //                           </option>
// // // //                         )
// // // //                       )}
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <select
// // // //                       className="form-select"
// // // //                       value={fileOptions[file._id]?.quality || ''}
// // // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // // //                     >
// // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality.map(
// // // //                         (quality) => (
// // // //                           <option key={quality} value={quality}>
// // // //                             {quality}
// // // //                           </option>
// // // //                         )
// // // //                       )}
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <select
// // // //                       className="form-select"
// // // //                       value={fileOptions[file._id]?.density || ''}
// // // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // // //                     >
// // // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density.map(
// // // //                         (density) => (
// // // //                           <option key={density} value={density}>
// // // //                             {density}
// // // //                           </option>
// // // //                         )
// // // //                       )}
// // // //                     </select>
// // // //                   </td>
// // // //                   <td>
// // // //                     <input
// // // //                       type="number"
// // // //                       className="form-control"
// // // //                       value={fileOptions[file._id]?.quantity || 0}
// // // //                       onChange={(e) => handleOptionChange(file._id, 'quantity', parseInt(e.target.value, 10) || 0)}
// // // //                       min="0"
// // // //                     />
// // // //                   </td>
// // // //                   <td> {file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : '-'}</td>
// // // //                   <td>
// // // //                     {calculatePrice(
// // // //                       fileOptions[file._id]?.material,
// // // //                       fileOptions[file._id]?.density,
// // // //                       fileOptions[file._id]?.quality,
// // // //                       file.buildVolume
// // // //                     )}
// // // //                   </td>
// // // //                   <td>
// // // //                     <input
// // // //                       type="number"
// // // //                       className="form-control"
// // // //                       value={fileOptions[file._id]?.customPrice || 0}
// // // //                       onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// // // //                       min="0"
// // // //                     />
// // // //                   </td>
// // // //                   <td>
// // // //                     {calculateItemTotal(
// // // //                       fileOptions[file._id]?.material,
// // // //                       fileOptions[file._id]?.density,
// // // //                       fileOptions[file._id]?.quality,
// // // //                       file.buildVolume,
// // // //                       fileOptions[file._id]?.quantity,
// // // //                       fileOptions[file._id]?.customPrice
// // // //                     )}
// // // //                   </td>
// // // //                 </tr>
// // // //               ))}
// // // //             </tbody>
// // // //           </table>
// // // //           <div className='row'>
// // // //             <div className='col-md-2 text-start'>
// // // //               <button className="btn btn-primary" onClick={handleSubmitOrder}>
// // // //                 Save Order
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default OrderDetails;
// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { io } from 'socket.io-client';

// // // const socket = io('http://localhost:3001');

// // // const OrderDetails = () => {
// // //   const { orderId } = useParams();
// // //   const [order, setOrder] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [optionsData, setOptionsData] = useState({
// // //     technologyOptions: {},
// // //     materialCosts: {},
// // //     densityCosts: {},
// // //     qualityCosts: {},
// // //   });
// // //   const [fileOptions, setFileOptions] = useState({});
// // //   const [customPrices, setCustomPrices] = useState({});
// // //   const [customShippingPrice, setCustomShippingPrice] = useState(0);

// // //   useEffect(() => {
// // //     fetchOrderDetails();
// // //     fetchOptionsData();

// // //     socket.on('orderUpdated', ({ orderId: updatedOrderId, updatedOrder }) => {
// // //       if (updatedOrderId === orderId) {
// // //         setOrder(updatedOrder);
// // //         initializeFileOptions(updatedOrder);
// // //       }
// // //     });

// // //     return () => {
// // //       socket.off('orderUpdated');
// // //     };
// // //   }, []);

// // //   const fetchOrderDetails = async () => {
// // //     try {
// // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`);
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }
// // //       const data = await response.json();
// // //       setOrder(data);
// // //       initializeFileOptions(data);
// // //     } catch (error) {
// // //       setError(error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchOptionsData = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:3001/options');
// // //       const data = await response.json();
// // //       setOptionsData(data);
// // //     } catch (error) {
// // //       console.error('Error fetching options data:', error);
// // //     }
// // //   };

// // //   const initializeFileOptions = (orderData) => {
// // //     const initialFileOptions = {};
// // //     const initialCustomPrices = {};

// // //     orderData.files.forEach((file) => {
// // //       initialFileOptions[file._id] = {
// // //         technology: file.options?.technology || 'FDM/FFF',
// // //         material: file.options?.material || 'PLA',
// // //         color: file.options?.color || '',
// // //         quality: file.options?.quality || 'Draft',
// // //         density: file.options?.density || '20%',
// // //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// // //         customPrice: file.customPrice || 0,
// // //       };

// // //       initialCustomPrices[file._id] = file.customPrice || 0;
// // //     });

// // //     setFileOptions(initialFileOptions);
// // //     setCustomPrices(initialCustomPrices);
// // //   };

// // //   const updateAllItemTotals = () => {
// // //     setFileOptions((prevState) => {
// // //       const updatedFileOptions = { ...prevState };
// // //       order.files.forEach((file) => {
// // //         updatedFileOptions[file._id] = {
// // //           ...updatedFileOptions[file._id],
// // //           itemTotal: calculateItemTotal(
// // //             updatedFileOptions[file._id]?.material || 'PLA',
// // //             updatedFileOptions[file._id]?.density || '20%',
// // //             updatedFileOptions[file._id]?.quality || 'Draft',
// // //             file.buildVolume,
// // //             updatedFileOptions[file._id]?.quantity || 0,
// // //             customPrices[file._id] || 0
// // //           ),
// // //         };
// // //       });
// // //       return updatedFileOptions;
// // //     });
// // //   };

// // //   const handleOptionChange = (fileId, optionType, value) => {
// // //     setFileOptions((prevState) => {
// // //       const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // //       if (optionType === 'technology') {
// // //         const newTechnologyOptions = optionsData.technologyOptions[value];
// // //         updatedOptions.material = newTechnologyOptions.material[0] || '';
// // //         updatedOptions.color = newTechnologyOptions.color[0] || '';
// // //         updatedOptions.quality = newTechnologyOptions.quality[0] || '';
// // //         updatedOptions.density = newTechnologyOptions.density[0] || '';
// // //       }

// // //       return { ...prevState, [fileId]: updatedOptions };
// // //     });
// // //     updateAllItemTotals(); // Recalculate all item totals
// // //   };

// // //   const handleCustomPriceChange = (fileId, value) => {
// // //     setCustomPrices((prevState) => ({
// // //       ...prevState,
// // //       [fileId]: parseFloat(value) || 0, // Ensure custom price is parsed as float
// // //     }));
// // //     updateAllItemTotals(); // Recalculate all item totals

// // //     // Update itemTotal when custom price changes
// // //     setFileOptions((prevState) => ({
// // //       ...prevState,
// // //       [fileId]: {
// // //         ...prevState[fileId],
// // //         customPrice: parseFloat(value) || 0,
// // //         itemTotal: calculateItemTotal(
// // //           prevState[fileId]?.material || 'PLA',
// // //           prevState[fileId]?.density || '20%',
// // //           prevState[fileId]?.quality || 'Draft',
// // //           order.files.find((file) => file._id === fileId).buildVolume,
// // //           prevState[fileId]?.quantity || 1,
// // //           parseFloat(value) || 0 // Pass new custom price to calculateItemTotal
// // //         ),
// // //       },
// // //     }));
// // //   };

// // //   const handleSubmitOrder = async () => {
// // //     try {
// // //       const updatedFiles = order.files.map((file) => ({
// // //         ...file,
// // //         options: fileOptions[file._id],
// // //         customPrice: customPrices[file._id], // Ensure custom price is sent to the server
// // //         price: calculatePrice(
// // //           fileOptions[file._id]?.material || 'PLA',
// // //           fileOptions[file._id]?.density || '20%',
// // //           fileOptions[file._id]?.quality || 'Draft',
// // //           file.buildVolume
// // //         ),
// // //         itemTotal: calculateItemTotal(
// // //           fileOptions[file._id]?.material,
// // //           fileOptions[file._id]?.density,
// // //           fileOptions[file._id]?.quality,
// // //           file.buildVolume,
// // //           fileOptions[file._id]?.quantity,
// // //           fileOptions[file._id]?.customPrice
// // //         )
// // //       }));

// // //       const updatedOrder = {
// // //         ...order,
// // //         files: updatedFiles,
// // //         subtotal,
// // //         gst,
// // //         shippingCharges: customShippingPrice || shippingCharges,
// // //         total,
// // //       };

// // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(updatedOrder),
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         console.log('Order updated successfully');
// // //         setOrder(data); // Update the order in the state with the response data
// // //       } else {
// // //         console.error('Error updating order');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating order:', error);
// // //     }
// // //   };

// // //   const calculatePrice = (material, density, quality, buildVolume) => {
// // //     const materialCost = optionsData.materialCosts[material] || 0;
// // //     const densityCost = optionsData.densityCosts[density] || 0;
// // //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// // //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // //     return Math.round(totalPrice);
// // //   };

// // //   const calculateItemTotal = (
// // //     material,
// // //     density,
// // //     quality,
// // //     buildVolume,
// // //     quantity,
// // //     customPrice = 0
// // //   ) => {
// // //     const materialCost = optionsData.materialCosts[material] || 0;
// // //     const densityCost = optionsData.densityCosts[density] || 0;
// // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // //     if (customPrice !== 0) {
// // //       return Math.round(customPrice * (quantity || 0)); // Use 0 if quantity is 0
// // //     } else {
// // //       const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // //       return Math.round(totalPrice * (quantity || 0)); // Use 0 if quantity is 0
// // //     }
// // //   };

// // //   const calculateSubtotal = () => {
// // //     return order.files.reduce((acc, file) => {
// // //       const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // //       const fileTotal =
// // //         quantity > 0
// // //           ? calculateItemTotal(
// // //             fileOptions[file._id]?.material || 'PLA',
// // //             fileOptions[file._id]?.density || '20%',
// // //             fileOptions[file._id]?.quality || 'Draft',
// // //             file.buildVolume,
// // //             quantity,
// // //             customPrices[file._id] || 0
// // //           )
// // //           : 0; // Skip adding to subtotal if quantity is 0
// // //       return acc + fileTotal;
// // //     }, 0);
// // //   };

// // //   const calculateGST = (subtotal) => {
// // //     return Math.round(subtotal * 0.18);
// // //   };

// // //   const calculateTotal = (subtotal, gst, shippingCharges) => {
// // //     const effectiveShippingCharges = customShippingPrice !== 0 ? customShippingPrice : shippingCharges;
// // //     return subtotal + gst + effectiveShippingCharges;
// // //   };

// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>Error: {error}</div>;
// // //   }

// // //   if (!order) {
// // //     return <div>No order found</div>;
// // //   }

// // //   const subtotal = calculateSubtotal();
// // //   const gst = calculateGST(subtotal);
// // //   const shippingCharges = order.shippingCharges || 0;
// // //   const total = calculateTotal(subtotal, gst, shippingCharges);

// // //   const handleDownloadAll = async (orderId) => {
// // //     try {
// // //       const url = `http://localhost:3001/download/order/${orderId}`;
// // //       window.location.href = url;
// // //     } catch (error) {
// // //       console.error('Error downloading ZIP file:', error);
// // //     }
// // //   };

// // //   return (
// // //     <div className="container mt-5">
// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h3>
// // //             Order Details <small className="text-muted">Order ID: {order.orderId}</small>
// // //           </h3>
// // //           <p> <span className='mx-5'>subtotal:{subtotal}</span><span className='mx-5'>Total:{total}</span>
// // //             <span className='mx-5'>GST:{gst}</span> <span className='mx-5'>S.Chrg:{shippingCharges}</span>
// // //             <button className="btn btn-primary mx-5" onClick={() => handleDownloadAll(orderId)}>Download All Files</button>
// // //           </p>
// // //         </div>
// // //         <div className="mb-3 m-5 col-md-2">
// // //           <label htmlFor="customShippingPrice" className="fw-bold form-label">Custom Shipping Price</label>
// // //           <input
// // //             type="number"
// // //             id="customShippingPrice"
// // //             className="form-control"
// // //             value={customShippingPrice}
// // //             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// // //           />
// // //         </div>
// // //         <div className="card-body">
// // //           <table className="table table-striped">
// // //             <thead>
// // //               <tr>
// // //                 <th className='col-md-1'>Serial No.</th>
// // //                 <th className='col-md-1'>File Name</th>
// // //                 <th className='col-md-1'>Technology</th>
// // //                 <th className='col-md-1'>Material</th>
// // //                 <th className='col-md-1'>Color</th>
// // //                 <th className='col-md-1'>Quality</th>
// // //                 <th className='col-md-1'>Density</th>
// // //                 <th className='col-md-1'>Quantity</th>
// // //                 <th className='col-md-1'>Volume</th>
// // //                 <th className='col-md-1'>Price</th>
// // //                 <th className='col-md-1'>Custom Price</th>
// // //                 <th className='col-md-1'>Total</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {order.files.map((file, index) => (
// // //                 <tr key={file._id}>
// // //                   <td>{index + 1}</td>
// // //                   <td>
// // //                     <a className='border border-bottom pointer' onClick={() => handleDownload(file._id)}>
// // //                       {file.originalName}
// // //                       <br />
// // //                       {file.dimensions
// // //                         ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // //                         : '-'}<br />
// // //                     </a>
// // //                   </td>
// // //                   <td>
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.technology || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'technology', e.target.value)
// // //                       }
// // //                     >
// // //                       {Object.keys(optionsData.technologyOptions).map((technology) => (
// // //                         <option key={technology} value={technology}>
// // //                           {technology}
// // //                         </option>
// // //                       ))}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.material || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'material', e.target.value)
// // //                       }
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material.map(
// // //                         (material) => (
// // //                           <option key={material} value={material}>
// // //                             {material}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.color || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'color', e.target.value)
// // //                       }
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color.map(
// // //                         (color) => (
// // //                           <option key={color} value={color}>
// // //                             {color}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.quality || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality.map(
// // //                         (quality) => (
// // //                           <option key={quality} value={quality}>
// // //                             {quality}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.density || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density.map(
// // //                         (density) => (
// // //                           <option key={density} value={density}>
// // //                             {density}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <input
// // //                       type="number"
// // //                       className="form-control"
// // //                       value={fileOptions[file._id]?.quantity || 0}
// // //                       onChange={(e) => handleOptionChange(file._id, 'quantity', parseInt(e.target.value, 10) || 0)}
// // //                       min="0"
// // //                     />
// // //                   </td>
// // //                   <td> {file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : '-'}</td>
// // //                   <td>
// // //                     {calculatePrice(
// // //                       fileOptions[file._id]?.material,
// // //                       fileOptions[file._id]?.density,
// // //                       fileOptions[file._id]?.quality,
// // //                       file.buildVolume
// // //                     )}
// // //                   </td>
// // //                   <td>
// // //                     <input
// // //                       type="number"
// // //                       className="form-control"
// // //                       value={fileOptions[file._id]?.customPrice || 0}
// // //                       onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// // //                       min="0"
// // //                     />
// // //                   </td>
// // //                   <td>
// // //                     {calculateItemTotal(
// // //                       fileOptions[file._id]?.material,
// // //                       fileOptions[file._id]?.density,
// // //                       fileOptions[file._id]?.quality,
// // //                       file.buildVolume,
// // //                       fileOptions[file._id]?.quantity,
// // //                       fileOptions[file._id]?.customPrice
// // //                     )}
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //           <div className='row'>
// // //             <div className='col-md-2 text-start'>
// // //               <button className="btn btn-primary" onClick={handleSubmitOrder}>
// // //                 Save Order
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OrderDetails;

// // // import React, { useEffect, useState } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { io } from 'socket.io-client';

// // // const socket = io('http://localhost:3001');

// // // const OrderDetails = () => {
// // //   const { orderId } = useParams();
// // //   const [order, setOrder] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [optionsData, setOptionsData] = useState({
// // //     technologyOptions: {},
// // //     materialCosts: {},
// // //     densityCosts: {},
// // //     qualityCosts: {},
// // //   });
// // //   const [fileOptions, setFileOptions] = useState({});
// // //   const [customPrices, setCustomPrices] = useState({});
// // //   const [customShippingPrice, setCustomShippingPrice] = useState(0);
// // //   const [customLeadTime, setCustomLeadTime] = useState(0);
// // //   const [showSuccessAlert, setShowSuccessAlert] = useState(false); // State for success alert
// // //   const [couponDiscount, setCouponDiscount] = useState(0); // State for coupon discount

// // //   useEffect(() => {
// // //     fetchOrderDetails();
// // //     fetchOptionsData();

// // //     socket.on('orderUpdated', ({ orderId: updatedOrderId, updatedOrder }) => {
// // //       if (updatedOrderId === orderId) {
// // //         setOrder(updatedOrder);
// // //         initializeFileOptions(updatedOrder);
// // //       }
// // //     });

// // //     return () => {
// // //       socket.off('orderUpdated');
// // //     };
// // //   }, []);

// // //   const fetchOrderDetails = async () => {
// // //     try {
// // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`);
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }
// // //       const data = await response.json();
// // //       setOrder(data);
// // //       initializeFileOptions(data);
// // //       setCouponDiscount(data.couponDiscount || 0); // Set coupon discount from order data
// // //     } catch (error) {
// // //       setError(error.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // const fetchOptionsData = async () => {
// // //   //   try {
// // //   //     const response = await fetch('http://localhost:3001/options');
// // //   //     const data = await response.json();
// // //   //     setOptionsData(data);
// // //   //   } catch (error) {
// // //   //     console.error('Error fetching options data:', error);
// // //   //   }
// // //   // };

// // //   const fetchOptionsData = async () => {
// // //     try {
// // //       const response = await fetch('http://localhost:3001/options');
// // //       const data = await response.json();
// // //       setOptionsData(data); // Set the fetched options data
// // //       console.log('Fetched options data:', data); // Debug log
// // //     } catch (error) {
// // //       console.error('Error fetching options data:', error);
// // //     }
// // //   };

// // //   const initializeFileOptions = (orderData) => {
// // //     const initialFileOptions = {};
// // //     const initialCustomPrices = {};

// // //     orderData.files.forEach((file) => {
// // //       initialFileOptions[file._id] = {
// // //         technology: file.options?.technology || 'FDM/FFF',
// // //         material: file.options?.material || 'PLA',
// // //         color: file.options?.color || '',
// // //         quality: file.options?.quality || 'Draft',
// // //         density: file.options?.density || '20%',
// // //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// // //         customPrice: file.customPrice || 0,
// // //       };

// // //       initialCustomPrices[file._id] = file.customPrice || 0;
// // //     });

// // //     setFileOptions(initialFileOptions);
// // //     setCustomPrices(initialCustomPrices);
// // //   };

// // //   const updateAllItemTotals = () => {
// // //     setFileOptions((prevState) => {
// // //       const updatedFileOptions = { ...prevState };
// // //       order.files.forEach((file) => {
// // //         updatedFileOptions[file._id] = {
// // //           ...updatedFileOptions[file._id],
// // //           itemTotal: calculateItemTotal(
// // //             updatedFileOptions[file._id]?.material || 'PLA',
// // //             updatedFileOptions[file._id]?.density || '20%',
// // //             updatedFileOptions[file._id]?.quality || 'Draft',
// // //             file.buildVolume,
// // //             updatedFileOptions[file._id]?.quantity || 0,
// // //             customPrices[file._id] || 0
// // //           ),
// // //         };
// // //       });
// // //       return updatedFileOptions;
// // //     });
// // //   };

// // //   // const handleOptionChange = (fileId, optionType, value) => {
// // //   //   setFileOptions((prevState) => {
// // //   //     const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // //   //     if (optionType === 'technology') {
// // //   //       const newTechnologyOptions = optionsData.technologyOptions[value];
// // //   //       updatedOptions.material = newTechnologyOptions.material[0] || '';
// // //   //       updatedOptions.color = newTechnologyOptions.color[0] || '';
// // //   //       updatedOptions.quality = newTechnologyOptions.quality[0] || '';
// // //   //       updatedOptions.density = newTechnologyOptions.density[0] || '';
// // //   //     }

// // //   //     return { ...prevState, [fileId]: updatedOptions };
// // //   //   });
// // //   //   updateAllItemTotals(); // Recalculate all item totals
// // //   // };

// // //   const handleOptionChange = (fileId, optionType, value) => {
// // //     setFileOptions((prevState) => {
// // //       const updatedOptions = { ...prevState[fileId], [optionType]: value };

// // //       if (optionType === 'technology' && optionsData.technologyOptions[value]) {
// // //         const newTechnologyOptions = optionsData.technologyOptions[value];
// // //         updatedOptions.material = newTechnologyOptions.material?.[0]?.name || '';
// // //         updatedOptions.color = newTechnologyOptions.color?.[0]?.name || '';
// // //         updatedOptions.quality = newTechnologyOptions.quality?.[0]?.name || '';
// // //         updatedOptions.density = newTechnologyOptions.density?.[0]?.name || '';
// // //       }

// // //       return { ...prevState, [fileId]: updatedOptions };
// // //     });
// // //     updateAllItemTotals(); // Recalculate all item totals
// // //   };

// // //   const renderOptions = (options) => {
// // //     return options
// // //       .filter((option) => option.enabled) // Only include enabled options
// // //       .map((option) => (
// // //         <option key={option.name} value={option.name}>
// // //           {option.name}
// // //         </option>
// // //       ));
// // //   };

// // //   const handleCustomPriceChange = (fileId, value) => {
// // //     setCustomPrices((prevState) => ({
// // //       ...prevState,
// // //       [fileId]: parseFloat(value) || 0, // Ensure custom price is parsed as float
// // //     }));
// // //     updateAllItemTotals(); // Recalculate all item totals

// // //     // Update itemTotal when custom price changes
// // //     setFileOptions((prevState) => ({
// // //       ...prevState,
// // //       [fileId]: {
// // //         ...prevState[fileId],
// // //         customPrice: parseFloat(value) || 0,
// // //         itemTotal: calculateItemTotal(
// // //           prevState[fileId]?.material || 'PLA',
// // //           prevState[fileId]?.density || '20%',
// // //           prevState[fileId]?.quality || 'Draft',
// // //           order.files.find((file) => file._id === fileId).buildVolume,
// // //           prevState[fileId]?.quantity || 1,
// // //           parseFloat(value) || 0 // Pass new custom price to calculateItemTotal
// // //         ),
// // //       },
// // //     }));
// // //   };

// // //   const handleSubmitOrder = async () => {
// // //     try {
// // //       const updatedFiles = order.files.map((file) => ({
// // //         ...file,
// // //         options: fileOptions[file._id],
// // //         customPrice: customPrices[file._id], // Ensure custom price is sent to the server
// // //         price: calculatePrice(
// // //           fileOptions[file._id]?.material || 'PLA',
// // //           fileOptions[file._id]?.density || '20%',
// // //           fileOptions[file._id]?.quality || 'Draft',
// // //           file.buildVolume
// // //         ),
// // //         itemTotal: calculateItemTotal(
// // //           fileOptions[file._id]?.material,
// // //           fileOptions[file._id]?.density,
// // //           fileOptions[file._id]?.quality,
// // //           file.buildVolume,
// // //           fileOptions[file._id]?.quantity,
// // //           fileOptions[file._id]?.customPrice
// // //         )
// // //       }));

// // //       const updatedOrder = {
// // //         ...order,
// // //         files: updatedFiles,
// // //         subtotal,
// // //         gst,
// // //         shippingCharges: customShippingPrice || shippingCharges,
// // //         total,
// // //         leadTime: customLeadTime || leadTime, // Use customLeadTime if not 0
// // //         couponDiscount, // Include coupon discount in the updated order
// // //       };

// // //       const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
// // //         method: 'PUT',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify(updatedOrder),
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         console.log('Order updated successfully');
// // //         setOrder(data); // Update the order in the state with the response data
// // //         setShowSuccessAlert(true); // Show success alert
// // //         setTimeout(() => setShowSuccessAlert(false), 3000); // Hide alert after 3 seconds
// // //       } else {
// // //         console.error('Error updating order');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error updating order:', error);
// // //     }
// // //   };

// // //   // const calculatePrice = (material, density, quality, buildVolume) => {
// // //   //   const materialCost = optionsData.materialCosts[material] || 0;
// // //   //   const densityCost = optionsData.densityCosts[density] || 0;
// // //   //   const qualityCost = optionsData.qualityCosts[quality] || 0;
// // //   //   const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // //   //   return Math.round(totalPrice);
// // //   // };

// // //   const calculatePrice = (material, density, quality, buildVolume) => {
// // //     console.log('Calculating price with:', { material, density, quality, buildVolume });

// // //     const materialCost = optionsData.materialCosts[material] || 0;
// // //     const densityCost = optionsData.densityCosts[density] || 0;
// // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // //     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// // //     return Math.round(totalPrice);
// // //   };

// // //   // const calculateItemTotal = (
// // //   //   material,
// // //   //   density,
// // //   //   quality,
// // //   //   buildVolume,
// // //   //   quantity,
// // //   //   customPrice = 0
// // //   // ) => {
// // //   //   const materialCost = optionsData.materialCosts[material] || 0;
// // //   //   const densityCost = optionsData.densityCosts[density] || 0;
// // //   //   const qualityCost = optionsData.qualityCosts[quality] || 0;

// // //   //   if (customPrice !== 0) {
// // //   //     return Math.round(customPrice * (quantity || 0)); // Use 0 if quantity is 0
// // //   //   } else {
// // //   //     const totalPrice = (materialCost + densityCost + qualityCost) * buildVolume;
// // //   //     return Math.round(totalPrice * (quantity || 0)); // Use 0 if quantity is 0
// // //   //   }
// // //   // };

// // //   const calculateItemTotal = (material, density, quality, buildVolume, quantity, customPrice = 0) => {
// // //     const materialCost = optionsData.materialCosts[material] || 0;
// // //     const densityCost = optionsData.densityCosts[density] || 0;
// // //     const qualityCost = optionsData.qualityCosts[quality] || 0;

// // //     if (customPrice !== 0) {
// // //       return Math.round(customPrice * (quantity || 0)); // Use custom price if provided
// // //     } else {
// // //       const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// // //       return Math.round(totalPrice * (quantity || 0)); // Use calculated price otherwise
// // //     }
// // //   };

// // //   // const calculateSubtotal = () => {
// // //   //   return order.files.reduce((acc, file) => {
// // //   //     const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // //   //     const fileTotal =
// // //   //       quantity > 0
// // //   //         ? calculateItemTotal(
// // //   //           fileOptions[file._id]?.material || 'PLA',
// // //   //           fileOptions[file._id]?.density || '20%',
// // //   //           fileOptions[file._id]?.quality || 'Draft',
// // //   //           file.buildVolume,
// // //   //           quantity,
// // //   //           customPrices[file._id] || 0
// // //   //         )
// // //   //         : 0; // Skip adding to subtotal if quantity is 0
// // //   //     return acc + fileTotal;
// // //   //   }, 0);
// // //   // };

// // //   const calculateSubtotal = () => {
// // //     return order.files.reduce((acc, file) => {
// // //       const quantity = fileOptions[file._id]?.quantity ?? 1; // Use 0 if explicitly set
// // //       const fileTotal =
// // //         quantity > 0
// // //           ? calculateItemTotal(
// // //             fileOptions[file._id]?.material || 'PLA',
// // //             fileOptions[file._id]?.density || '20%',
// // //             fileOptions[file._id]?.quality || 'Draft',
// // //             file.buildVolume,
// // //             quantity,
// // //             customPrices[file._id] || 0
// // //           )
// // //           : 0; // Skip adding to subtotal if quantity is 0
// // //       return acc + fileTotal;
// // //     }, 0);
// // //   };

// // //   const calculateGST = (subtotal) => {
// // //     return Math.round(subtotal * 0.18);
// // //   };

// // //   // const calculateTotal = (subtotal, gst, shippingCharges) => {
// // //   //   const effectiveShippingCharges = customShippingPrice !== 0 ? customShippingPrice : shippingCharges;
// // //   //   return subtotal + gst + effectiveShippingCharges;
// // //   // };

// // //   const calculateTotal = (subtotal, gst, shippingCharges) => {
// // //     const effectiveShippingCharges = customShippingPrice !== 0 ? customShippingPrice : shippingCharges;
// // //     const discountAmount = (subtotal * couponDiscount) / 100; // Calculate discount
// // //     return subtotal - discountAmount + gst + effectiveShippingCharges;
// // //   };

// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>Error: {error}</div>;
// // //   }

// // //   if (!order) {
// // //     return <div>No order found</div>;
// // //   }

// // //   const subtotal = calculateSubtotal();
// // //   const gst = calculateGST(subtotal);
// // //   const shippingCharges = order.shippingCharges || 0;
// // //   const total = calculateTotal(subtotal, gst, shippingCharges); const leadTime = order.leadTime || 0;


// // //   // const handleDeleteFile = async (orderId, fileId, fileName) => {
// // //   //   try {
// // //   //     const response = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
// // //   //       method: 'DELETE',
// // //   //       headers: {
// // //   //         'Content-Type': 'application/json',
// // //   //       },
// // //   //       body: JSON.stringify({ fileName }), // Send the file name to delete from S3
// // //   //     });

// // //   //     if (response.ok) {
// // //   //       console.log('File deleted successfully');
// // //   //       // Refresh the order details after deletion
// // //   //       fetchOrderDetails();
// // //   //     } else {
// // //   //       console.error('Error deleting file');
// // //   //     }
// // //   //   } catch (error) {
// // //   //     console.error('Error deleting file:', error);
// // //   //   }
// // //   // };

// // //   const handleDeleteFile = async (orderId, fileId, fileName) => {
// // //     try {
// // //       const response = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
// // //         method: 'DELETE',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({ fileName }), // Send the file name to delete from S3
// // //       });

// // //       if (response.ok) {
// // //         console.log('File deleted successfully');
// // //         fetchOrderDetails(); // Refresh the order details
// // //       } else {
// // //         console.error('Error deleting file');
// // //       }
// // //     } catch (error) {
// // //       console.error('Error deleting file:', error);
// // //     }
// // //   };

// // //   const handleDownload = async (orderId, fileName) => {
// // //     try {
// // //       console.log(`Downloading file: ${fileName} from order: ${orderId}`); // Log the fileName and orderId
// // //       const response = await fetch(`http://localhost:3001/download/order/${orderId}/${fileName}`);
// // //       if (!response.ok) {
// // //         throw new Error("Failed to fetch download link");
// // //       }
// // //       window.location.href = response.url;
// // //     } catch (error) {
// // //       console.error('Error downloading file:', error);
// // //     }
// // //   };

// // //   const handleDownloadAll = async (orderId) => {
// // //     try {
// // //       console.log("Downloading ZIP for order:", orderId);
// // //       const response = await fetch(`http://localhost:3001/download/order/${orderId}`);

// // //       if (!response.ok) {
// // //         throw new Error("Failed to fetch ZIP file");
// // //       }

// // //       const blob = await response.blob();
// // //       const link = document.createElement("a");
// // //       link.href = window.URL.createObjectURL(blob);
// // //       link.download = `${orderId}.zip`;
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //     } catch (error) {
// // //       console.error("Error downloading ZIP:", error);
// // //     }
// // //   };



// // //   return (
// // //     <div className="container">
// // //       <h2 className="text-center">Order Details</h2>
// // //       {showSuccessAlert && (
// // //         <div className="alert alert-success text-center" role="alert">
// // //           Order updated successfully!
// // //         </div>
// // //       )}
// // //       <div className="card">
// // //         <div className="card-header">
// // //           <h3>
// // //             <small className="text-muted">Order ID: {order.orderId}</small>
// // //           </h3>
// // //           <p>
// // //             <span className=''><strong>Subtotal:</strong> {subtotal}</span>
// // //             <span className='mx-4'><strong>Total:</strong> {total}</span>
// // //             <span className='mx-4'><strong>GST:</strong> {gst}</span>
// // //             <span className="mx-4"><strong>Discount:</strong> {couponDiscount}%</span>
// // //             <span className='mx-4'><strong>Lead Time:</strong> {`${leadTime} Days`}</span>
// // //             <span className='mx-4'><strong>Shipp Chrg:</strong> {shippingCharges}</span>
// // //             <button className="btn btn-primary mx-4" onClick={() => handleDownloadAll(orderId)}>Download All Files</button>
// // //           </p>
// // //         </div>
// // //         <div className='row'>
// // //           <div className="mb-3 m-5 col-md-2">
// // //             <label htmlFor="customShippingPrice" className="fw-bold form-label">Custom Shipping Price</label>
// // //             <input
// // //               type="number"
// // //               id="customShippingPrice"
// // //               className="form-control"
// // //               value={customShippingPrice}
// // //               onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// // //             />
// // //           </div>
// // //           {/* <div className="mb-3 m-5 col-md-2">
// // //           <label htmlFor="customLeadTime" className="fw-bold form-label">Custom Lead Time (Days)</label>
// // //           <input
// // //             type="number"
// // //             id="customLeadTime"
// // //             className="form-control"
// // //             value={customLeadTime}
// // //             onChange={(e) => setCustomLeadTime(parseInt(e.target.value) || 0)}
// // //           />
// // //         </div> */}
// // //           <div className="mb-3 m-5 col-md-2">
// // //             <label htmlFor="customLeadTime" className="fw-bold form-label">Custom Lead Time</label>
// // //             <div className="input-group">
// // //               <input
// // //                 type="number"
// // //                 id="customLeadTime"
// // //                 className="form-control"
// // //                 value={customLeadTime}
// // //                 onChange={(e) => setCustomLeadTime(parseInt(e.target.value, 10) || 0)}
// // //                 min="0"
// // //               />
// // //               <span className="input-group-text">Days</span>
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div className="card-body">
// // //           <table className="table table-striped">
// // //             <thead>
// // //               <tr>
// // //                 <th className='col-md-1'>Serial No.</th>
// // //                 <th className='col-md-1'>File Name</th>
// // //                 <th className='col-md-1'>Technology</th>
// // //                 <th className='col-md-1'>Material</th>
// // //                 <th className='col-md-1'>Color</th>
// // //                 <th className='col-md-1'>Quality</th>
// // //                 <th className='col-md-1'>Density</th>
// // //                 <th className='col-md-1'>Quantity</th>
// // //                 <th className='col-md-1'>Volume</th>
// // //                 <th className='col-md-1'>Price</th>
// // //                 <th className='col-md-1'>Custom Price</th>
// // //                 <th className='col-md-1'>Total</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {order.files.map((file, index) => (
// // //                 <tr key={file._id}>
// // //                   <td>{index + 1}</td>
// // //                   <td>
// // //                     <a className='border border-bottom pointer' onClick={() => handleDownload(orderId, file.name)}>
// // //                       {file.originalName}
// // //                       <br />
// // //                       {file.dimensions
// // //                         ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(file.dimensions.height)} mm`
// // //                         : '-'}<br />
// // //                     </a>
// // //                   </td>
// // //                   <td>
// // //                     {/* <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.technology || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'technology', e.target.value)
// // //                       }
// // //                     >
// // //                       {Object.keys(optionsData.technologyOptions).map((technology) => (
// // //                         <option key={technology} value={technology}>
// // //                           {technology}
// // //                         </option>
// // //                       ))}
// // //                     </select> */}
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.technology || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'technology', e.target.value)}
// // //                     >
// // //                       {renderOptions(
// // //                         Object.entries(optionsData.technologyOptions).map(([key, value]) => ({
// // //                           name: key,
// // //                           enabled: value.enabled,
// // //                         }))
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     {/* <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.material || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'material', e.target.value)
// // //                       }
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material.map(
// // //                         (material) => (
// // //                           <option key={material} value={material}>
// // //                             {material}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select> */}
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.material || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'material', e.target.value)}
// // //                     >
// // //                       {renderOptions(
// // //                         optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material || []
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     {/* <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.color || ''}
// // //                       onChange={(e) =>
// // //                         handleOptionChange(file._id, 'color', e.target.value)
// // //                       }
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color.map(
// // //                         (color) => (
// // //                           <option key={color} value={color}>
// // //                             {color}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select> */}
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.color || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'color', e.target.value)}
// // //                     >
// // //                       {renderOptions(
// // //                         optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color || []
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     {/* <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.quality || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality.map(
// // //                         (quality) => (
// // //                           <option key={quality} value={quality}>
// // //                             {quality}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select> */}
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.quality || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'quality', e.target.value)}
// // //                     >
// // //                       {renderOptions(
// // //                         optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality || []
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     {/* <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.density || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // //                     >
// // //                       {optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density.map(
// // //                         (density) => (
// // //                           <option key={density} value={density}>
// // //                             {density}
// // //                           </option>
// // //                         )
// // //                       )}
// // //                     </select> */}
// // //                     <select
// // //                       className="form-select"
// // //                       value={fileOptions[file._id]?.density || ''}
// // //                       onChange={(e) => handleOptionChange(file._id, 'density', e.target.value)}
// // //                     >
// // //                       {renderOptions(
// // //                         optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density || []
// // //                       )}
// // //                     </select>
// // //                   </td>
// // //                   <td>
// // //                     <input
// // //                       type="number"
// // //                       className="form-control"
// // //                       value={fileOptions[file._id]?.quantity || 0}
// // //                       onChange={(e) => handleOptionChange(file._id, 'quantity', parseInt(e.target.value, 10) || 0)}
// // //                       min="0"
// // //                     />
// // //                   </td>
// // //                   <td> {file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : '-'}</td>
// // //                   <td>
// // //                     {calculatePrice(
// // //                       fileOptions[file._id]?.material,
// // //                       fileOptions[file._id]?.density,
// // //                       fileOptions[file._id]?.quality,
// // //                       file.buildVolume
// // //                     )}
// // //                   </td>
// // //                   <td>
// // //                     <input
// // //                       type="number"
// // //                       className="form-control"
// // //                       value={fileOptions[file._id]?.customPrice || 0}
// // //                       onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// // //                       min="0"
// // //                     />
// // //                   </td>
// // //                   <td>
// // //                     {calculateItemTotal(
// // //                       fileOptions[file._id]?.material,
// // //                       fileOptions[file._id]?.density,
// // //                       fileOptions[file._id]?.quality,
// // //                       file.buildVolume,
// // //                       fileOptions[file._id]?.quantity,
// // //                       fileOptions[file._id]?.customPrice
// // //                     )}
// // //                   </td>
// // //                   <td>
// // //                     <button
// // //                       className="btn btn-danger"
// // //                       onClick={() => handleDeleteFile(orderId, file._id, file.name)}
// // //                     >
// // //                       Delete
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //           <div className='row'>
// // //             <div className='col-md-2 text-start'>
// // //               <button className="btn btn-primary" onClick={handleSubmitOrder}>
// // //                 Save Order
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default OrderDetails;

// // // src/pages/OrderDetails.jsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { io } from "socket.io-client";

// // const socket = io("http://localhost:3001");

// // // Dropdown options (tweak to your org)
// // const HANDLERS = ["Kailash", "Adhithiyan", "Support", "Ops"];
// // const PRINT_STATUSES = ["Not Started", "Print in Progress", "Paused", "Completed"];
// // const SHIPPING_STATUSES = ["Preparing for Ship", "Ready for Pickup", "Shipped", "Delivered", "Cancelled"];
// // const COURIER_SERVICES = ["To be updated", "DTDC", "Blue Dart", "Delhivery", "India Post", "Self/Local"];

// // /** Normalize your backend payload (based on the sample you shared) */
// // const normalizeOrder = (raw) => {
// //   const email =
// //     raw.email ||
// //     raw.billingDetails?.email ||
// //     raw.customerEmail ||
// //     "";

// //   const billing = {
// //     name: raw.billingDetails?.name || "",
// //     company: raw.billingDetails?.company || "",
// //     gstin: raw.billingDetails?.gstin || raw.billingDetails?.GSTIN || "",
// //     address:
// //       raw.billingDetails?.billingAddress ||
// //       raw.billingDetails?.address ||
// //       "",
// //     city: raw.billingDetails?.city || "",
// //     state: raw.billingDetails?.state || "",
// //     pincode: raw.billingDetails?.pin || raw.billingDetails?.pincode || "",
// //     contact:
// //       raw.billingDetails?.mobile ||
// //       raw.billingDetails?.phone ||
// //       raw.billingDetails?.contact ||
// //       "",
// //     email,
// //   };

// //   // If no dedicated shipping object exists, mirror billing (but prefer shippingAddress if present)
// //   const shipping = {
// //     name: raw.shippingDetails?.name || billing.name,
// //     company: raw.shippingDetails?.company || billing.company,
// //     address:
// //       raw.shippingDetails?.address ||
// //       raw.billingDetails?.shippingAddress ||
// //       billing.address,
// //     city: raw.shippingDetails?.city || billing.city,
// //     state: raw.shippingDetails?.state || billing.state,
// //     pincode:
// //       raw.shippingDetails?.pincode ||
// //       raw.shippingDetails?.pin ||
// //       billing.pincode,
// //     country: raw.shippingDetails?.country || "India",
// //     contact:
// //       raw.shippingDetails?.mobile ||
// //       raw.shippingDetails?.phone ||
// //       billing.contact,
// //     email: raw.shippingDetails?.email || email,
// //   };

// //   return {
// //     ...raw,
// //     email,
// //     billingDetails: billing,
// //     shippingDetails: shipping,
// //     leadTime: Number(raw.leadTime) || 0, // your payload had "3" (string)
// //     status: raw.status || "pending",
// //     shippingCharges: Number(raw.shippingCharges || 0),
// //     couponDiscount: Number(raw.couponDiscount || 0),
// //   };
// // };

// // const OrderDetails = () => {
// //   const { orderId } = useParams();

// //   const [order, setOrder] = useState(null);
// //   const [optionsData, setOptionsData] = useState({
// //     technologyOptions: {},
// //     materialCosts: {},
// //     densityCosts: {},
// //     qualityCosts: {},
// //   });

// //   const [fileOptions, setFileOptions] = useState({});
// //   const [customPrices, setCustomPrices] = useState({});
// //   const [customShippingPrice, setCustomShippingPrice] = useState(0);
// //   const [customLeadTime, setCustomLeadTime] = useState(0);
// //   const [couponDiscount, setCouponDiscount] = useState(0);

// //   const [email, setEmail] = useState("");

// //   // meta fields (left card)
// //   const [handledBy, setHandledBy] = useState("");
// //   const [printStatus, setPrintStatus] = useState("");
// //   const [shippingStatus, setShippingStatus] = useState("");
// //   const [trackingNumber, setTrackingNumber] = useState("");
// //   const [courierService, setCourierService] = useState("To be updated");

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

// //   useEffect(() => {
// //     fetchOrderDetails();
// //     fetchOptionsData();

// //     socket.on("orderUpdated", ({ orderId: updatedOrderId, updatedOrder }) => {
// //       if (String(updatedOrderId) === String(orderId)) {
// //         const data = normalizeOrder(updatedOrder);
// //         setOrder(data);
// //         initializeFileOptions(data);
// //         hydrateMetaFields(data);
// //       }
// //     });

// //     return () => socket.off("orderUpdated");
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [orderId]);

// //   const fetchOrderDetails = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/orders/${orderId}`);
// //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// //       const raw = await res.json();
// //       const data = normalizeOrder(raw);

// //       setOrder(data);
// //       initializeFileOptions(data);
// //       hydrateMetaFields(data);

// //       setCouponDiscount(data.couponDiscount || 0);
// //       setEmail(data.email || "");
// //     } catch (e) {
// //       setError(e.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const hydrateMetaFields = (data) => {
// //     setHandledBy(data.handledBy || HANDLERS[0]);
// //     setPrintStatus(data.printStatus || PRINT_STATUSES[0]);
// //     setShippingStatus(data.shippingStatus || SHIPPING_STATUSES[0]);
// //     setTrackingNumber(data.trackingNumber || "");
// //     setCourierService(data.courierService || "To be updated");
// //     setCustomShippingPrice(Number(data.shippingCharges || 0));
// //     setCustomLeadTime(Number(data.leadTime || 0));
// //   };

// //   const fetchOptionsData = async () => {
// //     try {
// //       const res = await fetch("http://localhost:3001/options");
// //       const data = await res.json();
// //       setOptionsData(data);
// //     } catch (e) {
// //       console.error("Error fetching options data:", e);
// //     }
// //   };

// //   const initializeFileOptions = (orderData) => {
// //     const initial = {};
// //     const initialCustom = {};
// //     orderData.files.forEach((file) => {
// //       initial[file._id] = {
// //         technology: file.options?.technology || "FDM/FFF",
// //         material: file.options?.material || "PLA",
// //         color: file.options?.color || "",
// //         quality: file.options?.quality || "Draft",
// //         density: file.options?.density || "20%",
// //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// //         customPrice: Number(file.customPrice || 0),
// //       };
// //       initialCustom[file._id] = Number(file.customPrice || 0);
// //     });
// //     setFileOptions(initial);
// //     setCustomPrices(initialCustom);
// //   };

// //   const updateAllItemTotals = () => {
// //     if (!order) return;
// //     setFileOptions((prev) => {
// //       const updated = { ...prev };
// //       order.files.forEach((file) => {
// //         updated[file._id] = {
// //           ...updated[file._id],
// //           itemTotal: calculateItemTotal(
// //             updated[file._id]?.material || "PLA",
// //             updated[file._id]?.density || "20%",
// //             updated[file._id]?.quality || "Draft",
// //             file.buildVolume,
// //             updated[file._id]?.quantity || 0,
// //             customPrices[file._id] || 0
// //           ),
// //         };
// //       });
// //       return updated;
// //     });
// //   };

// //   const handleOptionChange = (fileId, optionType, value) => {
// //     setFileOptions((prev) => {
// //       const updatedOptions = { ...prev[fileId], [optionType]: value };

// //       // When technology changes, reset child options to first enabled entry
// //       if (optionType === "technology" && optionsData.technologyOptions[value]) {
// //         const tech = optionsData.technologyOptions[value];
// //         updatedOptions.material = tech.material?.[0]?.name || "";
// //         updatedOptions.color = tech.color?.[0]?.name || "";
// //         updatedOptions.quality = tech.quality?.[0]?.name || "";
// //         updatedOptions.density = tech.density?.[0]?.name || "";
// //       }

// //       return { ...prev, [fileId]: updatedOptions };
// //     });
// //     updateAllItemTotals();
// //   };

// //   const renderOptions = (options) =>
// //     (options || [])
// //       .filter((o) => o.enabled)
// //       .map((o) => (
// //         <option key={o.name} value={o.name}>
// //           {o.name}
// //         </option>
// //       ));

// //   const handleCustomPriceChange = (fileId, value) => {
// //     const num = parseFloat(value) || 0;
// //     setCustomPrices((p) => ({ ...p, [fileId]: num }));
// //     updateAllItemTotals();
// //     if (!order) return;
// //     const file = order.files.find((f) => f._id === fileId);
// //     if (!file) return;

// //     setFileOptions((prev) => ({
// //       ...prev,
// //       [fileId]: {
// //         ...prev[fileId],
// //         customPrice: num,
// //         itemTotal: calculateItemTotal(
// //           prev[fileId]?.material || "PLA",
// //           prev[fileId]?.density || "20%",
// //           prev[fileId]?.quality || "Draft",
// //           file.buildVolume,
// //           prev[fileId]?.quantity || 1,
// //           num
// //         ),
// //       },
// //     }));
// //   };

// //   /** Price Calculation*/
// //   const calculatePrice = (material, density, quality, buildVolume) => {
// //     const materialCost = optionsData.materialCosts[material] || 0;
// //     const densityCost = optionsData.densityCosts[density] || 0;
// //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// //     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// //     return Math.round(totalPrice);
// //   };

// //   const calculateItemTotal = (material, density, quality, buildVolume, quantity, customPrice = 0) => {
// //     const materialCost = optionsData.materialCosts[material] || 0;
// //     const densityCost = optionsData.densityCosts[density] || 0;
// //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// //     if (customPrice !== 0) return Math.round(customPrice * (quantity || 0));
// //     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// //     return Math.round(totalPrice * (quantity || 0));
// //   };

// //   const subtotal = useMemo(() => {
// //     if (!order) return 0;
// //     return order.files.reduce((acc, file) => {
// //       const q = fileOptions[file._id]?.quantity ?? 1;
// //       const fileTotal =
// //         q > 0
// //           ? calculateItemTotal(
// //             fileOptions[file._id]?.material || "PLA",
// //             fileOptions[file._id]?.density || "20%",
// //             fileOptions[file._id]?.quality || "Draft",
// //             file.buildVolume,
// //             q,
// //             customPrices[file._id] || 0
// //           )
// //           : 0;
// //       return acc + fileTotal;
// //     }, 0);
// //   }, [order, fileOptions, customPrices]);

// //   const gst = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);

// //   const shippingCharges = useMemo(
// //     () => (customShippingPrice !== 0 ? customShippingPrice : order?.shippingCharges || 0),
// //     [customShippingPrice, order]
// //   );

// //   const total = useMemo(() => {
// //     const discountAmount = (subtotal * (couponDiscount || 0)) / 100;
// //     return Math.max(0, subtotal - discountAmount + gst + shippingCharges);
// //   }, [subtotal, gst, shippingCharges, couponDiscount]);

// //   const leadTime = useMemo(() => (customLeadTime || order?.leadTime || 0), [customLeadTime, order]);

// //   /** Save */
// //   const handleSubmitOrder = async () => {
// //     try {
// //       const updatedFiles = order.files.map((file) => ({
// //         ...file,
// //         options: fileOptions[file._id],
// //         customPrice: customPrices[file._id],
// //         price: calculatePrice(
// //           fileOptions[file._id]?.material || "PLA",
// //           fileOptions[file._id]?.density || "20%",
// //           fileOptions[file._id]?.quality || "Draft",
// //           file.buildVolume
// //         ),
// //         itemTotal: calculateItemTotal(
// //           fileOptions[file._id]?.material,
// //           fileOptions[file._id]?.density,
// //           fileOptions[file._id]?.quality,
// //           file.buildVolume,
// //           fileOptions[file._id]?.quantity,
// //           fileOptions[file._id]?.customPrice
// //         ),
// //       }));

// //       const payload = {
// //         ...order,
// //         // editable meta
// //         email,
// //         handledBy,
// //         printStatus,
// //         shippingStatus,
// //         trackingNumber,
// //         courierService,

// //         files: updatedFiles,
// //         subtotal,
// //         gst,
// //         shippingCharges,
// //         total,
// //         leadTime,
// //         couponDiscount,
// //         billingDetails: order.billingDetails,
// //         shippingDetails: order.shippingDetails,
// //       };

// //       const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!res.ok) throw new Error("Error updating order");
// //       const data = normalizeOrder(await res.json());
// //       setOrder(data);
// //       setShowSuccessAlert(true);
// //       setTimeout(() => setShowSuccessAlert(false), 2500);
// //     } catch (e) {
// //       console.error("Error updating order:", e);
// //       alert("Failed to save order. Check console for details.");
// //     }
// //   };

// //   /** File actions */
// //   const handleDeleteFile = async (orderId, fileId, fileName) => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
// //         method: "DELETE",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ fileName }),
// //       });
// //       if (!res.ok) throw new Error("Delete failed");
// //       await fetchOrderDetails();
// //     } catch (e) {
// //       console.error("Error deleting file:", e);
// //     }
// //   };

// //   const handleDownload = async (orderId, fileName) => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/download/order/${orderId}/${fileName}`);
// //       if (!response.ok) throw new Error("Failed to fetch download link");
// //       window.location.href = response.url;
// //     } catch (e) {
// //       console.error("Error downloading file:", e);
// //     }
// //   };

// //   const handleDownloadAll = async (orderId) => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/download/order/${orderId}`);
// //       if (!response.ok) throw new Error("Failed to fetch ZIP file");
// //       const blob = await response.blob();
// //       const link = document.createElement("a");
// //       link.href = window.URL.createObjectURL(blob);
// //       link.download = `${orderId}.zip`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     } catch (e) {
// //       console.error("Error downloading ZIP:", e);
// //     }
// //   };

// //   if (loading) return <div className="p-4">Loading...</div>;
// //   if (error) return <div className="p-4 text-danger">Error: {error}</div>;
// //   if (!order) return <div className="p-4">No order found</div>;

// //   const billing = order.billingDetails || {};
// //   const shipping = order.shippingDetails || {};

// //   return (
// //     <div className="container py-4">
// //       <h2 className="mb-3">Order Details</h2>

// //       {showSuccessAlert && (
// //         <div className="alert alert-success" role="alert">
// //           Order updated successfully!
// //         </div>
// //       )}

// //       {/* Top row: Order Id + Email + totals snapshot */}
// //       <div className="row g-3 align-items-end mb-3">
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Order Id</label>
// //           <input className="form-control" value={order.orderId || orderId} readOnly />
// //         </div>
// //         <div className="col-md-4">
// //           <label className="form-label fw-semibold">Email</label>
// //           <input
// //             className="form-control"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="customer@email.com"
// //           />
// //         </div>
// //         <div className="col-md-5 text-md-end">
// //           <div className="small text-muted">
// //             <div>
// //               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
// //               <strong>Discount:</strong> {couponDiscount}%
// //             </div>
// //             <div className="mt-1">
// //               <strong>Shipping:</strong> {shippingCharges} &nbsp;|&nbsp; <strong>Total:</strong> {total} &nbsp;|&nbsp;{" "}
// //               <strong>Lead Time:</strong> {leadTime} Days
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Meta + Billing + Shipping */}
// //       <div className="row g-3 mb-4">
// //         {/* Meta card */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Order meta</h6>

// //               <div className="mb-3">
// //                 <div className="form-text d-block mb-1">Created Date</div>
// //                 <div className="fw-medium">
// //                   {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
// //                 </div>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Handled By</label>
// //                 <select className="form-select" value={handledBy} onChange={(e) => setHandledBy(e.target.value)}>
// //                   {HANDLERS.map((h) => (
// //                     <option key={h}>{h}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Print Status</label>
// //                 <select className="form-select" value={printStatus} onChange={(e) => setPrintStatus(e.target.value)}>
// //                   {PRINT_STATUSES.map((s) => (
// //                     <option key={s}>{s}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Shipping Status</label>
// //                 <select
// //                   className="form-select"
// //                   value={shippingStatus}
// //                   onChange={(e) => setShippingStatus(e.target.value)}
// //                 >
// //                   {SHIPPING_STATUSES.map((s) => (
// //                     <option key={s}>{s}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Tracking Number</label>
// //                 <input
// //                   className="form-control"
// //                   value={trackingNumber}
// //                   onChange={(e) => setTrackingNumber(e.target.value)}
// //                   placeholder="To be updated"
// //                 />
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Courier Services</label>
// //                 <select
// //                   className="form-select"
// //                   value={courierService}
// //                   onChange={(e) => setCourierService(e.target.value)}
// //                 >
// //                   {COURIER_SERVICES.map((c) => (
// //                     <option key={c}>{c}</option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Billing */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Billing details</h6>
// //               <InfoRow label="Name" value={billing.name} />
// //               <InfoRow label="Company" value={billing.company} />
// //               <InfoRow label="GSTIN" value={billing.gstin} />
// //               <InfoRow label="Address" value={billing.address} multiline />
// //               <InfoRow label="City" value={billing.city} />
// //               <InfoRow label="State" value={billing.state} />
// //               <InfoRow label="Pincode" value={billing.pincode} />
// //               <InfoRow label="Contact" value={billing.contact} />
// //               <InfoRow label="Email" value={billing.email} />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Shipping */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Shipping details</h6>
// //               <InfoRow label="Name" value={shipping.name} />
// //               <InfoRow label="Company" value={shipping.company} />
// //               <InfoRow label="Address" value={shipping.address} multiline />
// //               <InfoRow label="City" value={shipping.city} />
// //               <InfoRow label="State" value={shipping.state} />
// //               <InfoRow label="Pincode" value={shipping.pincode} />
// //               <InfoRow label="Country" value={shipping.country} />
// //               <InfoRow label="Contact" value={shipping.contact} />
// //               <InfoRow label="Email" value={shipping.email} />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Controls row */}
// //       <div className="row g-3 align-items-end mb-3">
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Custom Shipping Price</label>
// //           <input
// //             type="number"
// //             className="form-control"
// //             value={customShippingPrice}
// //             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// //             min={0}
// //           />
// //         </div>
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Custom Lead Time</label>
// //           <div className="input-group">
// //             <input
// //               type="number"
// //               className="form-control"
// //               value={customLeadTime}
// //               onChange={(e) => setCustomLeadTime(parseInt(e.target.value, 10) || 0)}
// //               min={0}
// //             />
// //             <span className="input-group-text">Days</span>
// //           </div>
// //         </div>
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Coupon Discount (%)</label>
// //           <input
// //             type="number"
// //             className="form-control"
// //             value={couponDiscount}
// //             onChange={(e) => setCouponDiscount(parseFloat(e.target.value) || 0)}
// //             min={0}
// //             max={100}
// //           />
// //         </div>
// //         <div className="col-md-3 text-md-end">
// //           <button className="btn btn-outline-secondary me-2" onClick={() => handleDownloadAll(orderId)}>
// //             Download All Files
// //           </button>
// //           <button className="btn btn-primary" onClick={handleSubmitOrder}>
// //             Save Order
// //           </button>
// //         </div>
// //       </div>

// //       {/* Files table */}
// //       <div className="card">
// //         <div className="card-body">
// //           <div className="table-responsive">
// //             <table className="table table-striped align-middle">
// //               <thead>
// //                 <tr>
// //                   <th>Serial No.</th>
// //                   <th>File Name</th>
// //                   <th>Technology</th>
// //                   <th>Material</th>
// //                   <th>Color</th>
// //                   <th>Quality</th>
// //                   <th>Density</th>
// //                   <th>Quantity</th>
// //                   <th>Volume</th>
// //                   <th>Price</th>
// //                   <th>Custom Price</th>
// //                   <th>Total</th>
// //                   <th></th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {order.files.map((file, index) => (
// //                   <tr key={file._id}>
// //                     <td>{index + 1}</td>
// //                     <td style={{ minWidth: 220 }}>
// //                       <button
// //                         className="btn btn-link p-0 text-decoration-none"
// //                         onClick={() => handleDownload(orderId, file.name)}
// //                       >
// //                         {file.originalName}
// //                       </button>
// //                       <div className="text-muted small">
// //                         {file.dimensions
// //                           ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(
// //                             file.dimensions.height
// //                           )} mm`
// //                           : "-"}
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.technology || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "technology", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           Object.entries(optionsData.technologyOptions).map(([key, val]) => ({
// //                             name: key,
// //                             enabled: val.enabled,
// //                           }))
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.material || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "material", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.color || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "color", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.quality || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "quality", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.density || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "density", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td style={{ maxWidth: 110 }}>
// //                       <input
// //                         type="number"
// //                         className="form-control"
// //                         value={fileOptions[file._id]?.quantity || 0}
// //                         onChange={(e) =>
// //                           handleOptionChange(file._id, "quantity", parseInt(e.target.value, 10) || 0)
// //                         }
// //                         min="0"
// //                       />
// //                     </td>
// //                     <td>{file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : "-"}</td>
// //                     <td>
// //                       {calculatePrice(
// //                         fileOptions[file._id]?.material,
// //                         fileOptions[file._id]?.density,
// //                         fileOptions[file._id]?.quality,
// //                         file.buildVolume
// //                       )}
// //                     </td>
// //                     <td style={{ maxWidth: 140 }}>
// //                       <input
// //                         type="number"
// //                         className="form-control"
// //                         value={fileOptions[file._id]?.customPrice || 0}
// //                         onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// //                         min="0"
// //                       />
// //                     </td>
// //                     <td>
// //                       {calculateItemTotal(
// //                         fileOptions[file._id]?.material,
// //                         fileOptions[file._id]?.density,
// //                         fileOptions[file._id]?.quality,
// //                         file.buildVolume,
// //                         fileOptions[file._id]?.quantity,
// //                         fileOptions[file._id]?.customPrice
// //                       )}
// //                     </td>
// //                     <td>
// //                       <button
// //                         className="btn btn-sm btn-outline-danger"
// //                         onClick={() => handleDeleteFile(orderId, file._id, file.name)}
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="d-flex justify-content-between mt-3">
// //             <div className="small text-muted">
// //               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
// //               <strong>Discount:</strong> {couponDiscount}% &nbsp;|&nbsp; <strong>Shipping:</strong> {shippingCharges}
// //             </div>
// //             <div>
// //               <button className="btn btn-primary" onClick={handleSubmitOrder}>
// //                 Save Order
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const InfoRow = ({ label, value, multiline = false }) => (
// //   <div className="mb-2">
// //     <div className="text-muted small">{label}</div>
// //     <div className={multiline ? "" : "fw-medium"}>{value || "-"}</div>
// //   </div>
// // );

// // export default OrderDetails;


// // // src/pages/OrderDetails.jsx
// // import React, { useEffect, useMemo, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { io } from "socket.io-client";

// // const socket = io("http://localhost:3001");

// // // Dropdown options (tweak to your org)
// // const HANDLERS = ["Kailash", "Adhithiyan", "Support", "Ops"];
// // const PRINT_STATUSES = ["Not Started", "Print in Progress", "Paused", "Completed"];
// // const SHIPPING_STATUSES = ["Preparing for Ship", "Ready for Pickup", "Shipped", "Delivered", "Cancelled"];
// // const COURIER_SERVICES = ["To be updated", "DTDC", "Blue Dart", "Delhivery", "India Post", "Self/Local"];

// // // helpers
// // const norm = (s) => (s || "").trim().toLowerCase();
// // const prune = (obj = {}) =>
// //   Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined));
// // const getPhone = (obj = {}) =>
// //   obj.mobile ?? obj.phone ?? obj.contact ?? obj.phoneNumber ?? "";

// // /** Normalize your backend payload (more tolerant mappings) */
// // const normalizeOrder = (raw) => {
// //   const b = raw.billingDetails || {};
// //   const s = raw.shippingDetails || {};

// //   const email = raw.email || b.email || raw.customerEmail || "";

// //   const billing = {
// //     ...b,
// //     name: b.name ?? "",
// //     company: b.company ?? "",
// //     gstin: b.gstin ?? b.GSTIN ?? "",
// //     address: b.billingAddress ?? b.address ?? "",
// //     city: b.city ?? "",
// //     state: b.state ?? "",
// //     pincode: b.pin ?? b.pincode ?? "",
// //     contact: getPhone(b),
// //     email,
// //   };

// //   const shipping = {
// //     ...s,
// //     name: s.name ?? b.name ?? "",
// //     company: s.company ?? b.company ?? "",
// //     address: s.address ?? b.shippingAddress ?? b.address ?? "",
// //     city: s.city ?? b.city ?? "",
// //     state: s.state ?? b.state ?? "",
// //     pincode: s.pincode ?? s.pin ?? b.pincode ?? "",
// //     country: s.country ?? "India",
// //     contact: getPhone(s) || getPhone(b),
// //     email: s.email ?? email,
// //   };

// //   return {
// //     ...raw,
// //     email,
// //     billingDetails: billing,
// //     shippingDetails: shipping,
// //     leadTime: Number(raw.leadTime) || 0,
// //     status: raw.status || "pending",
// //     shippingCharges: Number(raw.shippingCharges || 0),
// //     couponDiscount: Number(raw.couponDiscount || 0),
// //   };
// // };

// // const OrderDetails = () => {
// //   const { orderId } = useParams();

// //   const [order, setOrder] = useState(null);
// //   const [optionsData, setOptionsData] = useState({
// //     technologyOptions: {},
// //     materialCosts: {},
// //     densityCosts: {},
// //     qualityCosts: {},
// //   });

// //   const [fileOptions, setFileOptions] = useState({});
// //   const [customPrices, setCustomPrices] = useState({});
// //   const [customShippingPrice, setCustomShippingPrice] = useState(0);
// //   const [customLeadTime, setCustomLeadTime] = useState(0);
// //   const [couponDiscount, setCouponDiscount] = useState(0);

// //   const [email, setEmail] = useState("");

// //   // meta fields (left card)
// //   const [handledBy, setHandledBy] = useState("");
// //   const [printStatus, setPrintStatus] = useState("");
// //   const [shippingStatus, setShippingStatus] = useState("");
// //   const [trackingNumber, setTrackingNumber] = useState("");
// //   const [courierService, setCourierService] = useState("To be updated");
// //   const [orderShipped, setOrderShipped] = useState(false);

// //   // NEW: editable forms for billing/shipping
// //   const [billingForm, setBillingForm] = useState(null);
// //   const [shippingForm, setShippingForm] = useState(null);

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

// //   useEffect(() => {
// //     fetchOrderDetails();
// //     fetchOptionsData();

// //     socket.on("orderUpdated", ({ orderId: updatedOrderId, updatedOrder }) => {
// //       if (String(updatedOrderId) === String(orderId)) {
// //         const data = normalizeOrder(updatedOrder);
// //         setOrder(data);
// //         initializeFileOptions(data);
// //         hydrateMetaFields(data);
// //       }
// //     });

// //     return () => socket.off("orderUpdated");
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [orderId]);

// //   const fetchOrderDetails = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/orders/${orderId}`);
// //       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
// //       const raw = await res.json();
// //       const data = normalizeOrder(raw);

// //       setOrder(data);
// //       initializeFileOptions(data);
// //       hydrateMetaFields(data);

// //       setCouponDiscount(data.couponDiscount || 0);
// //       setEmail(data.email || "");
// //     } catch (e) {
// //       setError(e.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const hydrateMetaFields = (data) => {
// //     setHandledBy(data.handledBy || HANDLERS[0]);
// //     setPrintStatus(data.printStatus || PRINT_STATUSES[0]);
// //     setShippingStatus(data.shippingStatus || SHIPPING_STATUSES[0]);
// //     setTrackingNumber(data.trackingNumber || "");
// //     setCourierService(data.courierService || "To be updated");
// //     setCustomShippingPrice(Number(data.shippingCharges || 0));
// //     setCustomLeadTime(Number(data.leadTime || 0));
// //     setOrderShipped(Boolean(data.order_shipped ?? data.orderShipped ?? false));

// //     // Initialize editable forms with existing values
// //     setBillingForm({
// //       name: data.billingDetails?.name ?? "",
// //       company: data.billingDetails?.company ?? "",
// //       gstin: data.billingDetails?.gstin ?? "",
// //       address: data.billingDetails?.address ?? "",
// //       city: data.billingDetails?.city ?? "",
// //       state: data.billingDetails?.state ?? "",
// //       pincode: data.billingDetails?.pincode ?? "",
// //       contact: data.billingDetails?.contact ?? "",
// //       email: data.billingDetails?.email ?? data.email ?? "",
// //     });
// //     setShippingForm({
// //       name: data.shippingDetails?.name ?? "",
// //       company: data.shippingDetails?.company ?? "",
// //       address: data.shippingDetails?.address ?? "",
// //       city: data.shippingDetails?.city ?? "",
// //       state: data.shippingDetails?.state ?? "",
// //       pincode: data.shippingDetails?.pincode ?? "",
// //       country: data.shippingDetails?.country ?? "India",
// //       contact: data.shippingDetails?.contact ?? "",
// //       email: data.shippingDetails?.email ?? data.email ?? "",
// //     });
// //   };

// //   const fetchOptionsData = async () => {
// //     try {
// //       const res = await fetch("http://localhost:3001/options");
// //       const data = await res.json();
// //       setOptionsData(data);
// //     } catch (e) {
// //       console.error("Error fetching options data:", e);
// //     }
// //   };

// //   const initializeFileOptions = (orderData) => {
// //     const initial = {};
// //     const initialCustom = {};
// //     (orderData.files || []).forEach((file) => {
// //       initial[file._id] = {
// //         technology: file.options?.technology || "FDM/FFF",
// //         material: file.options?.material || "PLA",
// //         color: file.options?.color || "",
// //         quality: file.options?.quality || "Draft",
// //         density: file.options?.density || "20%",
// //         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
// //         customPrice: Number(file.customPrice || 0),
// //       };
// //       initialCustom[file._id] = Number(file.customPrice || 0);
// //     });
// //     setFileOptions(initial);
// //     setCustomPrices(initialCustom);
// //   };

// //   const updateAllItemTotals = () => {
// //     if (!order) return;
// //     setFileOptions((prev) => {
// //       const updated = { ...prev };
// //       (order.files || []).forEach((file) => {
// //         updated[file._id] = {
// //           ...updated[file._id],
// //           itemTotal: calculateItemTotal(
// //             updated[file._id]?.material || "PLA",
// //             updated[file._id]?.density || "20%",
// //             updated[file._id]?.quality || "Draft",
// //             file.buildVolume,
// //             updated[file._id]?.quantity || 0,
// //             customPrices[file._id] || 0
// //           ),
// //         };
// //       });
// //       return updated;
// //     });
// //   };

// //   const handleOptionChange = (fileId, optionType, value) => {
// //     setFileOptions((prev) => {
// //       const updatedOptions = { ...prev[fileId], [optionType]: value };

// //       // When technology changes, reset child options to first enabled entry
// //       if (optionType === "technology" && optionsData.technologyOptions[value]) {
// //         const tech = optionsData.technologyOptions[value];
// //         updatedOptions.material = tech.material?.[0]?.name || "";
// //         updatedOptions.color = tech.color?.[0]?.name || "";
// //         updatedOptions.quality = tech.quality?.[0]?.name || "";
// //         updatedOptions.density = tech.density?.[0]?.name || "";
// //       }

// //       return { ...prev, [fileId]: updatedOptions };
// //     });
// //     updateAllItemTotals();
// //   };

// //   const renderOptions = (options) =>
// //     (options || [])
// //       .filter((o) => o.enabled)
// //       .map((o) => (
// //         <option key={o.name} value={o.name}>
// //           {o.name}
// //         </option>
// //       ));

// //   const handleCustomPriceChange = (fileId, value) => {
// //     const num = parseFloat(value) || 0;
// //     setCustomPrices((p) => ({ ...p, [fileId]: num }));
// //     updateAllItemTotals();
// //     if (!order) return;
// //     const file = (order.files || []).find((f) => f._id === fileId);
// //     if (!file) return;

// //     setFileOptions((prev) => ({
// //       ...prev,
// //       [fileId]: {
// //         ...prev[fileId],
// //         customPrice: num,
// //         itemTotal: calculateItemTotal(
// //           prev[fileId]?.material || "PLA",
// //           prev[fileId]?.density || "20%",
// //           prev[fileId]?.quality || "Draft",
// //           file.buildVolume,
// //           prev[fileId]?.quantity || 1,
// //           num
// //         ),
// //       },
// //     }));
// //   };

// //   /** Price Calculation*/
// //   const calculatePrice = (material, density, quality, buildVolume) => {
// //     const materialCost = optionsData.materialCosts[material] || 0;
// //     const densityCost = optionsData.densityCosts[density] || 0;
// //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// //     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// //     return Math.round(totalPrice);
// //   };

// //   const calculateItemTotal = (material, density, quality, buildVolume, quantity, customPrice = 0) => {
// //     const materialCost = optionsData.materialCosts[material] || 0;
// //     const densityCost = optionsData.densityCosts[density] || 0;
// //     const qualityCost = optionsData.qualityCosts[quality] || 0;
// //     if (customPrice !== 0) return Math.round(customPrice * (quantity || 0));
// //     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
// //     return Math.round(totalPrice * (quantity || 0));
// //   };

// //   const subtotal = useMemo(() => {
// //     if (!order) return 0;
// //     return (order.files || []).reduce((acc, file) => {
// //       const q = fileOptions[file._id]?.quantity ?? 1;
// //       const fileTotal =
// //         q > 0
// //           ? calculateItemTotal(
// //               fileOptions[file._id]?.material || "PLA",
// //               fileOptions[file._id]?.density || "20%",
// //               fileOptions[file._id]?.quality || "Draft",
// //               file.buildVolume,
// //               q,
// //               customPrices[file._id] || 0
// //             )
// //           : 0;
// //       return acc + fileTotal;
// //     }, 0);
// //   }, [order, fileOptions, customPrices]);

// //   const gst = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);

// //   const shippingCharges = useMemo(
// //     () => (customShippingPrice !== 0 ? customShippingPrice : order?.shippingCharges || 0),
// //     [customShippingPrice, order]
// //   );

// //   const total = useMemo(() => {
// //     const discountAmount = (subtotal * (couponDiscount || 0)) / 100;
// //     return Math.max(0, subtotal - discountAmount + gst + shippingCharges);
// //   }, [subtotal, gst, shippingCharges, couponDiscount]);

// //   const leadTime = useMemo(() => (customLeadTime || order?.leadTime || 0), [customLeadTime, order]);

// //   /** Enforce shipping rules when Print Status changes */
// //   useEffect(() => {
// //     const canShip = norm(printStatus) === "completed";
// //     const ship = norm(shippingStatus);

// //     // If not completed, prevent illegal shipping states
// //     if (!canShip && (ship === "shipped" || ship === "delivered")) {
// //       setShippingStatus("Preparing for Ship");
// //       setOrderShipped(false);
// //     }
// //   }, [printStatus, shippingStatus]);

// //   /** Optional: auto-nudge courier for pickup */
// //   useEffect(() => {
// //     if (norm(shippingStatus) === "ready for pickup" && courierService === "To be updated") {
// //       setCourierService("Self/Local");
// //     }
// //   }, [shippingStatus, courierService]);

// //   /** Save */
// //   const handleSubmitOrder = async () => {
// //     try {
// //       // --- VALIDATIONS & DERIVED FLAGS ---
// //       const printDone = norm(printStatus) === "completed";
// //       const shipNow = norm(shippingStatus);
// //       const requiresTracking = shipNow === "shipped" || shipNow === "delivered";

// //       // Rule 1: cannot mark shipped/delivered unless print is completed
// //       if (!printDone && (shipNow === "shipped" || shipNow === "delivered")) {
// //         alert("You can only set Shipping Status to Shipped/Delivered after Print Status is Completed.");
// //         return;
// //       }

// //       // Rule 2: shipped/delivered must have tracking + courier
// //       if (requiresTracking) {
// //         if (!trackingNumber?.trim() || !courierService || courierService === "To be updated") {
// //           alert("Tracking Number and a valid Courier Service are required for Shipped/Delivered.");
// //           return;
// //         }
// //       }

// //       const shippedFlag = shipNow === "shipped" || shipNow === "delivered";
// //       setOrderShipped(shippedFlag);

// //       // Merge original details with edited forms, then drop empty keys
// //       const billingToSave = prune({ ...(order.billingDetails || {}), ...(billingForm || {}) });
// //       const shippingToSave = prune({ ...(order.shippingDetails || {}), ...(shippingForm || {}) });

// //       const updatedFiles = (order.files || []).map((file) => ({
// //         ...file,
// //         options: fileOptions[file._id],
// //         customPrice: customPrices[file._id],
// //         price: calculatePrice(
// //           fileOptions[file._id]?.material || "PLA",
// //           fileOptions[file._id]?.density || "20%",
// //           fileOptions[file._id]?.quality || "Draft",
// //           file.buildVolume
// //         ),
// //         itemTotal: calculateItemTotal(
// //           fileOptions[file._id]?.material,
// //           fileOptions[file._id]?.density,
// //           fileOptions[file._id]?.quality,
// //           file.buildVolume,
// //           fileOptions[file._id]?.quantity,
// //           fileOptions[file._id]?.customPrice
// //         ),
// //       }));

// //       const payload = {
// //         ...order,
// //         // editable meta
// //         email,
// //         handledBy,
// //         printStatus,
// //         shippingStatus,
// //         trackingNumber,
// //         courierService,

// //         // sync shipped flags
// //         orderShipped: shippedFlag,
// //         order_shipped: shippedFlag, // for compatibility

// //         // stamp deliveredAt if newly delivered
// //         ...(shipNow === "delivered" && !order?.deliveredAt ? { deliveredAt: new Date().toISOString() } : {}),

// //         files: updatedFiles,
// //         subtotal,
// //         gst,
// //         shippingCharges,
// //         total,
// //         leadTime,
// //         couponDiscount,

// //         // merged + pruned details (won't overwrite with blanks)
// //         billingDetails: billingToSave,
// //         shippingDetails: shippingToSave,
// //       };

// //       const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!res.ok) throw new Error("Error updating order");
// //       const data = normalizeOrder(await res.json());
// //       setOrder(data);
// //       setShowSuccessAlert(true);
// //       setTimeout(() => setShowSuccessAlert(false), 2500);
// //     } catch (e) {
// //       console.error("Error updating order:", e);
// //       alert("Failed to save order. Check console for details.");
// //     }
// //   };

// //   /** File actions */
// //   const handleDeleteFile = async (orderId, fileId, fileName) => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
// //         method: "DELETE",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ fileName }),
// //       });
// //       if (!res.ok) throw new Error("Delete failed");
// //       await fetchOrderDetails();
// //     } catch (e) {
// //       console.error("Error deleting file:", e);
// //     }
// //   };

// //   const handleDownload = async (orderId, fileName) => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/download/order/${orderId}/${fileName}`);
// //       if (!response.ok) throw new Error("Failed to fetch download link");
// //       window.location.href = response.url;
// //     } catch (e) {
// //       console.error("Error downloading file:", e);
// //     }
// //   };

// //   const handleDownloadAll = async (orderId) => {
// //     try {
// //       const response = await fetch(`http://localhost:3001/download/order/${orderId}`);
// //       if (!response.ok) throw new Error("Failed to fetch ZIP file");
// //       const blob = await response.blob();
// //       const link = document.createElement("a");
// //       link.href = window.URL.createObjectURL(blob);
// //       link.download = `${orderId}.zip`;
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //     } catch (e) {
// //       console.error("Error downloading ZIP:", e);
// //     }
// //   };

// //   if (loading) return <div className="p-4">Loading...</div>;
// //   if (error) return <div className="p-4 text-danger">Error: {error}</div>;
// //   if (!order) return <div className="p-4">No order found</div>;

// //   return (
// //     <div className="container py-4">
// //       <h2 className="mb-3">Order Details</h2>

// //       {showSuccessAlert && (
// //         <div className="alert alert-success" role="alert">
// //           Order updated successfully!
// //         </div>
// //       )}

// //       {/* Top row: Order Id + Email + totals snapshot */}
// //       <div className="row g-3 align-items-end mb-3">
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Order Id</label>
// //           <input className="form-control" value={order.orderId || orderId} readOnly />
// //         </div>
// //         <div className="col-md-4">
// //           <label className="form-label fw-semibold">Email</label>
// //           <input
// //             className="form-control"
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             placeholder="customer@email.com"
// //           />
// //         </div>
// //         <div className="col-md-5 text-md-end">
// //           <div className="small text-muted">
// //             <div>
// //               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
// //               <strong>Discount:</strong> {couponDiscount}%
// //             </div>
// //             <div className="mt-1">
// //               <strong>Shipping:</strong> {shippingCharges} &nbsp;|&nbsp; <strong>Total:</strong> {total} &nbsp;|&nbsp;{" "}
// //               <strong>Lead Time:</strong> {leadTime} Days
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Meta + Billing + Shipping */}
// //       <div className="row g-3 mb-4">
// //         {/* Meta card */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Order meta</h6>

// //               <div className="mb-3">
// //                 <div className="form-text d-block mb-1">Created Date</div>
// //                 <div className="fw-medium">
// //                   {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
// //                 </div>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Handled By</label>
// //                 <select className="form-select" value={handledBy} onChange={(e) => setHandledBy(e.target.value)}>
// //                   {HANDLERS.map((h) => (
// //                     <option key={h}>{h}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Print Status</label>
// //                 <select className="form-select" value={printStatus} onChange={(e) => setPrintStatus(e.target.value)}>
// //                   {PRINT_STATUSES.map((s) => (
// //                     <option key={s}>{s}</option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Shipping Status</label>
// //                 <select
// //                   className="form-select"
// //                   value={shippingStatus}
// //                   onChange={(e) => {
// //                     const next = e.target.value;
// //                     const canShip = norm(printStatus) === "completed";
// //                     // prevent illegal transitions
// //                     if (!canShip && (next === "Shipped" || next === "Delivered")) return;
// //                     setShippingStatus(next);
// //                     setOrderShipped(next === "Shipped" || next === "Delivered");
// //                   }}
// //                 >
// //                   {SHIPPING_STATUSES.map((s) => {
// //                     const isIllegal = norm(printStatus) !== "completed" && (s === "Shipped" || s === "Delivered");
// //                     return (
// //                       <option key={s} value={s} disabled={isIllegal}>
// //                         {s}
// //                       </option>
// //                     );
// //                   })}
// //                 </select>
// //                 <div className="form-text">
// //                   {norm(printStatus) !== "completed"
// //                     ? "Shipping can be marked as Shipped/Delivered only after print is Completed."
// //                     : "Marking Shipped/Delivered requires Tracking Number and Courier Service."}
// //                 </div>
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Tracking Number</label>
// //                 <input
// //                   className="form-control"
// //                   value={trackingNumber}
// //                   onChange={(e) => setTrackingNumber(e.target.value)}
// //                   placeholder="To be updated"
// //                 />
// //               </div>

// //               <div className="mb-3">
// //                 <label className="form-label">Courier Services</label>
// //                 <select
// //                   className="form-select"
// //                   value={courierService}
// //                   onChange={(e) => setCourierService(e.target.value)}
// //                 >
// //                   {COURIER_SERVICES.map((c) => (
// //                     <option key={c} value={c}>
// //                       {c}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div className="mb-2 small text-muted">
// //                 <strong>Order Shipped Flag:</strong> {orderShipped ? "Yes" : "No"}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Billing (editable) */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Billing details</h6>
// //               {!billingForm ? (
// //                 "Loading..."
// //               ) : (
// //                 <>
// //                   <LabeledInput label="Name" value={billingForm.name} onChange={(v) => setBillingForm({ ...billingForm, name: v })} />
// //                   <LabeledInput label="Company" value={billingForm.company} onChange={(v) => setBillingForm({ ...billingForm, company: v })} />
// //                   <LabeledInput label="GSTIN" value={billingForm.gstin} onChange={(v) => setBillingForm({ ...billingForm, gstin: v })} />
// //                   <LabeledInput label="Address" textarea value={billingForm.address} onChange={(v) => setBillingForm({ ...billingForm, address: v })} />
// //                   <div className="row g-2">
// //                     <div className="col-md-4">
// //                       <LabeledInput label="City" value={billingForm.city} onChange={(v) => setBillingForm({ ...billingForm, city: v })} />
// //                     </div>
// //                     <div className="col-md-4">
// //                       <LabeledInput label="State" value={billingForm.state} onChange={(v) => setBillingForm({ ...billingForm, state: v })} />
// //                     </div>
// //                     <div className="col-md-4">
// //                       <LabeledInput label="Pincode" value={billingForm.pincode} onChange={(v) => setBillingForm({ ...billingForm, pincode: v })} />
// //                     </div>
// //                   </div>
// //                   <div className="row g-2">
// //                     <div className="col-md-6">
// //                       <LabeledInput label="Contact (Mobile)" value={billingForm.contact} onChange={(v) => setBillingForm({ ...billingForm, contact: v })} />
// //                     </div>
// //                     <div className="col-md-6">
// //                       <LabeledInput label="Email" value={billingForm.email} onChange={(v) => setBillingForm({ ...billingForm, email: v })} />
// //                     </div>
// //                   </div>
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Shipping (editable) */}
// //         <div className="col-lg-4">
// //           <div className="card h-100">
// //             <div className="card-body">
// //               <h6 className="card-title mb-3">Shipping details</h6>
// //               {!shippingForm ? (
// //                 "Loading..."
// //               ) : (
// //                 <>
// //                   <LabeledInput label="Name" value={shippingForm.name} onChange={(v) => setShippingForm({ ...shippingForm, name: v })} />
// //                   <LabeledInput label="Company" value={shippingForm.company} onChange={(v) => setShippingForm({ ...shippingForm, company: v })} />
// //                   <LabeledInput label="Address" textarea value={shippingForm.address} onChange={(v) => setShippingForm({ ...shippingForm, address: v })} />
// //                   <div className="row g-2">
// //                     <div className="col-md-4">
// //                       <LabeledInput label="City" value={shippingForm.city} onChange={(v) => setShippingForm({ ...shippingForm, city: v })} />
// //                     </div>
// //                     <div className="col-md-4">
// //                       <LabeledInput label="State" value={shippingForm.state} onChange={(v) => setShippingForm({ ...shippingForm, state: v })} />
// //                     </div>
// //                     <div className="col-md-4">
// //                       <LabeledInput label="Pincode" value={shippingForm.pincode} onChange={(v) => setShippingForm({ ...shippingForm, pincode: v })} />
// //                     </div>
// //                   </div>
// //                   <div className="row g-2">
// //                     <div className="col-md-6">
// //                       <LabeledInput label="Country" value={shippingForm.country} onChange={(v) => setShippingForm({ ...shippingForm, country: v })} />
// //                     </div>
// //                     <div className="col-md-6">
// //                       <LabeledInput label="Contact (Mobile)" value={shippingForm.contact} onChange={(v) => setShippingForm({ ...shippingForm, contact: v })} />
// //                     </div>
// //                   </div>
// //                   <LabeledInput label="Email" value={shippingForm.email} onChange={(v) => setShippingForm({ ...shippingForm, email: v })} />
// //                 </>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Controls row */}
// //       <div className="row g-3 align-items-end mb-3">
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Custom Shipping Price</label>
// //           <input
// //             type="number"
// //             className="form-control"
// //             value={customShippingPrice}
// //             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
// //             min={0}
// //           />
// //         </div>
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Custom Lead Time</label>
// //           <div className="input-group">
// //             <input
// //               type="number"
// //               className="form-control"
// //               value={customLeadTime}
// //               onChange={(e) => setCustomLeadTime(parseInt(e.target.value, 10) || 0)}
// //               min={0}
// //             />
// //             <span className="input-group-text">Days</span>
// //           </div>
// //         </div>
// //         <div className="col-md-3">
// //           <label className="form-label fw-semibold">Coupon Discount (%)</label>
// //           <input
// //             type="number"
// //             className="form-control"
// //             value={couponDiscount}
// //             onChange={(e) => setCouponDiscount(parseFloat(e.target.value) || 0)}
// //             min={0}
// //             max={100}
// //           />
// //         </div>
// //         <div className="col-md-3 text-md-end">
// //           <button className="btn btn-outline-secondary me-2" onClick={() => handleDownloadAll(orderId)}>
// //             Download All Files
// //           </button>
// //           <button className="btn btn-primary" onClick={handleSubmitOrder}>
// //             Save Order
// //           </button>
// //         </div>
// //       </div>

// //       {/* Files table */}
// //       <div className="card">
// //         <div className="card-body">
// //           <div className="table-responsive">
// //             <table className="table table-striped align-middle">
// //               <thead>
// //                 <tr>
// //                   <th>Serial No.</th>
// //                   <th>File Name</th>
// //                   <th>Technology</th>
// //                   <th>Material</th>
// //                   <th>Color</th>
// //                   <th>Quality</th>
// //                   <th>Density</th>
// //                   <th>Quantity</th>
// //                   <th>Volume</th>
// //                   <th>Price</th>
// //                   <th>Custom Price</th>
// //                   <th>Total</th>
// //                   <th></th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {(order.files || []).map((file, index) => (
// //                   <tr key={file._id}>
// //                     <td>{index + 1}</td>
// //                     <td style={{ minWidth: 220 }}>
// //                       <button
// //                         className="btn btn-link p-0 text-decoration-none"
// //                         onClick={() => handleDownload(orderId, file.name)}
// //                       >
// //                         {file.originalName}
// //                       </button>
// //                       <div className="text-muted small">
// //                         {file.dimensions
// //                           ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(
// //                               file.dimensions.height
// //                             )} mm`
// //                           : "-"}
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.technology || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "technology", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           Object.entries(optionsData.technologyOptions).map(([key, val]) => ({
// //                             name: key,
// //                             enabled: val.enabled,
// //                           }))
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.material || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "material", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.material || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.color || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "color", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.color || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.quality || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "quality", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.quality || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td>
// //                       <select
// //                         className="form-select"
// //                         value={fileOptions[file._id]?.density || ""}
// //                         onChange={(e) => handleOptionChange(file._id, "density", e.target.value)}
// //                       >
// //                         {renderOptions(
// //                           optionsData.technologyOptions[fileOptions[file._id]?.technology]?.density || []
// //                         )}
// //                       </select>
// //                     </td>
// //                     <td style={{ maxWidth: 110 }}>
// //                       <input
// //                         type="number"
// //                         className="form-control"
// //                         value={fileOptions[file._id]?.quantity || 0}
// //                         onChange={(e) =>
// //                           handleOptionChange(file._id, "quantity", parseInt(e.target.value, 10) || 0)
// //                         }
// //                         min="0"
// //                       />
// //                     </td>
// //                     <td>{file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : "-"}</td>
// //                     <td>
// //                       {calculatePrice(
// //                         fileOptions[file._id]?.material,
// //                         fileOptions[file._id]?.density,
// //                         fileOptions[file._id]?.quality,
// //                         file.buildVolume
// //                       )}
// //                     </td>
// //                     <td style={{ maxWidth: 140 }}>
// //                       <input
// //                         type="number"
// //                         className="form-control"
// //                         value={fileOptions[file._id]?.customPrice || 0}
// //                         onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
// //                         min="0"
// //                       />
// //                     </td>
// //                     <td>
// //                       {calculateItemTotal(
// //                         fileOptions[file._id]?.material,
// //                         fileOptions[file._id]?.density,
// //                         fileOptions[file._id]?.quality,
// //                         file.buildVolume,
// //                         fileOptions[file._id]?.quantity,
// //                         fileOptions[file._id]?.customPrice
// //                       )}
// //                     </td>
// //                     <td>
// //                       <button
// //                         className="btn btn-sm btn-outline-danger"
// //                         onClick={() => handleDeleteFile(orderId, file._id, file.name)}
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="d-flex justify-content-between mt-3">
// //             <div className="small text-muted">
// //               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
// //               <strong>Discount:</strong> {couponDiscount}% &nbsp;|&nbsp; <strong>Shipping:</strong> {shippingCharges}
// //             </div>
// //             <div>
// //               <button className="btn btn-primary" onClick={handleSubmitOrder}>
// //                 Save Order
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // Simple labeled input used by forms
// // const LabeledInput = ({ label, value, onChange, textarea }) => (
// //   <div className="mb-2">
// //     <div className="text-muted small mb-1">{label}</div>
// //     {textarea ? (
// //       <textarea className="form-control" rows="2" value={value || ""} onChange={(e) => onChange(e.target.value)} />
// //     ) : (
// //       <input className="form-control" value={value || ""} onChange={(e) => onChange(e.target.value)} />
// //     )}
// //   </div>
// // );

// // // (Optional) old read-only row kept; not used now
// // const InfoRow = ({ label, value, multiline = false }) => (
// //   <div className="mb-2">
// //     <div className="text-muted small">{label}</div>
// //     <div className={multiline ? "" : "fw-medium"}>{value || "-"}</div>
// //   </div>
// // );

// // export default OrderDetails;

// // src/pages/OrderDetails.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3001");

// // Dropdown options (tweak to your org)
// const HANDLERS = ["Kailash", "Adhithiyan", "Support", "Ops"];
// const PRINT_STATUSES = ["Not Started", "Print in Progress", "Paused", "Completed"];
// const SHIPPING_STATUSES = ["Preparing for Ship", "Ready for Pickup", "Shipped", "Delivered", "Cancelled"];
// const COURIER_SERVICES = ["To be updated", "DTDC", "Blue Dart", "Delhivery", "India Post", "Self/Local"];

// // helpers
// const norm = (s) => (s || "").trim().toLowerCase();
// const prune = (obj = {}) =>
//   Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined));
// const getPhone = (obj = {}) =>
//   obj.mobile ?? obj.phone ?? obj.contact ?? obj.phoneNumber ?? "";
// // unify any server pincode variant into one value
// const pickPincode = (obj = {}) =>
//   obj.pincode ?? obj.pin ?? obj.pinCode ?? obj.zip ?? obj.zipcode ?? obj.postalCode ?? obj.postal_code ?? "";

// /** Normalize your backend payload (tolerant mappings) */
// const normalizeOrder = (raw) => {
//   const b = raw.billingDetails || {};
//   const s = raw.shippingDetails || {};

//   const email = raw.email || b.email || raw.customerEmail || "";

//   const billing = {
//     ...b,
//     name: b.name ?? "",
//     company: b.company ?? "",
//     gstin: b.gstin ?? b.GSTIN ?? "",
//     address: b.billingAddress ?? b.address ?? "",
//     city: b.city ?? "",
//     state: b.state ?? "",
//     pincode: pickPincode(b),
//     contact: getPhone(b),
//     email,
//   };

//   const shipping = {
//     ...s,
//     name: s.name ?? b.name ?? "",
//     company: s.company ?? b.company ?? "",
//     address: s.address ?? b.shippingAddress ?? b.address ?? "",
//     city: s.city ?? b.city ?? "",
//     state: s.state ?? b.state ?? "",
//     pincode: pickPincode(s) || pickPincode(b), // fallback to billing if missing
//     country: s.country ?? "India",
//     contact: getPhone(s) || getPhone(b),
//     email: s.email ?? email,
//   };

//   return {
//     ...raw,
//     email,
//     billingDetails: billing,
//     shippingDetails: shipping,
//     leadTime: Number(raw.leadTime) || 0,
//     status: raw.status || "pending",
//     shippingCharges: Number(raw.shippingCharges || 0),
//     couponDiscount: Number(raw.couponDiscount || 0),
//   };
// };

// const OrderDetails = () => {
//   const { orderId } = useParams();

//   const [order, setOrder] = useState(null);
//   const [optionsData, setOptionsData] = useState({
//     technologyOptions: {},
//     materialCosts: {},
//     densityCosts: {},
//     qualityCosts: {},
//   });

//   const [fileOptions, setFileOptions] = useState({});
//   const [customPrices, setCustomPrices] = useState({});
//   const [customShippingPrice, setCustomShippingPrice] = useState(0);
//   const [customLeadTime, setCustomLeadTime] = useState(0);
//   const [couponDiscount, setCouponDiscount] = useState(0);

//   const [email, setEmail] = useState("");

//   // meta fields (left card)
//   const [handledBy, setHandledBy] = useState("");
//   const [printStatus, setPrintStatus] = useState("");
//   const [shippingStatus, setShippingStatus] = useState("");
//   const [trackingNumber, setTrackingNumber] = useState("");
//   const [courierService, setCourierService] = useState("To be updated");
//   const [orderShipped, setOrderShipped] = useState(false);

//   // editable forms for billing/shipping
//   const [billingForm, setBillingForm] = useState(null);
//   const [shippingForm, setShippingForm] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false);

//   useEffect(() => {
//     fetchOrderDetails();
//     fetchOptionsData();

//     socket.on("orderUpdated", ({ orderId: updatedOrderId, updatedOrder }) => {
//       if (String(updatedOrderId) === String(orderId)) {
//         const data = normalizeOrder(updatedOrder);
//         setOrder(data);
//         initializeFileOptions(data);
//         hydrateMetaFields(data);
//       }
//     });

//     return () => socket.off("orderUpdated");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [orderId]);

//   const fetchOrderDetails = async () => {
//     try {
//       const res = await fetch(`http://localhost:3001/orders/${orderId}`);
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       const raw = await res.json();
//       const data = normalizeOrder(raw);

//       setOrder(data);
//       initializeFileOptions(data);
//       hydrateMetaFields(data);

//       setCouponDiscount(data.couponDiscount || 0);
//       setEmail(data.email || "");
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const hydrateMetaFields = (data) => {
//     setHandledBy(data.handledBy || HANDLERS[0]);
//     setPrintStatus(data.printStatus || PRINT_STATUSES[0]);
//     setShippingStatus(data.shippingStatus || SHIPPING_STATUSES[0]);
//     setTrackingNumber(data.trackingNumber || "");
//     setCourierService(data.courierService || "To be updated");
//     setCustomShippingPrice(Number(data.shippingCharges || 0));
//     setCustomLeadTime(Number(data.leadTime || 0));
//     setOrderShipped(Boolean(data.order_shipped ?? data.orderShipped ?? false));

//     // Initialize editable forms with existing values (canonical pincode)
//     setBillingForm({
//       name: data.billingDetails?.name ?? "",
//       company: data.billingDetails?.company ?? "",
//       gstin: data.billingDetails?.gstin ?? "",
//       address: data.billingDetails?.address ?? "",
//       city: data.billingDetails?.city ?? "",
//       state: data.billingDetails?.state ?? "",
//       pincode: pickPincode(data.billingDetails),
//       contact: data.billingDetails?.contact ?? "",
//       email: data.billingDetails?.email ?? data.email ?? "",
//     });
//     setShippingForm({
//       name: data.shippingDetails?.name ?? "",
//       company: data.shippingDetails?.company ?? "",
//       address: data.shippingDetails?.address ?? "",
//       city: data.shippingDetails?.city ?? "",
//       state: data.shippingDetails?.state ?? "",
//       pincode: pickPincode(data.shippingDetails) || pickPincode(data.billingDetails),
//       country: data.shippingDetails?.country ?? "India",
//       contact: data.shippingDetails?.contact ?? "",
//       email: data.shippingDetails?.email ?? data.email ?? "",
//     });
//   };

//   const fetchOptionsData = async () => {
//     try {
//       const res = await fetch("http://localhost:3001/options");
//       const data = await res.json();
//       setOptionsData(data);
//     } catch (e) {
//       console.error("Error fetching options data:", e);
//     }
//   };

//   const initializeFileOptions = (orderData) => {
//     const initial = {};
//     const initialCustom = {};
//     (orderData.files || []).forEach((file) => {
//       initial[file._id] = {
//         technology: file.options?.technology || "FDM/FFF",
//         material: file.options?.material || "PLA",
//         color: file.options?.color || "",
//         quality: file.options?.quality || "Draft",
//         density: file.options?.density || "20%",
//         quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
//         customPrice: Number(file.customPrice || 0),
//       };
//       initialCustom[file._id] = Number(file.customPrice || 0);
//     });
//     setFileOptions(initial);
//     setCustomPrices(initialCustom);
//   };

//   const updateAllItemTotals = () => {
//     if (!order) return;
//     setFileOptions((prev) => {
//       const updated = { ...prev };
//       (order.files || []).forEach((file) => {
//         updated[file._id] = {
//           ...updated[file._id],
//           itemTotal: calculateItemTotal(
//             updated[file._id]?.material || "PLA",
//             updated[file._id]?.density || "20%",
//             updated[file._id]?.quality || "Draft",
//             file.buildVolume,
//             updated[file._id]?.quantity || 0,
//             customPrices[file._id] || 0
//           ),
//         };
//       });
//       return updated;
//     });
//   };

//   const handleOptionChange = (fileId, optionType, value) => {
//     setFileOptions((prev) => {
//       const updatedOptions = { ...prev[fileId], [optionType]: value };

//       // When technology changes, reset child options to first enabled entry
//       const techMap = optionsData.technologyOptions || {};
//       if (optionType === "technology" && techMap[value]) {
//         const tech = techMap[value];
//         updatedOptions.material = tech.material?.[0]?.name || "";
//         updatedOptions.color = tech.color?.[0]?.name || "";
//         updatedOptions.quality = tech.quality?.[0]?.name || "";
//         updatedOptions.density = tech.density?.[0]?.name || "";
//       }

//       return { ...prev, [fileId]: updatedOptions };
//     });
//     updateAllItemTotals();
//   };

//   const renderOptions = (options) =>
//     (options || [])
//       .filter((o) => o.enabled)
//       .map((o) => (
//         <option key={o.name} value={o.name}>
//           {o.name}
//         </option>
//       ));

//   const handleCustomPriceChange = (fileId, value) => {
//     const num = parseFloat(value) || 0;
//     setCustomPrices((p) => ({ ...p, [fileId]: num }));
//     updateAllItemTotals();
//     if (!order) return;
//     const file = (order.files || []).find((f) => f._id === fileId);
//     if (!file) return;

//     setFileOptions((prev) => ({
//       ...prev,
//       [fileId]: {
//         ...prev[fileId],
//         customPrice: num,
//         itemTotal: calculateItemTotal(
//           prev[fileId]?.material || "PLA",
//           prev[fileId]?.density || "20%",
//           prev[fileId]?.quality || "Draft",
//           file.buildVolume,
//           prev[fileId]?.quantity || 1,
//           num
//         ),
//       },
//     }));
//   };

//   /** Price Calculation*/
//   const calculatePrice = (material, density, quality, buildVolume) => {
//     const materialCost = optionsData.materialCosts[material] || 0;
//     const densityCost = optionsData.densityCosts[density] || 0;
//     const qualityCost = optionsData.qualityCosts[quality] || 0;
//     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
//     return Math.round(totalPrice);
//   };

//   const calculateItemTotal = (material, density, quality, buildVolume, quantity, customPrice = 0) => {
//     const materialCost = optionsData.materialCosts[material] || 0;
//     const densityCost = optionsData.densityCosts[density] || 0;
//     const qualityCost = optionsData.qualityCosts[quality] || 0;
//     if (customPrice !== 0) return Math.round(customPrice * (quantity || 0));
//     const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
//     return Math.round(totalPrice * (quantity || 0));
//   };

//   const subtotal = useMemo(() => {
//     if (!order) return 0;
//     return (order.files || []).reduce((acc, file) => {
//       const q = fileOptions[file._id]?.quantity ?? 1;
//       const fileTotal =
//         q > 0
//           ? calculateItemTotal(
//               fileOptions[file._id]?.material || "PLA",
//               fileOptions[file._id]?.density || "20%",
//               fileOptions[file._id]?.quality || "Draft",
//               file.buildVolume,
//               q,
//               customPrices[file._id] || 0
//             )
//           : 0;
//       return acc + fileTotal;
//     }, 0);
//   }, [order, fileOptions, customPrices]);

//   const gst = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);

//   const shippingCharges = useMemo(
//     () => (customShippingPrice !== 0 ? customShippingPrice : order?.shippingCharges || 0),
//     [customShippingPrice, order]
//   );

//   const total = useMemo(() => {
//     const discountAmount = (subtotal * (couponDiscount || 0)) / 100;
//     return Math.max(0, subtotal - discountAmount + gst + shippingCharges);
//   }, [subtotal, gst, shippingCharges, couponDiscount]);

//   const leadTime = useMemo(() => (customLeadTime || order?.leadTime || 0), [customLeadTime, order]);

//   /** Enforce shipping rules when Print Status changes */
//   useEffect(() => {
//     const canShip = norm(printStatus) === "completed";
//     const ship = norm(shippingStatus);

//     // If not completed, prevent illegal shipping states
//     if (!canShip && (ship === "shipped" || ship === "delivered")) {
//       setShippingStatus("Preparing for Ship");
//       setOrderShipped(false);
//     }
//   }, [printStatus, shippingStatus]);

//   /** Optional: auto-nudge courier for pickup */
//   useEffect(() => {
//     if (norm(shippingStatus) === "ready for pickup" && courierService === "To be updated") {
//       setCourierService("Self/Local");
//     }
//   }, [shippingStatus, courierService]);

//   /** Save */
//   const handleSubmitOrder = async () => {
//     try {
//       // --- VALIDATIONS & DERIVED FLAGS ---
//       const printDone = norm(printStatus) === "completed";
//       const shipNow = norm(shippingStatus);
//       const requiresTracking = shipNow === "shipped" || shipNow === "delivered";

//       // Rule 1: cannot mark shipped/delivered unless print is completed
//       if (!printDone && (shipNow === "shipped" || shipNow === "delivered")) {
//         alert("You can only set Shipping Status to Shipped/Delivered after Print Status is Completed.");
//         return;
//       }

//       // Rule 2: shipped/delivered must have tracking + courier
//       if (requiresTracking) {
//         if (!trackingNumber?.trim() || !courierService || courierService === "To be updated") {
//           alert("Tracking Number and a valid Courier Service are required for Shipped/Delivered.");
//           return;
//         }
//       }

//       const shippedFlag = shipNow === "shipped" || shipNow === "delivered";
//       setOrderShipped(shippedFlag);

//       // Merge original details with edited forms, then drop empty keys
//       const billingToSave = prune({ ...(order.billingDetails || {}), ...(billingForm || {}) });
//       const shippingToSave = prune({ ...(order.shippingDetails || {}), ...(shippingForm || {}) });

//       // include common aliases so older backends keep working
//       const billingCompat = {
//         ...billingToSave,
//         pin: billingToSave.pincode ?? billingToSave.pin,
//         pinCode: billingToSave.pincode ?? billingToSave.pinCode,
//       };
//       const shippingCompat = {
//         ...shippingToSave,
//         pin: shippingToSave.pincode ?? shippingToSave.pin,
//         pinCode: shippingToSave.pincode ?? shippingToSave.pinCode,
//       };

//       const updatedFiles = (order.files || []).map((file) => ({
//         ...file,
//         options: fileOptions[file._id],
//         customPrice: customPrices[file._id],
//         price: calculatePrice(
//           fileOptions[file._id]?.material || "PLA",
//           fileOptions[file._id]?.density || "20%",
//           fileOptions[file._id]?.quality || "Draft",
//           file.buildVolume
//         ),
//         itemTotal: calculateItemTotal(
//           fileOptions[file._id]?.material,
//           fileOptions[file._id]?.density,
//           fileOptions[file._id]?.quality,
//           file.buildVolume,
//           fileOptions[file._id]?.quantity,
//           fileOptions[file._id]?.customPrice
//         ),
//       }));

//       const payload = {
//         ...order,
//         // editable meta
//         email,
//         handledBy,
//         printStatus,
//         shippingStatus,
//         trackingNumber,
//         courierService,

//         // sync shipped flags
//         orderShipped: shippedFlag,
//         order_shipped: shippedFlag, // for compatibility

//         // stamp deliveredAt if newly delivered
//         ...(shipNow === "delivered" && !order?.deliveredAt ? { deliveredAt: new Date().toISOString() } : {}),

//         files: updatedFiles,
//         subtotal,
//         gst,
//         shippingCharges,
//         total,
//         leadTime,
//         couponDiscount,

//         // merged + pruned details (won't overwrite with blanks)
//         billingDetails: billingCompat,
//         shippingDetails: shippingCompat,
//       };

//       const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Error updating order");
//       const data = normalizeOrder(await res.json());
//       setOrder(data);
//       setShowSuccessAlert(true);
//       setTimeout(() => setShowSuccessAlert(false), 2500);
//     } catch (e) {
//       console.error("Error updating order:", e);
//       alert("Failed to save order. Check console for details.");
//     }
//   };

//   /** File actions */
//   const handleDeleteFile = async (orderId, fileId, fileName) => {
//     try {
//       const res = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fileName }),
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       await fetchOrderDetails();
//     } catch (e) {
//       console.error("Error deleting file:", e);
//     }
//   };

//   const handleDownload = async (orderId, fileName) => {
//     try {
//       const response = await fetch(`http://localhost:3001/download/order/${orderId}/${fileName}`);
//       if (!response.ok) throw new Error("Failed to fetch download link");
//       window.location.href = response.url;
//     } catch (e) {
//       console.error("Error downloading file:", e);
//     }
//   };

//   const handleDownloadAll = async (orderId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/download/order/${orderId}`);
//       if (!response.ok) throw new Error("Failed to fetch ZIP file");
//       const blob = await response.blob();
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${orderId}.zip`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (e) {
//       console.error("Error downloading ZIP:", e);
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;
//   if (error) return <div className="p-4 text-danger">Error: {error}</div>;
//   if (!order) return <div className="p-4">No order found</div>;

//   return (
//     <div className="container py-4">
//       <h2 className="mb-3">Order Details</h2>

//       {showSuccessAlert && (
//         <div className="alert alert-success" role="alert">
//           Order updated successfully!
//         </div>
//       )}

//       {/* Top row: Order Id + Email + totals snapshot */}
//       <div className="row g-3 align-items-end mb-3">
//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Order Id</label>
//           <input className="form-control" value={order.orderId || orderId} readOnly />
//         </div>
//         <div className="col-md-4">
//           <label className="form-label fw-semibold">Email</label>
//           <input
//             className="form-control"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="customer@email.com"
//           />
//         </div>
//         <div className="col-md-5 text-md-end">
//           <div className="small text-muted">
//             <div>
//               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
//               <strong>Discount:</strong> {couponDiscount}%
//             </div>
//             <div className="mt-1">
//               <strong>Shipping:</strong> {shippingCharges} &nbsp;|&nbsp; <strong>Total:</strong> {total} &nbsp;|&nbsp;{" "}
//               <strong>Lead Time:</strong> {leadTime} Days
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Meta + Billing + Shipping */}
//       <div className="row g-3 mb-4">
//         {/* Meta card */}
//         <div className="col-lg-4">
//           <div className="card h-100">
//             <div className="card-body">
//               <h6 className="card-title mb-3">Order meta</h6>

//               <div className="mb-3">
//                 <div className="form-text d-block mb-1">Created Date</div>
//                 <div className="fw-medium">
//                   {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Handled By</label>
//                 <select className="form-select" value={handledBy} onChange={(e) => setHandledBy(e.target.value)}>
//                   {HANDLERS.map((h) => (
//                     <option key={h}>{h}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Print Status</label>
//                 <select className="form-select" value={printStatus} onChange={(e) => setPrintStatus(e.target.value)}>
//                   {PRINT_STATUSES.map((s) => (
//                     <option key={s}>{s}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Shipping Status</label>
//                 <select
//                   className="form-select"
//                   value={shippingStatus}
//                   onChange={(e) => {
//                     const next = e.target.value;
//                     const canShip = norm(printStatus) === "completed";
//                     // prevent illegal transitions
//                     if (!canShip && (next === "Shipped" || next === "Delivered")) return;
//                     setShippingStatus(next);
//                     setOrderShipped(next === "Shipped" || next === "Delivered");
//                   }}
//                 >
//                   {SHIPPING_STATUSES.map((s) => {
//                     const isIllegal = norm(printStatus) !== "completed" && (s === "Shipped" || s === "Delivered");
//                     return (
//                       <option key={s} value={s} disabled={isIllegal}>
//                         {s}
//                       </option>
//                     );
//                   })}
//                 </select>
//                 <div className="form-text">
//                   {norm(printStatus) !== "completed"
//                     ? "Shipping can be marked as Shipped/Delivered only after print is Completed."
//                     : "Marking Shipped/Delivered requires Tracking Number and Courier Service."}
//                 </div>
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Tracking Number</label>
//                 <input
//                   className="form-control"
//                   value={trackingNumber}
//                   onChange={(e) => setTrackingNumber(e.target.value)}
//                   placeholder="To be updated"
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Courier Services</label>
//                 <select
//                   className="form-select"
//                   value={courierService}
//                   onChange={(e) => setCourierService(e.target.value)}
//                 >
//                   {COURIER_SERVICES.map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-2 small text-muted">
//                 <strong>Order Shipped Flag:</strong> {orderShipped ? "Yes" : "No"}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Billing (editable) */}
//         <div className="col-lg-4">
//           <div className="card h-100">
//             <div className="card-body">
//               <h6 className="card-title mb-3">Billing details</h6>
//               {!billingForm ? (
//                 "Loading..."
//               ) : (
//                 <>
//                   <LabeledInput label="Name" value={billingForm.name} onChange={(v) => setBillingForm({ ...billingForm, name: v })} />
//                   <LabeledInput label="Company" value={billingForm.company} onChange={(v) => setBillingForm({ ...billingForm, company: v })} />
//                   <LabeledInput label="GSTIN" value={billingForm.gstin} onChange={(v) => setBillingForm({ ...billingForm, gstin: v })} />
//                   <LabeledInput label="Address" textarea value={billingForm.address} onChange={(v) => setBillingForm({ ...billingForm, address: v })} />
//                   <div className="row g-2">
//                     <div className="col-md-4">
//                       <LabeledInput label="City" value={billingForm.city} onChange={(v) => setBillingForm({ ...billingForm, city: v })} />
//                     </div>
//                     <div className="col-md-4">
//                       <LabeledInput label="State" value={billingForm.state} onChange={(v) => setBillingForm({ ...billingForm, state: v })} />
//                     </div>
//                     <div className="col-md-4">
//                       <LabeledInput
//                         label="Pincode"
//                         value={billingForm.pincode}
//                         onChange={(v) => setBillingForm({ ...billingForm, pincode: v })}
//                         inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
//                       />
//                     </div>
//                   </div>
//                   <div className="row g-2">
//                     <div className="col-md-6">
//                       <LabeledInput
//                         label="Contact (Mobile)"
//                         value={billingForm.contact}
//                         onChange={(v) => setBillingForm({ ...billingForm, contact: v })}
//                         inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <LabeledInput label="Email" value={billingForm.email} onChange={(v) => setBillingForm({ ...billingForm, email: v })} />
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Shipping (editable) */}
//         <div className="col-lg-4">
//           <div className="card h-100">
//             <div className="card-body">
//               <h6 className="card-title mb-3">Shipping details</h6>
//               {!shippingForm ? (
//                 "Loading..."
//               ) : (
//                 <>
//                   <LabeledInput label="Name" value={shippingForm.name} onChange={(v) => setShippingForm({ ...shippingForm, name: v })} />
//                   <LabeledInput label="Company" value={shippingForm.company} onChange={(v) => setShippingForm({ ...shippingForm, company: v })} />
//                   <LabeledInput label="Address" textarea value={shippingForm.address} onChange={(v) => setShippingForm({ ...shippingForm, address: v })} />
//                   <div className="row g-2">
//                     <div className="col-md-4">
//                       <LabeledInput label="City" value={shippingForm.city} onChange={(v) => setShippingForm({ ...shippingForm, city: v })} />
//                     </div>
//                     <div className="col-md-4">
//                       <LabeledInput label="State" value={shippingForm.state} onChange={(v) => setShippingForm({ ...shippingForm, state: v })} />
//                     </div>
//                     <div className="col-md-4">
//                       <LabeledInput
//                         label="Pincode"
//                         value={shippingForm.pincode}
//                         onChange={(v) => setShippingForm({ ...shippingForm, pincode: v })}
//                         inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
//                       />
//                     </div>
//                   </div>
//                   <div className="row g-2">
//                     <div className="col-md-6">
//                       <LabeledInput label="Country" value={shippingForm.country} onChange={(v) => setShippingForm({ ...shippingForm, country: v })} />
//                     </div>
//                     <div className="col-md-6">
//                       <LabeledInput
//                         label="Contact (Mobile)"
//                         value={shippingForm.contact}
//                         onChange={(v) => setShippingForm({ ...shippingForm, contact: v })}
//                         inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//                       />
//                     </div>
//                   </div>
//                   <LabeledInput label="Email" value={shippingForm.email} onChange={(v) => setShippingForm({ ...shippingForm, email: v })} />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Controls row */}
//       <div className="row g-3 align-items-end mb-3">
//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Custom Shipping Price</label>
//           <input
//             type="number"
//             className="form-control"
//             value={customShippingPrice}
//             onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
//             min={0}
//           />
//         </div>
//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Custom Lead Time</label>
//           <div className="input-group">
//             <input
//               type="number"
//               className="form-control"
//               value={customLeadTime}
//               onChange={(e) => setCustomLeadTime(parseInt(e.target.value, 10) || 0)}
//               min={0}
//             />
//             <span className="input-group-text">Days</span>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Coupon Discount (%)</label>
//           <input
//             type="number"
//             className="form-control"
//             value={couponDiscount}
//             onChange={(e) => setCouponDiscount(parseFloat(e.target.value) || 0)}
//             min={0}
//             max={100}
//           />
//         </div>
//         <div className="col-md-3 text-md-end">
//           <button className="btn btn-outline-secondary me-2" onClick={() => handleDownloadAll(orderId)}>
//             Download All Files
//           </button>
//           <button className="btn btn-primary" onClick={handleSubmitOrder}>
//             Save Order
//           </button>
//         </div>
//       </div>

//       {/* Files table */}
//       <div className="card">
//         <div className="card-body">
//           <div className="table-responsive">
//             <table className="table table-striped align-middle">
//               <thead>
//                 <tr>
//                   <th>Serial No.</th>
//                   <th>File Name</th>
//                   <th>Technology</th>
//                   <th>Material</th>
//                   <th>Color</th>
//                   <th>Quality</th>
//                   <th>Density</th>
//                   <th>Quantity</th>
//                   <th>Volume</th>
//                   <th>Price</th>
//                   <th>Custom Price</th>
//                   <th>Total</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(order.files || []).map((file, index) => (
//                   <tr key={file._id}>
//                     <td>{index + 1}</td>
//                     <td style={{ minWidth: 220 }}>
//                       <button
//                         className="btn btn-link p-0 text-decoration-none"
//                         onClick={() => handleDownload(orderId, file.name)}
//                       >
//                         {file.originalName}
//                       </button>
//                       <div className="text-muted small">
//                         {file.dimensions
//                           ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(
//                               file.dimensions.height
//                             )} mm`
//                           : "-"}
//                       </div>
//                     </td>
//                     <td>
//                       <select
//                         className="form-select"
//                         value={fileOptions[file._id]?.technology || ""}
//                         onChange={(e) => handleOptionChange(file._id, "technology", e.target.value)}
//                       >
//                         {renderOptions(
//                           Object.entries(optionsData.technologyOptions || {}).map(([key, val]) => ({
//                             name: key,
//                             enabled: val.enabled,
//                           }))
//                         )}
//                       </select>
//                     </td>
//                     <td>
//                       <select
//                         className="form-select"
//                         value={fileOptions[file._id]?.material || ""}
//                         onChange={(e) => handleOptionChange(file._id, "material", e.target.value)}
//                       >
//                         {renderOptions(
//                           (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).material || []
//                         )}
//                       </select>
//                     </td>
//                     <td>
//                       <select
//                         className="form-select"
//                         value={fileOptions[file._id]?.color || ""}
//                         onChange={(e) => handleOptionChange(file._id, "color", e.target.value)}
//                       >
//                         {renderOptions(
//                           (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).color || []
//                         )}
//                       </select>
//                     </td>
//                     <td>
//                       <select
//                         className="form-select"
//                         value={fileOptions[file._id]?.quality || ""}
//                         onChange={(e) => handleOptionChange(file._id, "quality", e.target.value)}
//                       >
//                         {renderOptions(
//                           (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).quality || []
//                         )}
//                       </select>
//                     </td>
//                     <td>
//                       <select
//                         className="form-select"
//                         value={fileOptions[file._id]?.density || ""}
//                         onChange={(e) => handleOptionChange(file._id, "density", e.target.value)}
//                       >
//                         {renderOptions(
//                           (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).density || []
//                         )}
//                       </select>
//                     </td>
//                     <td style={{ maxWidth: 110 }}>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={fileOptions[file._id]?.quantity || 0}
//                         onChange={(e) =>
//                           handleOptionChange(file._id, "quantity", parseInt(e.target.value, 10) || 0)
//                         }
//                         min="0"
//                       />
//                     </td>
//                     <td>{file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : "-"}</td>
//                     <td>
//                       {calculatePrice(
//                         fileOptions[file._id]?.material,
//                         fileOptions[file._id]?.density,
//                         fileOptions[file._id]?.quality,
//                         file.buildVolume
//                       )}
//                     </td>
//                     <td style={{ maxWidth: 140 }}>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={fileOptions[file._id]?.customPrice || 0}
//                         onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
//                         min="0"
//                       />
//                     </td>
//                     <td>
//                       {calculateItemTotal(
//                         fileOptions[file._id]?.material,
//                         fileOptions[file._id]?.density,
//                         fileOptions[file._id]?.quality,
//                         file.buildVolume,
//                         fileOptions[file._id]?.quantity,
//                         fileOptions[file._id]?.customPrice
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDeleteFile(orderId, file._id, file.name)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="d-flex justify-content-between mt-3">
//             <div className="small text-muted">
//               <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
//               <strong>Discount:</strong> {couponDiscount}% &nbsp;|&nbsp; <strong>Shipping:</strong> {shippingCharges}
//             </div>
//             <div>
//               <button className="btn btn-primary" onClick={handleSubmitOrder}>
//                 Save Order
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Simple labeled input used by forms
// const LabeledInput = ({ label, value, onChange, textarea, inputProps }) => (
//   <div className="mb-2">
//     <div className="text-muted small mb-1">{label}</div>
//     {textarea ? (
//       <textarea className="form-control" rows="2" value={value || ""} onChange={(e) => onChange(e.target.value)} />
//     ) : (
//       <input
//         className="form-control"
//         value={value || ""}
//         onChange={(e) => onChange(e.target.value)}
//         {...(inputProps || {})}
//       />
//     )}
//   </div>
// );

// export default OrderDetails;

// src/pages/OrderDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// Dropdown options (tweak to your org)
const HANDLERS = ["Kailash", "Adhithiyan", "Support", "Ops"];
const PRINT_STATUSES = ["Not Started", "Print in Progress", "Paused", "Completed"];
const SHIPPING_STATUSES = ["Preparing for Ship", "Ready for Pickup", "Shipped", "Delivered", "Cancelled"];
const COURIER_SERVICES = ["To be updated", "DTDC", "Blue Dart", "Delhivery", "India Post", "Self/Local"];

/* -------------------------- helpers -------------------------- */
const norm = (s) => (s || "").trim().toLowerCase();
const prune = (obj = {}) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined));

const getPhone = (obj = {}) =>
  obj.mobile ?? obj.phone ?? obj.contact ?? obj.phoneNumber ?? "";

// unify any server pincode variant into one value
const pickPincode = (obj = {}) =>
  obj.pincode ?? obj.pin ?? obj.pinCode ?? obj.zip ?? obj.zipcode ?? obj.postalCode ?? obj.postal_code ?? "";

// make a nice address string regardless of shape
const pickAddress = (obj = {}) => {
  // direct string fields first
  const direct =
    obj.address ??
    obj.billingAddress ??
    obj.shippingAddress ??
    obj.address1 ??
    obj.addressLine1 ??
    obj.line1 ??
    obj.street ??
    "";
  if (typeof direct === "string" && direct.trim()) return direct.trim();

  // nested objects
  const nested =
    (typeof obj.address === "object" && obj.address) ||
    (typeof obj.billingAddress === "object" && obj.billingAddress) ||
    (typeof obj.shippingAddress === "object" && obj.shippingAddress) ||
    null;

  if (nested) {
    const parts = [
      nested.line1,
      nested.line2,
      nested.street,
      nested.area,
      nested.landmark,
      nested.district,
    ].filter((x) => typeof x === "string" && x.trim());
    return parts.join(", ");
  }
  return "";
};

// if city/state live inside nested address or with different key names
const pickCity = (obj = {}) =>
  obj.city ?? obj.town ?? obj.district ?? obj.locality ?? (obj.address && obj.address.city) ?? "";

const pickState = (obj = {}) =>
  obj.state ?? obj.region ?? obj.province ?? (obj.address && obj.address.state) ?? "";

/** Normalize your backend payload (tolerant mappings) */
const normalizeOrder = (raw) => {
  const b = raw.billingDetails || {};
  const s = raw.shippingDetails || {};

  const email = raw.email || b.email || raw.customerEmail || "";

  const billing = {
    ...b,
    name: b.name ?? "",
    company: b.company ?? "",
    gstin: b.gstin ?? b.GSTIN ?? "",
    address: pickAddress(b),
    city: pickCity(b),
    state: pickState(b),
    pincode: pickPincode(b),
    contact: getPhone(b),
    email,
  };

  const shipping = {
    ...s,
    name: s.name ?? b.name ?? "",
    company: s.company ?? b.company ?? "",
    address: pickAddress(s) || pickAddress(b),
    city: pickCity(s) || pickCity(b),
    state: pickState(s) || pickState(b),
    pincode: pickPincode(s) || pickPincode(b), // fallback to billing if missing
    country: s.country ?? "India",
    contact: getPhone(s) || getPhone(b),
    email: s.email ?? email,
  };

  return {
    ...raw,
    email,
    billingDetails: billing,
    shippingDetails: shipping,
    leadTime: Number(raw.leadTime) || 0,
    status: raw.status || "pending",
    shippingCharges: Number(raw.shippingCharges || 0),
    couponDiscount: Number(raw.couponDiscount || 0),
  };
};

const OrderDetails = () => {
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [optionsData, setOptionsData] = useState({
    technologyOptions: {},
    materialCosts: {},
    densityCosts: {},
    qualityCosts: {},
  });

  const [fileOptions, setFileOptions] = useState({});
  const [customPrices, setCustomPrices] = useState({});
  const [customShippingPrice, setCustomShippingPrice] = useState(0);
  const [customLeadTime, setCustomLeadTime] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [email, setEmail] = useState("");

  // meta fields (left card)
  const [handledBy, setHandledBy] = useState("");
  const [printStatus, setPrintStatus] = useState("");
  const [shippingStatus, setShippingStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [courierService, setCourierService] = useState("To be updated");
  const [orderShipped, setOrderShipped] = useState(false);

  // editable forms for billing/shipping
  const [billingForm, setBillingForm] = useState(null);
  const [shippingForm, setShippingForm] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
    fetchOptionsData();

    socket.on("orderUpdated", ({ orderId: updatedOrderId, updatedOrder }) => {
      if (String(updatedOrderId) === String(orderId)) {
        const data = normalizeOrder(updatedOrder);
        setOrder(data);
        initializeFileOptions(data);
        hydrateMetaFields(data);
      }
    });

    return () => socket.off("orderUpdated");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const raw = await res.json();
      const data = normalizeOrder(raw);

      setOrder(data);
      initializeFileOptions(data);
      hydrateMetaFields(data);

      setCouponDiscount(data.couponDiscount || 0);
      setEmail(data.email || "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const hydrateMetaFields = (data) => {
    setHandledBy(data.handledBy || HANDLERS[0]);
    setPrintStatus(data.printStatus || PRINT_STATUSES[0]);
    setShippingStatus(data.shippingStatus || SHIPPING_STATUSES[0]);
    setTrackingNumber(data.trackingNumber || "");
    setCourierService(data.courierService || "To be updated");
    setCustomShippingPrice(Number(data.shippingCharges || 0));
    setCustomLeadTime(Number(data.leadTime || 0));
    setOrderShipped(Boolean(data.order_shipped ?? data.orderShipped ?? false));

    // Initialize editable forms with existing values (canonical address/pincode)
    setBillingForm({
      name: data.billingDetails?.name ?? "",
      company: data.billingDetails?.company ?? "",
      gstin: data.billingDetails?.gstin ?? "",
      address: pickAddress(data.billingDetails),
      city: data.billingDetails?.city ?? "",
      state: data.billingDetails?.state ?? "",
      pincode: pickPincode(data.billingDetails),
      contact: data.billingDetails?.contact ?? "",
      email: data.billingDetails?.email ?? data.email ?? "",
    });
    setShippingForm({
      name: data.shippingDetails?.name ?? "",
      company: data.shippingDetails?.company ?? "",
      address: pickAddress(data.shippingDetails) || pickAddress(data.billingDetails),
      city: data.shippingDetails?.city ?? data.billingDetails?.city ?? "",
      state: data.shippingDetails?.state ?? data.billingDetails?.state ?? "",
      pincode: pickPincode(data.shippingDetails) || pickPincode(data.billingDetails),
      country: data.shippingDetails?.country ?? "India",
      contact: data.shippingDetails?.contact ?? "",
      email: data.shippingDetails?.email ?? data.email ?? "",
    });
  };

  const fetchOptionsData = async () => {
    try {
      const res = await fetch("http://localhost:3001/options");
      const data = await res.json();
      setOptionsData(data);
    } catch (e) {
      console.error("Error fetching options data:", e);
    }
  };

  const initializeFileOptions = (orderData) => {
    const initial = {};
    const initialCustom = {};
    (orderData.files || []).forEach((file) => {
      initial[file._id] = {
        technology: file.options?.technology || "FDM/FFF",
        material: file.options?.material || "PLA",
        color: file.options?.color || "",
        quality: file.options?.quality || "Draft",
        density: file.options?.density || "20%",
        quantity: file.options?.quantity !== undefined ? file.options.quantity : 1,
        customPrice: Number(file.customPrice || 0),
      };
      initialCustom[file._id] = Number(file.customPrice || 0);
    });
    setFileOptions(initial);
    setCustomPrices(initialCustom);
  };

  const updateAllItemTotals = () => {
    if (!order) return;
    setFileOptions((prev) => {
      const updated = { ...prev };
      (order.files || []).forEach((file) => {
        updated[file._id] = {
          ...updated[file._id],
          itemTotal: calculateItemTotal(
            updated[file._id]?.material || "PLA",
            updated[file._id]?.density || "20%",
            updated[file._id]?.quality || "Draft",
            file.buildVolume,
            updated[file._id]?.quantity || 0,
            customPrices[file._id] || 0
          ),
        };
      });
      return updated;
    });
  };

  const handleOptionChange = (fileId, optionType, value) => {
    setFileOptions((prev) => {
      const updatedOptions = { ...prev[fileId], [optionType]: value };

      // When technology changes, reset child options to first enabled entry
      const techMap = optionsData.technologyOptions || {};
      if (optionType === "technology" && techMap[value]) {
        const tech = techMap[value];
        updatedOptions.material = tech.material?.[0]?.name || "";
        updatedOptions.color = tech.color?.[0]?.name || "";
        updatedOptions.quality = tech.quality?.[0]?.name || "";
        updatedOptions.density = tech.density?.[0]?.name || "";
      }

      return { ...prev, [fileId]: updatedOptions };
    });
    updateAllItemTotals();
  };

  const renderOptions = (options) =>
    (options || [])
      .filter((o) => o.enabled)
      .map((o) => (
        <option key={o.name} value={o.name}>
          {o.name}
        </option>
      ));

  const handleCustomPriceChange = (fileId, value) => {
    const num = parseFloat(value) || 0;
    setCustomPrices((p) => ({ ...p, [fileId]: num }));
    updateAllItemTotals();
    if (!order) return;
    const file = (order.files || []).find((f) => f._id === fileId);
    if (!file) return;

    setFileOptions((prev) => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        customPrice: num,
        itemTotal: calculateItemTotal(
          prev[fileId]?.material || "PLA",
          prev[fileId]?.density || "20%",
          prev[fileId]?.quality || "Draft",
          file.buildVolume,
          prev[fileId]?.quantity || 1,
          num
        ),
      },
    }));
  };

  /** Price Calculation*/
  const calculatePrice = (material, density, quality, buildVolume) => {
    const materialCost = optionsData.materialCosts[material] || 0;
    const densityCost = optionsData.densityCosts[density] || 0;
    const qualityCost = optionsData.qualityCosts[quality] || 0;
    const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
    return Math.round(totalPrice);
  };

  const calculateItemTotal = (material, density, quality, buildVolume, quantity, customPrice = 0) => {
    const materialCost = optionsData.materialCosts[material] || 0;
    const densityCost = optionsData.densityCosts[density] || 0;
    const qualityCost = optionsData.qualityCosts[quality] || 0;
    if (customPrice !== 0) return Math.round(customPrice * (quantity || 0));
    const totalPrice = (materialCost + densityCost + qualityCost) * (buildVolume || 0);
    return Math.round(totalPrice * (quantity || 0));
  };

  const subtotal = useMemo(() => {
    if (!order) return 0;
    return (order.files || []).reduce((acc, file) => {
      const q = fileOptions[file._id]?.quantity ?? 1;
      const fileTotal =
        q > 0
          ? calculateItemTotal(
              fileOptions[file._id]?.material || "PLA",
              fileOptions[file._id]?.density || "20%",
              fileOptions[file._id]?.quality || "Draft",
              file.buildVolume,
              q,
              customPrices[file._id] || 0
            )
          : 0;
      return acc + fileTotal;
    }, 0);
  }, [order, fileOptions, customPrices]);

  const gst = useMemo(() => Math.round(subtotal * 0.18), [subtotal]);

  const shippingCharges = useMemo(
    () => (customShippingPrice !== 0 ? customShippingPrice : order?.shippingCharges || 0),
    [customShippingPrice, order]
  );

  const total = useMemo(() => {
    const discountAmount = (subtotal * (couponDiscount || 0)) / 100;
    return Math.max(0, subtotal - discountAmount + gst + shippingCharges);
  }, [subtotal, gst, shippingCharges, couponDiscount]);

  const leadTime = useMemo(() => (customLeadTime || order?.leadTime || 0), [customLeadTime, order]);

  /** Enforce shipping rules when Print Status changes */
  useEffect(() => {
    const canShip = norm(printStatus) === "completed";
    const ship = norm(shippingStatus);

    // If not completed, prevent illegal shipping states
    if (!canShip && (ship === "shipped" || ship === "delivered")) {
      setShippingStatus("Preparing for Ship");
      setOrderShipped(false);
    }
  }, [printStatus, shippingStatus]);

  /** Optional: auto-nudge courier for pickup */
  useEffect(() => {
    if (norm(shippingStatus) === "ready for pickup" && courierService === "To be updated") {
      setCourierService("Self/Local");
    }
  }, [shippingStatus, courierService]);

  /** Save */
  const handleSubmitOrder = async () => {
    try {
      // --- VALIDATIONS & DERIVED FLAGS ---
      const printDone = norm(printStatus) === "completed";
      const shipNow = norm(shippingStatus);
      const requiresTracking = shipNow === "shipped" || shipNow === "delivered";

      // Rule 1: cannot mark shipped/delivered unless print is completed
      if (!printDone && (shipNow === "shipped" || shipNow === "delivered")) {
        alert("You can only set Shipping Status to Shipped/Delivered after Print Status is Completed.");
        return;
      }

      // Rule 2: shipped/delivered must have tracking + courier
      if (requiresTracking) {
        if (!trackingNumber?.trim() || !courierService || courierService === "To be updated") {
          alert("Tracking Number and a valid Courier Service are required for Shipped/Delivered.");
          return;
        }
      }

      const shippedFlag = shipNow === "shipped" || shipNow === "delivered";
      setOrderShipped(shippedFlag);

      // Merge original details with edited forms, then drop empty keys
      const billingToSave = prune({ ...(order.billingDetails || {}), ...(billingForm || {}) });
      const shippingToSave = prune({ ...(order.shippingDetails || {}), ...(shippingForm || {}) });

      // include common aliases so older backends keep working
      const billingCompat = {
        ...billingToSave,
        billingAddress: billingToSave.address ?? billingToSave.billingAddress,
        pin: billingToSave.pincode ?? billingToSave.pin,
        pinCode: billingToSave.pincode ?? billingToSave.pinCode,
      };
      const shippingCompat = {
        ...shippingToSave,
        shippingAddress: shippingToSave.address ?? shippingToSave.shippingAddress,
        pin: shippingToSave.pincode ?? shippingToSave.pin,
        pinCode: shippingToSave.pincode ?? shippingToSave.pinCode,
      };

      const updatedFiles = (order.files || []).map((file) => ({
        ...file,
        options: fileOptions[file._id],
        customPrice: customPrices[file._id],
        price: calculatePrice(
          fileOptions[file._id]?.material || "PLA",
          fileOptions[file._id]?.density || "20%",
          fileOptions[file._id]?.quality || "Draft",
          file.buildVolume
        ),
        itemTotal: calculateItemTotal(
          fileOptions[file._id]?.material,
          fileOptions[file._id]?.density,
          fileOptions[file._id]?.quality,
          file.buildVolume,
          fileOptions[file._id]?.quantity,
          fileOptions[file._id]?.customPrice
        ),
      }));

      const payload = {
        ...order,
        // editable meta
        email,
        handledBy,
        printStatus,
        shippingStatus,
        trackingNumber,
        courierService,

        // sync shipped flags
        orderShipped: shippedFlag,
        order_shipped: shippedFlag, // for compatibility

        // stamp deliveredAt if newly delivered
        ...(shipNow === "delivered" && !order?.deliveredAt ? { deliveredAt: new Date().toISOString() } : {}),

        files: updatedFiles,
        subtotal,
        gst,
        shippingCharges,
        total,
        leadTime,
        couponDiscount,

        // merged + pruned/compatible details (won't overwrite with blanks)
        billingDetails: billingCompat,
        shippingDetails: shippingCompat,
      };

      const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error updating order");
      const data = normalizeOrder(await res.json());
      setOrder(data);
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 2500);
    } catch (e) {
      console.error("Error updating order:", e);
      alert("Failed to save order. Check console for details.");
    }
  };

  /** File actions */
  const handleDeleteFile = async (orderId, fileId, fileName) => {
    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}/files/${fileId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchOrderDetails();
    } catch (e) {
      console.error("Error deleting file:", e);
    }
  };

  const handleDownload = async (orderId, fileName) => {
    try {
      const response = await fetch(`http://localhost:3001/download/order/${orderId}/${fileName}`);
      if (!response.ok) throw new Error("Failed to fetch download link");
      window.location.href = response.url;
    } catch (e) {
      console.error("Error downloading file:", e);
    }
  };

  const handleDownloadAll = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3001/download/order/${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch ZIP file");
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${orderId}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Error downloading ZIP:", e);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-danger">Error: {error}</div>;
  if (!order) return <div className="p-4">No order found</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Order Details</h2>

      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Order updated successfully!
        </div>
      )}

      {/* Top row: Order Id + Email + totals snapshot */}
      <div className="row g-3 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label fw-semibold">Order Id</label>
          <input className="form-control" value={order.orderId || orderId} readOnly />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Email</label>
          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@email.com"
          />
        </div>
        <div className="col-md-5 text-md-end">
          <div className="small text-muted">
            <div>
              <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
              <strong>Discount:</strong> {couponDiscount}%
            </div>
            <div className="mt-1">
              <strong>Shipping:</strong> {shippingCharges} &nbsp;|&nbsp; <strong>Total:</strong> {total} &nbsp;|&nbsp;{" "}
              <strong>Lead Time:</strong> {leadTime} Days
            </div>
          </div>
        </div>
      </div>

      {/* Meta + Billing + Shipping */}
      <div className="row g-3 mb-4">
        {/* Meta card */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title mb-3">Order meta</h6>

              <div className="mb-3">
                <div className="form-text d-block mb-1">Created Date</div>
                <div className="fw-medium">
                  {order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Handled By</label>
                <select className="form-select" value={handledBy} onChange={(e) => setHandledBy(e.target.value)}>
                  {HANDLERS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Print Status</label>
                <select className="form-select" value={printStatus} onChange={(e) => setPrintStatus(e.target.value)}>
                  {PRINT_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Shipping Status</label>
                <select
                  className="form-select"
                  value={shippingStatus}
                  onChange={(e) => {
                    const next = e.target.value;
                    const canShip = norm(printStatus) === "completed";
                    // prevent illegal transitions
                    if (!canShip && (next === "Shipped" || next === "Delivered")) return;
                    setShippingStatus(next);
                    setOrderShipped(next === "Shipped" || next === "Delivered");
                  }}
                >
                  {SHIPPING_STATUSES.map((s) => {
                    const isIllegal = norm(printStatus) !== "completed" && (s === "Shipped" || s === "Delivered");
                    return (
                      <option key={s} value={s} disabled={isIllegal}>
                        {s}
                      </option>
                    );
                  })}
                </select>
                <div className="form-text">
                  {norm(printStatus) !== "completed"
                    ? "Shipping can be marked as Shipped/Delivered only after print is Completed."
                    : "Marking Shipped/Delivered requires Tracking Number and Courier Service."}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Tracking Number</label>
                <input
                  className="form-control"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="To be updated"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Courier Services</label>
                <select
                  className="form-select"
                  value={courierService}
                  onChange={(e) => setCourierService(e.target.value)}
                >
                  {COURIER_SERVICES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-2 small text-muted">
                <strong>Order Shipped Flag:</strong> {orderShipped ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>

        {/* Billing (editable) */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title mb-3">Billing details</h6>
              {!billingForm ? (
                "Loading..."
              ) : (
                <>
                  <LabeledInput label="Name" value={billingForm.name} onChange={(v) => setBillingForm({ ...billingForm, name: v })} />
                  <LabeledInput label="Company" value={billingForm.company} onChange={(v) => setBillingForm({ ...billingForm, company: v })} />
                  <LabeledInput label="GSTIN" value={billingForm.gstin} onChange={(v) => setBillingForm({ ...billingForm, gstin: v })} />
                  <LabeledInput label="Address" textarea value={billingForm.address} onChange={(v) => setBillingForm({ ...billingForm, address: v })} />
                  <div className="row g-2">
                    <div className="col-md-4">
                      <LabeledInput label="City" value={billingForm.city} onChange={(v) => setBillingForm({ ...billingForm, city: v })} />
                    </div>
                    <div className="col-md-4">
                      <LabeledInput label="State" value={billingForm.state} onChange={(v) => setBillingForm({ ...billingForm, state: v })} />
                    </div>
                    <div className="col-md-4">
                      <LabeledInput
                        label="Pincode"
                        value={billingForm.pincode}
                        onChange={(v) => setBillingForm({ ...billingForm, pincode: v })}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <LabeledInput
                        label="Contact (Mobile)"
                        value={billingForm.contact}
                        onChange={(v) => setBillingForm({ ...billingForm, contact: v })}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      />
                    </div>
                    <div className="col-md-6">
                      <LabeledInput label="Email" value={billingForm.email} onChange={(v) => setBillingForm({ ...billingForm, email: v })} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Shipping (editable) */}
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-body">
              <h6 className="card-title mb-3">Shipping details</h6>
              {!shippingForm ? (
                "Loading..."
              ) : (
                <>
                  <LabeledInput label="Name" value={shippingForm.name} onChange={(v) => setShippingForm({ ...shippingForm, name: v })} />
                  <LabeledInput label="Company" value={shippingForm.company} onChange={(v) => setShippingForm({ ...shippingForm, company: v })} />
                  <LabeledInput label="Address" textarea value={shippingForm.address} onChange={(v) => setShippingForm({ ...shippingForm, address: v })} />
                  <div className="row g-2">
                    <div className="col-md-4">
                      <LabeledInput label="City" value={shippingForm.city} onChange={(v) => setShippingForm({ ...shippingForm, city: v })} />
                    </div>
                    <div className="col-md-4">
                      <LabeledInput label="State" value={shippingForm.state} onChange={(v) => setShippingForm({ ...shippingForm, state: v })} />
                    </div>
                    <div className="col-md-4">
                      <LabeledInput
                        label="Pincode"
                        value={shippingForm.pincode}
                        onChange={(v) => setShippingForm({ ...shippingForm, pincode: v })}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 }}
                      />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col-md-6">
                      <LabeledInput label="Country" value={shippingForm.country} onChange={(v) => setShippingForm({ ...shippingForm, country: v })} />
                    </div>
                    <div className="col-md-6">
                      <LabeledInput
                        label="Contact (Mobile)"
                        value={shippingForm.contact}
                        onChange={(v) => setShippingForm({ ...shippingForm, contact: v })}
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      />
                    </div>
                  </div>
                  <LabeledInput label="Email" value={shippingForm.email} onChange={(v) => setShippingForm({ ...shippingForm, email: v })} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls row */}
      <div className="row g-3 align-items-end mb-3">
        <div className="col-md-3">
          <label className="form-label fw-semibold">Custom Shipping Price</label>
          <input
            type="number"
            className="form-control"
            value={customShippingPrice}
            onChange={(e) => setCustomShippingPrice(parseFloat(e.target.value) || 0)}
            min={0}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Custom Lead Time</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={customLeadTime}
              onChange={(e) => setCustomLeadTime(parseInt(e.target.value, 10) || 0)}
              min={0}
            />
            <span className="input-group-text">Days</span>
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label fw-semibold">Coupon Discount (%)</label>
          <input
            type="number"
            className="form-control"
            value={couponDiscount}
            onChange={(e) => setCouponDiscount(parseFloat(e.target.value) || 0)}
            min={0}
            max={100}
          />
        </div>
        <div className="col-md-3 text-md-end">
          <button className="btn btn-outline-secondary me-2" onClick={() => handleDownloadAll(orderId)}>
            Download All Files
          </button>
          <button className="btn btn-primary" onClick={handleSubmitOrder}>
            Save Order
          </button>
        </div>
      </div>

      {/* Files table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>File Name</th>
                  <th>Technology</th>
                  <th>Material</th>
                  <th>Color</th>
                  <th>Quality</th>
                  <th>Density</th>
                  <th>Quantity</th>
                  <th>Volume</th>
                  <th>Price</th>
                  <th>Custom Price</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {(order.files || []).map((file, index) => (
                  <tr key={file._id}>
                    <td>{index + 1}</td>
                    <td style={{ minWidth: 220 }}>
                      <button
                        className="btn btn-link p-0 text-decoration-none"
                        onClick={() => handleDownload(orderId, file.name)}
                      >
                        {file.originalName}
                      </button>
                      <div className="text-muted small">
                        {file.dimensions
                          ? `${Math.round(file.dimensions.length)} x ${Math.round(file.dimensions.width)} x ${Math.round(
                              file.dimensions.height
                            )} mm`
                          : "-"}
                      </div>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={fileOptions[file._id]?.technology || ""}
                        onChange={(e) => handleOptionChange(file._id, "technology", e.target.value)}
                      >
                        {renderOptions(
                          Object.entries(optionsData.technologyOptions || {}).map(([key, val]) => ({
                            name: key,
                            enabled: val.enabled,
                          }))
                        )}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={fileOptions[file._id]?.material || ""}
                        onChange={(e) => handleOptionChange(file._id, "material", e.target.value)}
                      >
                        {renderOptions(
                          (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).material || []
                        )}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={fileOptions[file._id]?.color || ""}
                        onChange={(e) => handleOptionChange(file._id, "color", e.target.value)}
                      >
                        {renderOptions(
                          (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).color || []
                        )}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={fileOptions[file._id]?.quality || ""}
                        onChange={(e) => handleOptionChange(file._id, "quality", e.target.value)}
                      >
                        {renderOptions(
                          (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).quality || []
                        )}
                      </select>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={fileOptions[file._id]?.density || ""}
                        onChange={(e) => handleOptionChange(file._id, "density", e.target.value)}
                      >
                        {renderOptions(
                          (optionsData.technologyOptions?.[fileOptions[file._id]?.technology] || {}).density || []
                        )}
                      </select>
                    </td>
                    <td style={{ maxWidth: 110 }}>
                      <input
                        type="number"
                        className="form-control"
                        value={fileOptions[file._id]?.quantity || 0}
                        onChange={(e) =>
                          handleOptionChange(file._id, "quantity", parseInt(e.target.value, 10) || 0)
                        }
                        min="0"
                      />
                    </td>
                    <td>{file.buildVolume ? `${Math.round(file.buildVolume)} cm³` : "-"}</td>
                    <td>
                      {calculatePrice(
                        fileOptions[file._id]?.material,
                        fileOptions[file._id]?.density,
                        fileOptions[file._id]?.quality,
                        file.buildVolume
                      )}
                    </td>
                    <td style={{ maxWidth: 140 }}>
                      <input
                        type="number"
                        className="form-control"
                        value={fileOptions[file._id]?.customPrice || 0}
                        onChange={(e) => handleCustomPriceChange(file._id, e.target.value)}
                        min="0"
                      />
                    </td>
                    <td>
                      {calculateItemTotal(
                        fileOptions[file._id]?.material,
                        fileOptions[file._id]?.density,
                        fileOptions[file._id]?.quality,
                        file.buildVolume,
                        fileOptions[file._id]?.quantity,
                        fileOptions[file._id]?.customPrice
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteFile(orderId, file._id, file.name)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div className="small text-muted">
              <strong>Subtotal:</strong> {subtotal} &nbsp;|&nbsp; <strong>GST:</strong> {gst} &nbsp;|&nbsp;{" "}
              <strong>Discount:</strong> {couponDiscount}% &nbsp;|&nbsp; <strong>Shipping:</strong> {shippingCharges}
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleSubmitOrder}>
                Save Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple labeled input used by forms
const LabeledInput = ({ label, value, onChange, textarea, inputProps }) => (
  <div className="mb-2">
    <div className="text-muted small mb-1">{label}</div>
    {textarea ? (
      <textarea className="form-control" rows="2" value={value || ""} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <input
        className="form-control"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        {...(inputProps || {})}
      />
    )}
  </div>
);

export default OrderDetails;
