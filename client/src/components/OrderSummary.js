// // // // // // import React from 'react';

// // // // // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime }) => {
// // // // // //     return (
// // // // // //         <div className="container border-top mt-4">
// // // // // //             <table className="table">
// // // // // //                 <tbody>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Order ID</th>
// // // // // //                         <td>{orderId}</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Total Files:</th>
// // // // // //                         <td>{files.length}</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Lead Time:</th>
// // // // // //                         <td>2 Days</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Sub Total:</th>
// // // // // //                         <td>₹ {subtotal}</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>GST 18%:</th>
// // // // // //                         <td>₹ {gst}</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Shipping</th>
// // // // // //                         <td>₹ {shippingCharges}</td>
// // // // // //                     </tr>
// // // // // //                     <tr>
// // // // // //                         <th className='fw-normal'>Total Including GST:</th>
// // // // // //                         <td>₹ {subtotal + gst + shippingCharges}</td>
// // // // // //                     </tr>
// // // // // //                 </tbody>
// // // // // //             </table>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default OrderSummary;

// // // // // import React from 'react';

// // // // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime }) => {
// // // // //     const total = subtotal + gst + shippingCharges;

// // // // //     // let leadTime;
// // // // //     // if (total >= 10000) {
// // // // //     //     leadTime = "10 Days";
// // // // //     // } else if (total > 1000) {
// // // // //     //     leadTime = "5 Days";
// // // // //     // } else if (total > 500) {
// // // // //     //     leadTime = "4 Days";
// // // // //     // } else if (total > 200) {
// // // // //     //     leadTime = "3 Days";
// // // // //     // } else if (total > 100) {
// // // // //     //     leadTime = "2 Day"; 
// // // // //     // } else {
// // // // //     //     leadTime = "1 Day"; // Default case
// // // // //     // }

// // // // //     return (
// // // // //         <div className="container border-top mt-4">
// // // // //             <table className="table">
// // // // //                 <tbody>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Order ID</th>
// // // // //                         <td>{orderId}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Total Files:</th>
// // // // //                         <td>{files.length}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Lead Time:</th>
// // // // //                         <td>{leadTime}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Sub Total:</th>
// // // // //                         <td>₹ {subtotal}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>GST 18%:</th>
// // // // //                         <td>₹ {gst}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Shipping</th>
// // // // //                         <td>₹ {shippingCharges}</td>
// // // // //                     </tr>
// // // // //                     <tr>
// // // // //                         <th className='fw-normal'>Total Including GST:</th>
// // // // //                         <td>₹ {total}</td>
// // // // //                     </tr>
// // // // //                 </tbody>
// // // // //             </table>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default OrderSummary;


// // // // import React, { useState } from 'react';

// // // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
// // // //     const [couponCode, setCouponCode] = useState('');
// // // //     const [discount, setDiscount] = useState(0); // Discount percentage
// // // //     const [error, setError] = useState('');

// // // //     const handleApplyCoupon = async () => {
// // // //         try {
// // // //             // Simulate a backend API call to validate the coupon
// // // //             const response = await fetch('http://localhost:3001/api/coupons/validate', {
// // // //                 method: 'POST',
// // // //                 headers: {
// // // //                     'Content-Type': 'application/json',
// // // //                 },
// // // //                 body: JSON.stringify({ code: couponCode }),
// // // //             });

// // // //             if (!response.ok) {
// // // //                 throw new Error('Invalid coupon code');
// // // //             }

// // // //             const data = await response.json();
// // // //             setDiscount(data.discount); // Set the discount percentage
// // // //             setError('');
// // // //             onApplyCoupon(data.discount); // Pass the discount to the parent component
// // // //         } catch (err) {
// // // //             setError(err.message || 'Failed to apply coupon');
// // // //             setDiscount(0);
// // // //         }
// // // //     };

// // // //     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

// // // //     return (
// // // //         <div className="container border-top mt-4">
// // // //             <table className="table">
// // // //                 <tbody>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Order ID</th>
// // // //                         <td>{orderId}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Total Files:</th>
// // // //                         <td>{files.length}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Lead Time:</th>
// // // //                         <td>{leadTime}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Sub Total:</th>
// // // //                         <td>₹ {subtotal}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">GST 18%:</th>
// // // //                         <td>₹ {gst}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Shipping</th>
// // // //                         <td>₹ {shippingCharges}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Coupon Discount:</th>
// // // //                         <td>₹ {(subtotal * discount) / 100}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className="fw-normal">Total Including GST:</th>
// // // //                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
// // // //                     </tr>
// // // //                 </tbody>
// // // //             </table>

// // // //             {/* Coupon Field */}
// // // //             <div className="mt-3">
// // // //                 <label htmlFor="coupon" className="form-label">Coupon Code</label>
// // // //                 <input
// // // //                     type="text"
// // // //                     id="coupon"
// // // //                     value={couponCode}
// // // //                     onChange={(e) => setCouponCode(e.target.value)}
// // // //                     className="form-control"
// // // //                     placeholder="Enter coupon code"
// // // //                 />
// // // //                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
// // // //                     Apply Coupon
// // // //                 </button>
// // // //                 {error && <p className="text-danger mt-2">{error}</p>}
// // // //                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
// // // //             </div>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default OrderSummary;

// // // import React, { useState } from 'react';

// // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
// // //     const [couponCode, setCouponCode] = useState('');
// // //     const [discount, setDiscount] = useState(0); // Discount percentage
// // //     const [error, setError] = useState('');

// // //     const handleApplyCoupon = async () => {
// // //         try {
// // //           console.log('Applying coupon:', couponCode); // Debug log

// // //           const response = await fetch('http://localhost:3001/api/coupons/validate', {
// // //             method: 'POST',
// // //             headers: {
// // //               'Content-Type': 'application/json',
// // //             },
// // //             body: JSON.stringify({ code: couponCode }),
// // //           });

// // //           if (!response.ok) {
// // //             const errorData = await response.json();
// // //             throw new Error(errorData.message || 'Invalid coupon code');
// // //           }

// // //           const data = await response.json();
// // //           setDiscount(data.discount); // Set the discount percentage
// // //           setError('');
// // //           onApplyCoupon(data.discount); // Pass the discount to the parent component
// // //         } catch (err) {
// // //           setError(err.message || 'Failed to apply coupon');
// // //           setDiscount(0);
// // //         }
// // //       };

// // //     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

// // //     return (
// // //         <div className="container border-top mt-4">
// // //             <table className="table">
// // //                 <tbody>
// // //                     <tr>
// // //                         <th className="fw-normal">Order ID</th>
// // //                         <td>{orderId}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Total Files:</th>
// // //                         <td>{files.length}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Lead Time:</th>
// // //                         <td>{leadTime}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Sub Total:</th>
// // //                         <td>₹ {subtotal}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">GST 18%:</th>
// // //                         <td>₹ {gst}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Shipping</th>
// // //                         <td>₹ {shippingCharges}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Coupon Discount:</th>
// // //                         <td>₹ {(subtotal * discount) / 100}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className="fw-normal">Total Including GST:</th>
// // //                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
// // //                     </tr>
// // //                 </tbody>
// // //             </table>

// // //             {/* Coupon Field */}
// // //             <div className="mt-3">
// // //                 <label htmlFor="coupon" className="form-label">Coupon Code</label>
// // //                 <input
// // //                     type="text"
// // //                     id="coupon"
// // //                     value={couponCode}
// // //                     onChange={(e) => setCouponCode(e.target.value)}
// // //                     className="form-control"
// // //                     placeholder="Enter coupon code"
// // //                 />
// // //                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
// // //                     Apply Coupon
// // //                 </button>
// // //                 {error && <p className="text-danger mt-2">{error}</p>}
// // //                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
// // //             </div>
// // //         </div>
// // //     );
// // // };

// // // export default OrderSummary;

// // import React, { useState } from 'react';

// // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
// //     const [couponCode, setCouponCode] = useState('');
// //     const [discount, setDiscount] = useState(0); // Discount percentage
// //     const [error, setError] = useState('');

// //     const handleApplyCoupon = async () => {
// //         try {
// //             console.log('Applying coupon:', couponCode); // Debug log

// //             const response = await fetch('http://localhost:3001/api/coupons/validate', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ code: couponCode }),
// //             });

// //             if (!response.ok) {
// //                 const errorData = await response.json();
// //                 throw new Error(errorData.message || 'Invalid coupon code');
// //             }

// //             const data = await response.json();
// //             setDiscount(data.discount); // Set the discount percentage
// //             setError('');
// //             onApplyCoupon(data.discount); // Pass the discount to the parent component
// //         } catch (err) {
// //             setError(err.message || 'Failed to apply coupon');
// //             setDiscount(0);
// //         }
// //     };

// //     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

// //     return (
// //         <div className="container border-top mt-4">
// //             <table className="table">
// //                 <tbody>
// //                     <tr>
// //                         <th className="fw-normal">Order ID</th>
// //                         <td>{orderId}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Total Files:</th>
// //                         <td>{files.length}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Lead Time:</th>
// //                         <td>{leadTime}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Sub Total:</th>
// //                         <td>₹ {subtotal}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">GST 18%:</th>
// //                         <td>₹ {gst}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Shipping</th>
// //                         <td>₹ {shippingCharges}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Coupon Discount:</th>
// //                         <td>₹ {(subtotal * discount) / 100}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Total Including GST:</th>
// //                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
// //                     </tr>
// //                 </tbody>
// //             </table>

// //             {/* Coupon Field */}
// //             <div className="mt-3">
// //                 <label htmlFor="couponCode" className="form-label">Coupon Code</label>
// //                 <input
// //                     type="text"
// //                     id="couponCode" // Unique id for the input field
// //                     name="couponCode" // Unique name for the input field
// //                     value={couponCode}
// //                     onChange={(e) => setCouponCode(e.target.value)}
// //                     className="form-control"
// //                     placeholder="Enter coupon code"
// //                     autoComplete="off" // Prevent browser autofill if not needed
// //                 />
// //                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
// //                     Apply Coupon
// //                 </button>
// //                 {error && <p className="text-danger mt-2">{error}</p>}
// //                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
// //             </div>
// //         </div>
// //     );
// // };

// // export default OrderSummary;

// import React, { useState } from 'react';

// const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
//     const [couponCode, setCouponCode] = useState('');
//     const [discount, setDiscount] = useState(0); // Discount percentage
//     const [error, setError] = useState('');

//     const handleApplyCoupon = async () => {
//         try {
//             console.log('Applying coupon:', couponCode); // Debug log

//             const response = await fetch('http://localhost:3001/api/coupons/validate', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ code: couponCode }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Invalid coupon code');
//             }

//             const data = await response.json();

//             // Filter files that match the coupon's technology
//             const matchingFiles = files.filter(
//                 (file) => file.options?.technology === data.technology
//             );

//             if (matchingFiles.length === 0) {
//                 setError(`No files match the technology "${data.technology}" for this coupon.`);
//                 setDiscount(0);
//                 return;
//             }

//             setDiscount(data.discount); // Set the discount percentage
//             setError('');
//             onApplyCoupon(data); // Pass the coupon details to the parent component
//         } catch (err) {
//             setError(err.message || 'Failed to apply coupon');
//             setDiscount(0);
//         }
//     };

//     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

//     return (
//         <div className="container border-top mt-4">
//             <table className="table">
//                 <tbody>
//                     <tr>
//                         <th className="fw-normal">Order ID</th>
//                         <td>{orderId}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Total Files:</th>
//                         <td>{files.length}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Lead Time:</th>
//                         <td>{leadTime}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Sub Total:</th>
//                         <td>₹ {subtotal}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">GST 18%:</th>
//                         <td>₹ {gst}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Shipping</th>
//                         <td>₹ {shippingCharges}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Coupon Discount:</th>
//                         <td>₹ {(subtotal * discount) / 100}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Total Including GST:</th>
//                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
//                     </tr>
//                 </tbody>
//             </table>

//             {/* Coupon Field */}
//             <div className="mt-3">
//                 <label htmlFor="couponCode" className="form-label">Coupon Code</label>
//                 <input
//                     type="text"
//                     id="couponCode"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter coupon code"
//                 />
//                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
//                     Apply Coupon
//                 </button>
//                 {error && <p className="text-danger mt-2">{error}</p>}
//                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
//             </div>
//         </div>
//     );
// };

// export default OrderSummary;

// // // // import React from 'react';

// // // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime }) => {
// // // //     return (
// // // //         <div className="container border-top mt-4">
// // // //             <table className="table">
// // // //                 <tbody>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Order ID</th>
// // // //                         <td>{orderId}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Total Files:</th>
// // // //                         <td>{files.length}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Lead Time:</th>
// // // //                         <td>2 Days</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Sub Total:</th>
// // // //                         <td>₹ {subtotal}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>GST 18%:</th>
// // // //                         <td>₹ {gst}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Shipping</th>
// // // //                         <td>₹ {shippingCharges}</td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                         <th className='fw-normal'>Total Including GST:</th>
// // // //                         <td>₹ {subtotal + gst + shippingCharges}</td>
// // // //                     </tr>
// // // //                 </tbody>
// // // //             </table>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default OrderSummary;

// // // import React from 'react';

// // // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime }) => {
// // //     const total = subtotal + gst + shippingCharges;

// // //     // let leadTime;
// // //     // if (total >= 10000) {
// // //     //     leadTime = "10 Days";
// // //     // } else if (total > 1000) {
// // //     //     leadTime = "5 Days";
// // //     // } else if (total > 500) {
// // //     //     leadTime = "4 Days";
// // //     // } else if (total > 200) {
// // //     //     leadTime = "3 Days";
// // //     // } else if (total > 100) {
// // //     //     leadTime = "2 Day"; 
// // //     // } else {
// // //     //     leadTime = "1 Day"; // Default case
// // //     // }

// // //     return (
// // //         <div className="container border-top mt-4">
// // //             <table className="table">
// // //                 <tbody>
// // //                     <tr>
// // //                         <th className='fw-normal'>Order ID</th>
// // //                         <td>{orderId}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>Total Files:</th>
// // //                         <td>{files.length}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>Lead Time:</th>
// // //                         <td>{leadTime}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>Sub Total:</th>
// // //                         <td>₹ {subtotal}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>GST 18%:</th>
// // //                         <td>₹ {gst}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>Shipping</th>
// // //                         <td>₹ {shippingCharges}</td>
// // //                     </tr>
// // //                     <tr>
// // //                         <th className='fw-normal'>Total Including GST:</th>
// // //                         <td>₹ {total}</td>
// // //                     </tr>
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //     );
// // // };

// // // export default OrderSummary;


// // import React, { useState } from 'react';

// // const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
// //     const [couponCode, setCouponCode] = useState('');
// //     const [discount, setDiscount] = useState(0); // Discount percentage
// //     const [error, setError] = useState('');

// //     const handleApplyCoupon = async () => {
// //         try {
// //             // Simulate a backend API call to validate the coupon
// //             const response = await fetch('http://localhost:3001/api/coupons/validate', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ code: couponCode }),
// //             });

// //             if (!response.ok) {
// //                 throw new Error('Invalid coupon code');
// //             }

// //             const data = await response.json();
// //             setDiscount(data.discount); // Set the discount percentage
// //             setError('');
// //             onApplyCoupon(data.discount); // Pass the discount to the parent component
// //         } catch (err) {
// //             setError(err.message || 'Failed to apply coupon');
// //             setDiscount(0);
// //         }
// //     };

// //     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

// //     return (
// //         <div className="container border-top mt-4">
// //             <table className="table">
// //                 <tbody>
// //                     <tr>
// //                         <th className="fw-normal">Order ID</th>
// //                         <td>{orderId}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Total Files:</th>
// //                         <td>{files.length}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Lead Time:</th>
// //                         <td>{leadTime}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Sub Total:</th>
// //                         <td>₹ {subtotal}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">GST 18%:</th>
// //                         <td>₹ {gst}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Shipping</th>
// //                         <td>₹ {shippingCharges}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Coupon Discount:</th>
// //                         <td>₹ {(subtotal * discount) / 100}</td>
// //                     </tr>
// //                     <tr>
// //                         <th className="fw-normal">Total Including GST:</th>
// //                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
// //                     </tr>
// //                 </tbody>
// //             </table>

// //             {/* Coupon Field */}
// //             <div className="mt-3">
// //                 <label htmlFor="coupon" className="form-label">Coupon Code</label>
// //                 <input
// //                     type="text"
// //                     id="coupon"
// //                     value={couponCode}
// //                     onChange={(e) => setCouponCode(e.target.value)}
// //                     className="form-control"
// //                     placeholder="Enter coupon code"
// //                 />
// //                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
// //                     Apply Coupon
// //                 </button>
// //                 {error && <p className="text-danger mt-2">{error}</p>}
// //                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
// //             </div>
// //         </div>
// //     );
// // };

// // export default OrderSummary;

// import React, { useState } from 'react';

// const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
//     const [couponCode, setCouponCode] = useState('');
//     const [discount, setDiscount] = useState(0); // Discount percentage
//     const [error, setError] = useState('');

//     const handleApplyCoupon = async () => {
//         try {
//           console.log('Applying coupon:', couponCode); // Debug log

//           const response = await fetch('http://localhost:3001/api/coupons/validate', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ code: couponCode }),
//           });

//           if (!response.ok) {
//             const errorData = await response.json();
//             throw new Error(errorData.message || 'Invalid coupon code');
//           }

//           const data = await response.json();
//           setDiscount(data.discount); // Set the discount percentage
//           setError('');
//           onApplyCoupon(data.discount); // Pass the discount to the parent component
//         } catch (err) {
//           setError(err.message || 'Failed to apply coupon');
//           setDiscount(0);
//         }
//       };

//     const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

//     return (
//         <div className="container border-top mt-4">
//             <table className="table">
//                 <tbody>
//                     <tr>
//                         <th className="fw-normal">Order ID</th>
//                         <td>{orderId}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Total Files:</th>
//                         <td>{files.length}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Lead Time:</th>
//                         <td>{leadTime}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Sub Total:</th>
//                         <td>₹ {subtotal}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">GST 18%:</th>
//                         <td>₹ {gst}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Shipping</th>
//                         <td>₹ {shippingCharges}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Coupon Discount:</th>
//                         <td>₹ {(subtotal * discount) / 100}</td>
//                     </tr>
//                     <tr>
//                         <th className="fw-normal">Total Including GST:</th>
//                         <td>₹ {totalAfterDiscount.toFixed(2)}</td>
//                     </tr>
//                 </tbody>
//             </table>

//             {/* Coupon Field */}
//             <div className="mt-3">
//                 <label htmlFor="coupon" className="form-label">Coupon Code</label>
//                 <input
//                     type="text"
//                     id="coupon"
//                     value={couponCode}
//                     onChange={(e) => setCouponCode(e.target.value)}
//                     className="form-control"
//                     placeholder="Enter coupon code"
//                 />
//                 <button className="btn btn-primary mt-2" onClick={handleApplyCoupon}>
//                     Apply Coupon
//                 </button>
//                 {error && <p className="text-danger mt-2">{error}</p>}
//                 {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
//             </div>
//         </div>
//     );
// };

// export default OrderSummary;

import React, { useState } from 'react';

const OrderSummary = ({ orderId, files, subtotal, gst, shippingCharges, leadTime, onApplyCoupon }) => {
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0); // Discount percentage
    const [error, setError] = useState('');

    const handleApplyCoupon = async () => {
        try {
            console.log('Applying coupon:', couponCode); // Debug log

            const response = await fetch('http://localhost:3001/api/coupons/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: couponCode }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Invalid coupon code');
            }

            const data = await response.json();
            setDiscount(data.discount); // Set the discount percentage
            setError('');
            onApplyCoupon(data.discount); // Pass the discount to the parent component
        } catch (err) {
            setError(err.message || 'Failed to apply coupon');
            setDiscount(0);
        }
    };

    const totalAfterDiscount = subtotal - (subtotal * discount) / 100 + gst + shippingCharges;

    return (
        <div className="container border-top mt-4">
            <table className="table">
                <tbody>
                    <tr>
                        <th className="fw-normal">Order ID</th>
                        <td>{orderId}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Total Files:</th>
                        <td>{files.length}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Lead Time:</th>
                        <td>{leadTime}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Sub Total:</th>
                        <td>₹ {subtotal}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">GST 18%:</th>
                        <td>₹ {gst}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Shipping</th>
                        <td>₹ {shippingCharges}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Coupon Discount:</th>
                        <td>₹ {(subtotal * discount) / 100}</td>
                    </tr>
                    <tr>
                        <th className="fw-normal">Total Including GST:</th>
                        <td>₹ {totalAfterDiscount.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>

            {/* Coupon Field */}
            <div className="mt-3">
                <label htmlFor="couponCode" className="form-label fw-bold">Coupon Code</label>
                <div className="d-flex align-items-center">
                    <input
                        type="text"
                        id="couponCode" // Unique id for the input field
                        name="couponCode" // Unique name for the input field
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="form-control me-2" // Add margin to separate the input and button
                        placeholder="Enter coupon code"
                        autoComplete="off" // Prevent browser autofill if not needed
                    />
                    <button className="btn btn-primary mx-1" onClick={handleApplyCoupon}>
                        Apply
                    </button>
                </div>
                {error && <p className="text-danger mt-2">{error}</p>}
                {discount > 0 && <p className="text-success mt-2">Coupon applied! Discount: {discount}%</p>}
            </div>
        </div>
    );
};

export default OrderSummary;