// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const StatusPage = () => {
//     const { order_id } = useParams();
//     const [order, setOrder] = useState(null);
//     const [feedback, setFeedback] = useState({ rating: 0, content: '', submitted: false });
//     const [status, setStatus] = useState({
//         placed: false,
//         processed: false,
//         shipped: false,
//         delivered: false,
//     });

//     useEffect(() => {
//         loadRazorpayScript();
//         fetchOrder();
//     }, []);

//     const loadRazorpayScript = () => {
//         const script = document.createElement('script');
//         script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//         script.async = true;
//         document.body.appendChild(script);
//     };

//     const fetchOrder = async () => {
//         try {
//             const res = await axios.get(`http://localhost:3001/orders/${order_id}`);
//             const orderData = res.data;
//             setOrder(orderData);

//             // Set order status
//             setStatus({
//                 placed: orderData.order_placed,
//                 processed: orderData.print_status === 'Printing Complete',
//                 shipped: orderData.shipping_status === 'Shipped' || orderData.shipping_status === 'Delivered',
//                 delivered: orderData.shipping_status === 'Delivered',
//             });

//         } catch (err) {
//             console.error('Error fetching order:', err);
//         }
//     };

//     const handleRazorpayPayment = () => {
//         const options = {
//             key: "rzp_live_ADtzP1cgVI1iDZ",
//             name: order.name,
//             description: "3D Printing Order",
//             image: "https://www.3ding.in/img/3d.png",
//             order_id: order.razorpay_data.id,
//             handler: async function (response) {
//                 try {
//                     const confirmRes = await axios.post("http://localhost:3001/payment-confirmation", {
//                         razorpay_order_id: order.razorpay_data.id,
//                         razorpay_payment_id: response.razorpay_payment_id,
//                         razorpay_signature: response.razorpay_signature,
//                         orderId: order.orderId,
//                     });
//                     if (confirmRes.data === "success") {
//                         alert("Payment successful!");
//                         fetchOrder(); // Refresh status
//                     }
//                 } catch (err) {
//                     console.error("Payment confirmation failed:", err);
//                 }
//             },
//             prefill: {
//                 name: order.name,
//                 email: order.email,
//             },
//             theme: {
//                 color: "#FF0000",
//             },
//         };

//         const rzp = new window.Razorpay(options);
//         rzp.open();
//     };

//     const submitFeedback = async () => {
//         try {
//             await axios.post(`http://localhost:3001/orders/feedback/${order_id}`, {
//                 ...feedback,
//                 feedback: true
//             });
//             setFeedback(prev => ({ ...prev, submitted: true }));
//             alert("Thank you for your feedback!");
//         } catch (err) {
//             console.error("Feedback failed:", err);
//         }
//     };

//     const renderStars = () => {
//         return [1, 2, 3, 4, 5].map(num => (
//             <span
//                 key={num}
//                 className={`fa fa-star fa-lg ${feedback.rating >= num ? 'active' : ''}`}
//                 onClick={() => setFeedback(prev => ({ ...prev, rating: num }))}
//                 style={{ cursor: 'pointer', marginRight: 5 }}
//             />
//         ));
//     };

//     if (!order) return <div>Loading...</div>;

//     return (
//         <div className="container py-5">
//             <h4 className="text-center">Order ID: {order_id}</h4>
//             <ol className="progtrckr" data-progtrckr-steps="4">
//                 <li className={status.placed ? 'progtrckr-done' : 'progtrckr-todo'}>Placed</li>
//                 <li className={status.processed ? 'progtrckr-done' : status.placed ? 'progtrckr-done1' : 'progtrckr-todo'}>Processed</li>
//                 <li className={status.shipped ? 'progtrckr-done' : status.processed ? 'progtrckr-done1' : 'progtrckr-todo'}>Shipped</li>
//                 <li className={status.delivered ? 'progtrckr-done' : 'progtrckr-todo'}>Delivered</li>
//             </ol>

//             <div className="text-center my-4">
//                 {!order.payment_status && (
//                     <button className="btn btn-success" onClick={handleRazorpayPayment}>
//                         Proceed to Pay
//                     </button>
//                 )}

//                 {status.shipped && (
//                     <div className="mt-4">
//                         <h6>Tracking Number: {order.tracking_number}</h6>
//                         <h6>Courier: {order.courier_services}</h6>
//                     </div>
//                 )}
//             </div>

//             {status.delivered && !feedback.submitted && !order.feedback && (
//                 <div className="mt-5 text-center">
//                     <h5>Rate Your Experience</h5>
//                     <div className="mb-2">{renderStars()}</div>
//                     <textarea
//                         rows="4"
//                         className="form-control mb-3"
//                         placeholder="Leave feedback..."
//                         value={feedback.content}
//                         onChange={(e) => setFeedback(prev => ({ ...prev, content: e.target.value }))}
//                     />
//                     <button className="btn btn-primary" onClick={submitFeedback}>Submit Feedback</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default StatusPage;

// // src/pages/StatusPage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import '../styles/Status.css';

// const API_BASE = "http://localhost:3001";
// const socket = io(API_BASE, { transports: ["websocket"] });

// const StatusPage = () => {
//   const { order_id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedback, setFeedback] = useState({ rating: 0, content: "", submitted: false });

//   useEffect(() => {
//     const s = document.createElement("script");
//     s.src = "https://checkout.razorpay.com/v1/checkout.js";
//     s.async = true;
//     document.body.appendChild(s);
//     return () => document.body.removeChild(s);
//   }, []);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/orders/${order_id}`);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Error fetching order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();

//     socket.on("orderUpdated", ({ orderId, updatedOrder }) => {
//       if (String(orderId) === String(order_id)) setOrder(updatedOrder);
//     });
//     return () => socket.off("orderUpdated");
//   }, [order_id]);

//   // ---- STEP INDEX (0..3) ----
//   const stepIndex = useMemo(() => {
//     if (!order) return 0;

//     const ps = (order.printStatus || order.print_status || "").toLowerCase();
//     const ss = (order.shippingStatus || order.shipping_status || "").toLowerCase();

//     if (ss === "delivered") return 3;
//     if (ss === "shipped") return 2;

//     // "Ready for Pickup" is still before Shipping → keep at Processing
//     if (ss === "ready for pickup") return 1;

//     if (["print in progress", "paused", "completed"].includes(ps)) return 1;

//     return 0; // Placed
//   }, [order]);

//   // ---- MESSAGE TEXT ----
// //   const displayMessage = useMemo(() => {
// //     if (!order) return "Loading your order...";

// //     const ps = (order.printStatus || order.print_status || "").toLowerCase();
// //     const ss = (order.shippingStatus || order.shipping_status || "").toLowerCase();

// //     if (ss === "delivered") return "Your order has been successfully delivered.";
// //     if (ss === "shipped") return "Your order has shipped. It will arrive soon.";
// //     if (ss === "ready for pickup") return "Your order is ready for pickup.";

// //     if (ps === "completed") return "Your order has been processed. We’re preparing it to ship.";
// //     if (ps === "print in progress") return "Your order is being processed. We’ll update you when it’s done.";
// //     if (ps === "paused") return "Your order is paused. Our team will reach out shortly.";

// //     return "A representative will verify your files and process the order shortly.";
// //   }, [order]);

// // ---- MESSAGE TEXT ----
// const displayMessage = useMemo(() => {
//     if (!order) return "Loading your order...";
  
//     const ps = order.print_status || order.printStatus || "";
//     const ss = order.shipping_status || order.shippingStatus || "";
//     const op = order.order_placed;
//     const os = order.order_shipped;
  
//     if (op && ps !== "Printing Complete") {
//       if (ps === "Awaiting Confirmation") {
//         return "A representative will manually verify your files for printability & process it for printing shortly.";
//       } else if (ps === "File Error") {
//         return "Looks like there are some errors with your files. One of our Engineers will contact you to assist further.";
//       } else {
//         return "Your order is being processed. We’ll update you when it’s done.";
//       }
//     } 
//     else if (op && ps === "Printing Complete" && ss !== "Shipped" && ss !== "Delivered") {
//       return "Your order has been processed successfully. We’re preparing it to ship.";
//     } 
//     else if (op && ps === "Printing Complete" && ss === "Shipped" && os === true) {
//       return "Your order has been shipped, Your order will arrive soon.";
//     } 
//     else if (op && ps === "Printing Complete" && ss === "Delivered" && os === true) {
//       return "Your order has been successfully delivered, Kindly rate it & provide feedback if any.";
//     } 
//     else {
//       return "Welcome to 3Ding; Kindly place an order to proceed further.";
//     }
//   }, [order]);
  

//   const handleRazorpayPayment = async () => {
//     try {
//       if (!window.Razorpay) {
//         alert("Payment library not loaded yet. Please try again in a moment.");
//         return;
//       }
//       const { data: razorpayOrder } = await axios.post(`${API_BASE}/create-razorpay-order`, {
//         orderId: order.orderId,
//       });

//       const options = {
//         key: "rzp_live_ADtzP1cgVI1iDZ" || "rzp_test_xxxxxxxx",
//         name: order?.billingDetails?.name || "3Ding Customer",
//         description: "3D Printing Order",
//         image: "https://www.3ding.in/img/3d.png",
//         order_id: razorpayOrder.id,
//         handler: async (response) => {
//           try {
//             const confirmRes = await axios.post(`${API_BASE}/payment-confirmation`, {
//               razorpay_order_id: razorpayOrder.id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId: order.orderId,
//             });
//             if (confirmRes.data === "success") {
//               const latest = await axios.get(`${API_BASE}/orders/${order_id}`);
//               setOrder(latest.data);
//               alert("Payment successful!");
//             } else {
//               alert("Payment verification failed.");
//             }
//           } catch (err) {
//             console.error("Payment confirmation failed:", err);
//             alert("Payment confirmation failed.");
//           }
//         },
//         prefill: {
//           name: order?.billingDetails?.name || "",
//           email: order?.billingDetails?.email || order?.email || "",
//         },
//         theme: { color: "#FF0000" },
//       };
//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("Failed to create Razorpay order:", err);
//       alert("Could not initiate payment. Please try again.");
//     }
//   };

//   const submitFeedback = async () => {
//     try {
//       await axios.post(`${API_BASE}/orders/feedback/${order_id}`, {
//         rating: feedback.rating,
//         content: feedback.content,
//         feedback: true,
//       });
//       setFeedback((p) => ({ ...p, submitted: true }));
//       alert("Thank you for your feedback!");
//     } catch (err) {
//       console.error("Feedback failed:", err);
//       alert("Failed to submit feedback. Please try again.");
//     }
//   };

//   const renderStars = () =>
//     [1, 2, 3, 4, 5].map((n) => (
//       <span
//         key={n}
//         className={`fa fa-star fa-lg ${feedback.rating >= n ? "active" : ""}`}
//         onClick={() => setFeedback((p) => ({ ...p, rating: n }))}
//         style={{ cursor: "pointer", marginRight: 6 }}
//       />
//     ));

//   if (loading) return <div className="p-4">Loading…</div>;
//   if (!order) return <div className="p-4">No order found.</div>;

//   const paymentDone = order.paymentStatus === true || (order.status || "").toLowerCase() === "paid";
//   const trackingNumber = order.trackingNumber || order.tracking_number || "";
//   const courierService = order.courierService || order.courier_services || "";

//   const steps = ["Placed", "Processing", "Shipping", "Delivered"];

//   return (
//     <div className="status-container">
//       <h2 className="order-title">Your order id: {order_id}</h2>

//       {/* Progress bar */}
//       <div className="stepper">
//         <div className="track">
//           <div
//             className="track-fill"
//             style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
//           />
//         </div>
//         <ul className="steps">
//           {steps.map((label, i) => {
//             const done = i < stepIndex;
//             const current = i === stepIndex;
//             return (
//               <li key={label} className={`step ${done ? "done" : ""} ${current ? "current" : ""}`}>
//                 <span className="dot">{done ? "✓" : ""}</span>
//                 <span className="label">{label}</span>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <h5 className="status-message">{displayMessage}</h5>

//       {!paymentDone && (
//         <div className="cta">
//           <button className="btn btn-success" onClick={handleRazorpayPayment}>
//             Proceed to Pay
//           </button>
//         </div>
//       )}

//       {/* Tracking only when shipped/delivered */}
//       {(["shipped", "delivered"].includes((order.shippingStatus || "").toLowerCase())) && (
//         <div className="tracking">
//           <h6>Your Tracking Id: <strong>{trackingNumber || "—"}</strong></h6>
//           <h6>Courier Service: <strong>{courierService || "—"}</strong></h6>
//         </div>
//       )}

//       {stepIndex === 3 && !feedback.submitted && !order?.feedback?.rating && (
//         <div className="feedback">
//           <h5>Rate Your Experience</h5>
//           <div className="stars">{renderStars()}</div>
//           <textarea
//             rows="4"
//             className="form-control mb-3"
//             placeholder="Leave feedback..."
//             value={feedback.content}
//             onChange={(e) => setFeedback((p) => ({ ...p, content: e.target.value }))}
//           />
//           <button className="btn btn-primary" onClick={submitFeedback}>
//             Submit Feedback
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatusPage;

// // src/pages/StatusPage.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { io } from "socket.io-client";
// import '../styles/Status.css';

// const API_BASE = "http://localhost:3001";
// const socket = io(API_BASE, { transports: ["websocket"] });

// const StatusPage = () => {
//   const { order_id } = useParams();
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [feedback, setFeedback] = useState({ rating: 0, content: "", submitted: false });

//   useEffect(() => {
//     const s = document.createElement("script");
//     s.src = "https://checkout.razorpay.com/v1/checkout.js";
//     s.async = true;
//     document.body.appendChild(s);
//     return () => document.body.removeChild(s);
//   }, []);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/orders/${order_id}`);
//         setOrder(res.data);
//       } catch (err) {
//         console.error("Error fetching order:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrder();

//     socket.on("orderUpdated", ({ orderId, updatedOrder }) => {
//       if (String(orderId) === String(order_id)) setOrder(updatedOrder);
//     });
//     return () => socket.off("orderUpdated");
//   }, [order_id]);

//   // ---- STEP INDEX (0..3) ----
//   // Mirrors your original shipping/printing rules with exact string checks.
//   const stepIndex = useMemo(() => {
//     if (!order) return 0;

//     const ps = order.print_status ?? order.printStatus ?? "";
//     const ss = order.shipping_status ?? order.shippingStatus ?? "";
//     const op = order.order_placed === true;
//     const os = order.order_shipped === true;

//     // Placed -> Processing
//     if (op && ps !== "Printing Complete") return 1;

//     // Printing complete, not shipped/delivered yet -> Shipping prep
//     if (op && ps === "Printing Complete" && ss !== "Shipped" && ss !== "Delivered") return 2;

//     // Shipped -> still in Shipping step
//     if (op && ps === "Printing Complete" && ss === "Shipped" && os) return 2;

//     // Delivered -> Delivered step
//     if (op && ps === "Printing Complete" && ss === "Delivered" && os) return 3;

//     // Default
//     return 0;
//   }, [order]);

//   // ---- MESSAGE TEXT ----
//   // Uses the same conditional flow/strings as your provided map(...) snippet.
//   const displayMessage = useMemo(() => {
//     if (!order) return "Loading your order...";

//     const ps = order.print_status ?? order.printStatus ?? "";
//     const ss = order.shipping_status ?? order.shippingStatus ?? "";
//     const op = order.order_placed === true;
//     const os = order.order_shipped === true;

//     if (op && ps !== "Printing Complete") {
//       if (ps === "Awaiting Confirmation") {
//         return "A representative will manually verify your files for printability & process it for printing shortly.";
//       } else if (ps === "File Error") {
//         return "Looks like there are some errors with your files. One of our Engineers will contact you to assist further.";
//       } else {
//         return "Your order is being processed. We’ll update you when it’s done.";
//       }
//     } else if (op && ps === "Printing Complete" && ss !== "Shipped" && ss !== "Delivered") {
//       return "Your order has been processed successfully. We’re preparing it to ship.";
//     } else if (op && ps === "Printing Complete" && ss === "Shipped" && os) {
//       return " Your order has been shipped , Your order will be arrived soon.";
//     } else if (op && ps === "Printing Complete" && ss === "Delivered" && os) {
//       return "Your order has been successfully delivered, Kindly rate it & provide feedback if any. ";
//     } else {
//       return "Welcome to 3Ding; Kindly place an order to proceed further.";
//     }
//   }, [order]);

//   const handleRazorpayPayment = async () => {
//     try {
//       if (!window.Razorpay) {
//         alert("Payment library not loaded yet. Please try again in a moment.");
//         return;
//       }
//       const { data: razorpayOrder } = await axios.post(`${API_BASE}/create-razorpay-order`, {
//         orderId: order.orderId,
//       });

//       const options = {
//         key: "rzp_live_ADtzP1cgVI1iDZ" || "rzp_test_xxxxxxxx",
//         name: order?.billingDetails?.name || "3Ding Customer",
//         description: "3D Printing Order",
//         image: "https://www.3ding.in/img/3d.png",
//         order_id: razorpayOrder.id,
//         handler: async (response) => {
//           try {
//             const confirmRes = await axios.post(`${API_BASE}/payment-confirmation`, {
//               razorpay_order_id: razorpayOrder.id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId: order.orderId,
//             });
//             if (confirmRes.data === "success") {
//               const latest = await axios.get(`${API_BASE}/orders/${order_id}`);
//               setOrder(latest.data);
//               alert("Payment successful!");
//             } else {
//               alert("Payment verification failed.");
//             }
//           } catch (err) {
//             console.error("Payment confirmation failed:", err);
//             alert("Payment confirmation failed.");
//           }
//         },
//         prefill: {
//           name: order?.billingDetails?.name || "",
//           email: order?.billingDetails?.email || order?.email || "",
//         },
//         theme: { color: "#FF0000" },
//       };
//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("Failed to create Razorpay order:", err);
//       alert("Could not initiate payment. Please try again.");
//     }
//   };

//   const submitFeedback = async () => {
//     try {
//       await axios.post(`${API_BASE}/orders/feedback/${order_id}`, {
//         rating: feedback.rating,
//         content: feedback.content,
//         feedback: true,
//       });
//       setFeedback((p) => ({ ...p, submitted: true }));
//       alert("Thank you for your feedback!");
//     } catch (err) {
//       console.error("Feedback failed:", err);
//       alert("Failed to submit feedback. Please try again.");
//     }
//   };

//   const renderStars = () =>
//     [1, 2, 3, 4, 5].map((n) => (
//       <span
//         key={n}
//         className={`fa fa-star fa-lg ${feedback.rating >= n ? "active" : ""}`}
//         onClick={() => setFeedback((p) => ({ ...p, rating: n }))}
//         style={{ cursor: "pointer", marginRight: 6 }}
//       />
//     ));

//   if (loading) return <div className="p-4">Loading…</div>;
//   if (!order) return <div className="p-4">No order found.</div>;

//   const paymentDone = order.paymentStatus === true || (order.status || "").toLowerCase() === "paid";
//   const trackingNumber = order.trackingNumber || order.tracking_number || "";
//   const courierService = order.courierService || order.courier_services || "";

//   const steps = ["Placed", "Processing", "Shipping", "Delivered"];

//   return (
//     <div className="status-container">
//       <h2 className="order-title">Your order id: {order_id}</h2>

//       {/* Progress bar */}
//       <div className="stepper">
//         <div className="track">
//           <div
//             className="track-fill"
//             style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
//           />
//         </div>
//         <ul className="steps">
//           {steps.map((label, i) => {
//             const done = i < stepIndex;
//             const current = i === stepIndex;
//             return (
//               <li key={label} className={`step ${done ? "done" : ""} ${current ? "current" : ""}`}>
//                 <span className="dot">{done ? "✓" : ""}</span>
//                 <span className="label">{label}</span>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       <h5 className="status-message">{displayMessage}</h5>

//       {!paymentDone && (
//         <div className="cta">
//           <button className="btn btn-success" onClick={handleRazorpayPayment}>
//             Proceed to Pay
//           </button>
//         </div>
//       )}

//       {/* Tracking only when shipped/delivered */}
//       {(["shipped", "delivered"].includes((order.shippingStatus || order.shipping_status || "").toLowerCase())) && (
//         <div className="tracking">
//           <h6>Your Tracking Id: <strong>{trackingNumber || "—"}</strong></h6>
//           <h6>Courier Service: <strong>{courierService || "—"}</strong></h6>
//         </div>
//       )}

//       {stepIndex === 3 && !feedback.submitted && !order?.feedback?.rating && (
//         <div className="feedback">
//           <h5>Rate Your Experience</h5>
//           <div className="stars">{renderStars()}</div>
//           <textarea
//             rows="4"
//             className="form-control mb-3"
//             placeholder="Leave feedback..."
//             value={feedback.content}
//             onChange={(e) => setFeedback((p) => ({ ...p, content: e.target.value }))}
//           />
//           <button className="btn btn-primary" onClick={submitFeedback}>
//             Submit Feedback
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StatusPage;

// src/pages/StatusPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import "../styles/Status.css";

const API_BASE = "http://localhost:3001";
const socket = io(API_BASE, { transports: ["websocket"] });

// ---- helpers for tolerant status handling ----
const norm = (s) => (s || "").toString().trim().toLowerCase();
const isPrintComplete = (ps) =>
  ["completed", "printing complete", "print complete", "done"].includes(norm(ps));
const isShipped = (ss) => norm(ss) === "shipped";
const isDelivered = (ss) => norm(ss) === "delivered";
const hasOrderPlaced = (o) =>
  o?.order_placed === true ||
  o?.orderPlaced === true ||
  Boolean(o?.createdAt || (Array.isArray(o?.files) && o.files.length > 0));

const StatusPage = () => {
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({ rating: 0, content: "", submitted: false });

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_BASE}/orders/${order_id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();

    socket.on("orderUpdated", ({ orderId, updatedOrder }) => {
      if (String(orderId) === String(order_id)) setOrder(updatedOrder);
    });
    return () => socket.off("orderUpdated");
  }, [order_id]);

  // ---- step index (0..3) ----
  const stepIndex = useMemo(() => {
    if (!order) return 0;

    const ps = order.print_status ?? order.printStatus ?? "";
    const ss = order.shipping_status ?? order.shippingStatus ?? "";

    const placed = hasOrderPlaced(order);
    if (!placed) return 0;

    if (!isPrintComplete(ps)) return 1;               // Processing
    if (!isDelivered(ss)) return 2;                   // Shipping (prep or shipped)
    return 3;                                         // Delivered
  }, [order]);

  // ---- status message ----
  const displayMessage = useMemo(() => {
    if (!order) return "Loading your order...";

    const ps = order.print_status ?? order.printStatus ?? "";
    const ss = order.shipping_status ?? order.shippingStatus ?? "";

    if (!hasOrderPlaced(order)) {
      return "Welcome to 3Ding; Kindly place an order to proceed further.";
    }

    if (!isPrintComplete(ps)) {
      if (norm(ps) === "awaiting confirmation") {
        return "A representative will manually verify your files for printability & process it for printing shortly.";
      } else if (norm(ps) === "file error") {
        return "Looks like there are some errors with your files. One of our Engineers will contact you to assist further.";
      }
      return "Your order is being processed. We’ll update you when it’s done.";
    }

    if (!isShipped(ss) && !isDelivered(ss)) {
      return "Your order has been processed successfully. We’re preparing it to ship.";
    }

    if (isShipped(ss)) {
      return "Your order has been shipped. It will arrive soon.";
    }

    if (isDelivered(ss)) {
      return "Your order has been successfully delivered, Kindly rate it & provide feedback if any.";
    }

    return "Your order status is being updated.";
  }, [order]);

  const handleRazorpayPayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Payment library not loaded yet. Please try again in a moment.");
        return;
      }
      const { data: razorpayOrder } = await axios.post(`${API_BASE}/create-razorpay-order`, {
        orderId: order.orderId,
      });

      const options = {
        key: "rzp_live_ADtzP1cgVI1iDZ" || "rzp_test_xxxxxxxx",
        name: order?.billingDetails?.name || "3Ding Customer",
        description: "3D Printing Order",
        image: "https://www.3ding.in/img/3d.png",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            const confirmRes = await axios.post(`${API_BASE}/payment-confirmation`, {
              razorpay_order_id: razorpayOrder.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order.orderId,
            });
            if (confirmRes.data === "success") {
              const latest = await axios.get(`${API_BASE}/orders/${order_id}`);
              setOrder(latest.data);
              alert("Payment successful!");
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error("Payment confirmation failed:", err);
            alert("Payment confirmation failed.");
          }
        },
        prefill: {
          name: order?.billingDetails?.name || "",
          email: order?.billingDetails?.email || order?.email || "",
        },
        theme: { color: "#FF0000" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Failed to create Razorpay order:", err);
      alert("Could not initiate payment. Please try again.");
    }
  };

  const submitFeedback = async () => {
    try {
      await axios.post(`${API_BASE}/orders/feedback/${order_id}`, {
        rating: feedback.rating,
        content: feedback.content,
        feedback: true,
      });
      setFeedback((p) => ({ ...p, submitted: true }));
      alert("Thank you for your feedback!");
    } catch (err) {
      console.error("Feedback failed:", err);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const renderStars = () =>
    [1, 2, 3, 4, 5].map((n) => (
      <span
        key={n}
        className={`fa fa-star fa-lg ${feedback.rating >= n ? "active" : ""}`}
        onClick={() => setFeedback((p) => ({ ...p, rating: n }))}
        style={{ cursor: "pointer", marginRight: 6 }}
      />
    ));

  if (loading) return <div className="p-4">Loading…</div>;
  if (!order) return <div className="p-4">No order found.</div>;

  const paymentDone = order.paymentStatus === true || (order.status || "").toLowerCase() === "paid";
  const trackingNumber = order.trackingNumber || order.tracking_number || "";
  const courierService = order.courierService || order.courier_services || "";

  const steps = ["Placed", "Processing", "Shipping", "Delivered"];

  return (
    <div className="status-container">
      <h2 className="order-title">Your order id: {order_id}</h2>

      {/* Progress bar */}
      <div className="stepper">
        <div className="track">
          <div
            className="track-fill"
            style={{ width: `${(stepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>
        <ul className="steps">
          {steps.map((label, i) => {
            const done = i < stepIndex;
            const current = i === stepIndex;
            return (
              <li key={label} className={`step ${done ? "done" : ""} ${current ? "current" : ""}`}>
                <span className="dot">{done ? "✓" : ""}</span>
                <span className="label">{label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <h5 className="status-message">{displayMessage}</h5>

      {!paymentDone && (
        <div className="cta">
          <button className="btn btn-success" onClick={handleRazorpayPayment}>
            Proceed to Pay
          </button>
        </div>
      )}

      {/* Tracking only when shipped/delivered */}
      {(["shipped", "delivered"].includes((order.shippingStatus || order.shipping_status || "").toLowerCase())) && (
        <div className="tracking">
          <h6>Your Tracking Id: <strong>{trackingNumber || "—"}</strong></h6>
          <h6>Courier Service: <strong>{courierService || "—"}</strong></h6>
        </div>
      )}

      {stepIndex === 3 && !feedback.submitted && !order?.feedback?.rating && (
        <div className="feedback">
          <h5>Rate Your Experience</h5>
          <div className="stars">{renderStars()}</div>
          <textarea
            rows="4"
            className="form-control mb-3"
            placeholder="Leave feedback..."
            value={feedback.content}
            onChange={(e) => setFeedback((p) => ({ ...p, content: e.target.value }))}
          />
          <button className="btn btn-primary" onClick={submitFeedback}>
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusPage;
