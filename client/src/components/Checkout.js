// // // // import React from "react";
// // // // import { useParams } from "react-router-dom";

// // // // const Checkout = () => {
// // // //     const { orderId } = useParams(); // Get the orderId from the URL

// // // //     return (
// // // //         <div className="container mt-5">
// // // //             <h1 className="text-center">Checkout</h1>
// // // //             <p className="text-center">Order ID: {orderId}</p>
// // // //             <p className="text-center">Proceed with your payment and finalize your order.</p>
// // // //             <button
// // // //                 className="btn btn-primary d-block mx-auto"
// // // //                 onClick={() => alert("Payment functionality to be implemented.")}
// // // //             >
// // // //                 Proceed to Payment
// // // //             </button>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Checkout;

// // // import React, { Component } from "react";
// // // import { Button, Container, Row, Col, Form } from "react-bootstrap";
// // // import { Redirect } from "react-router-dom";
// // // import axios from "axios";

// // // class Checkout extends Component {
// // //     constructor(props) {
// // //         super(props);
// // //         this.state = {
// // //             orderId: this.props.match.params.orderId || null, // Get orderId from URL params
// // //             name: "",
// // //             email: "",
// // //             mobile: "",
// // //             billingAddress: "",
// // //             city: "",
// // //             pin: "",
// // //             state: "",
// // //             shippingAddress: "",
// // //             paymentStatus: false,
// // //             errors: {},
// // //         };
// // //     }

// // //     validate = () => {
// // //         const errors = {};
// // //         if (!this.state.name) errors.name = "Name is required.";
// // //         if (!this.state.email || !this.state.email.includes("@"))
// // //             errors.email = "Valid email is required.";
// // //         if (!this.state.mobile) errors.mobile = "Mobile number is required.";
// // //         if (!this.state.billingAddress)
// // //             errors.billingAddress = "Billing address is required.";
// // //         if (!this.state.city) errors.city = "City is required.";
// // //         if (!this.state.pin) errors.pin = "PIN is required.";
// // //         if (!this.state.state) errors.state = "State is required.";
// // //         if (!this.state.shippingAddress)
// // //             errors.shippingAddress = "Shipping address is required.";

// // //         this.setState({ errors });
// // //         return Object.keys(errors).length === 0;
// // //     };

// // //     handleInputChange = (e) => {
// // //         const { name, value } = e.target;
// // //         this.setState({ [name]: value });
// // //     };

// // //     handleSubmit = async (e) => {
// // //         e.preventDefault();
// // //         if (!this.validate()) return;

// // //         try {
// // //             const response = await axios.post(
// // //                 "http://localhost:3001/submit-checkout",
// // //                 this.state
// // //             );
// // //             if (response.status === 200) {
// // //                 alert("Order submitted successfully!");
// // //                 this.setState({ paymentStatus: true });
// // //             }
// // //         } catch (error) {
// // //             console.error("Error submitting checkout:", error);
// // //         }
// // //     };

// // //     render() {
// // //         if (this.state.paymentStatus) {
// // //             return <Redirect to={`/status/${this.state.orderId}`} />;
// // //         }

// // //         const { errors } = this.state;

// // //         return (
// // //             <Container>
// // //                 <h1 className="text-center mt-5">Checkout</h1>
// // //                 <Form onSubmit={this.handleSubmit}>
// // //                     <Row>
// // //                         <Col md={6}>
// // //                             <h3>Billing Details</h3>
// // //                             <Form.Group>
// // //                                 <Form.Label>Full Name</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="name"
// // //                                     value={this.state.name}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.name}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.name}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>Email</Form.Label>
// // //                                 <Form.Control
// // //                                     type="email"
// // //                                     name="email"
// // //                                     value={this.state.email}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.email}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.email}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>Mobile</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="mobile"
// // //                                     value={this.state.mobile}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.mobile}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.mobile}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>Billing Address</Form.Label>
// // //                                 <Form.Control
// // //                                     as="textarea"
// // //                                     rows={3}
// // //                                     name="billingAddress"
// // //                                     value={this.state.billingAddress}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.billingAddress}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.billingAddress}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>City</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="city"
// // //                                     value={this.state.city}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.city}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.city}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>PIN</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="pin"
// // //                                     value={this.state.pin}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.pin}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.pin}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                             <Form.Group>
// // //                                 <Form.Label>State</Form.Label>
// // //                                 <Form.Control
// // //                                     type="text"
// // //                                     name="state"
// // //                                     value={this.state.state}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.state}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.state}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                         </Col>
// // //                         <Col md={6}>
// // //                             <h3>Shipping Details</h3>
// // //                             <Form.Group>
// // //                                 <Form.Label>Shipping Address</Form.Label>
// // //                                 <Form.Control
// // //                                     as="textarea"
// // //                                     rows={3}
// // //                                     name="shippingAddress"
// // //                                     value={this.state.shippingAddress}
// // //                                     onChange={this.handleInputChange}
// // //                                     isInvalid={!!errors.shippingAddress}
// // //                                 />
// // //                                 <Form.Control.Feedback type="invalid">
// // //                                     {errors.shippingAddress}
// // //                                 </Form.Control.Feedback>
// // //                             </Form.Group>
// // //                         </Col>
// // //                     </Row>
// // //                     <div className="text-center mt-4">
// // //                         <Button variant="primary" type="submit">
// // //                             Proceed to Payment
// // //                         </Button>
// // //                     </div>
// // //                 </Form>
// // //             </Container>
// // //         );
// // //     }
// // // }

// // // export default Checkout;

// // // import React, { Component } from "react";
// // // import { Button, Container, Row, Col, Form } from "react-bootstrap";
// // // import { Navigate } from "react-router-dom"; // Use Navigate instead of Redirect
// // // import axios from "axios";

// // // class Checkout extends Component {
// // //   constructor(props) {
// // //     super(props);
// // //     this.state = {
// // //       orderId: this.props.match?.params?.orderId || null, // Get orderId from URL params
// // //       name: "",
// // //       email: "",
// // //       mobile: "",
// // //       billingAddress: "",
// // //       city: "",
// // //       pin: "",
// // //       state: "",
// // //       shippingAddress: "",
// // //       paymentStatus: false,
// // //       errors: {},
// // //     };
// // //   }

// // //   validate = () => {
// // //     const errors = {};
// // //     if (!this.state.name) errors.name = "Name is required.";
// // //     if (!this.state.email || !this.state.email.includes("@"))
// // //       errors.email = "Valid email is required.";
// // //     if (!this.state.mobile) errors.mobile = "Mobile number is required.";
// // //     if (!this.state.billingAddress)
// // //       errors.billingAddress = "Billing address is required.";
// // //     if (!this.state.city) errors.city = "City is required.";
// // //     if (!this.state.pin) errors.pin = "PIN is required.";
// // //     if (!this.state.state) errors.state = "State is required.";
// // //     if (!this.state.shippingAddress)
// // //       errors.shippingAddress = "Shipping address is required.";

// // //     this.setState({ errors });
// // //     return Object.keys(errors).length === 0;
// // //   };

// // //   handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     this.setState({ [name]: value });
// // //   };

// // //   handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!this.validate()) return;

// // //     try {
// // //       const response = await axios.post(
// // //         "http://localhost:3001/submit-checkout",
// // //         this.state
// // //       );
// // //       if (response.status === 200) {
// // //         alert("Order submitted successfully!");
// // //         this.setState({ paymentStatus: true });
// // //       }
// // //     } catch (error) {
// // //       console.error("Error submitting checkout:", error);
// // //     }
// // //   };

// // //   render() {
// // //     if (this.state.paymentStatus) {
// // //       return <Navigate to={`/status/${this.state.orderId}`} />; // Use Navigate for redirection
// // //     }

// // //     const { errors } = this.state;

// // //     return (
// // //       <Container>
// // //         <h1 className="text-center mt-5">Checkout</h1>
// // //         <Form onSubmit={this.handleSubmit}>
// // //           <Row>
// // //             <Col md={6}>
// // //               <h3>Billing Details</h3>
// // //               <Form.Group>
// // //                 <Form.Label>Full Name</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   name="name"
// // //                   value={this.state.name}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.name}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.name}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>Email</Form.Label>
// // //                 <Form.Control
// // //                   type="email"
// // //                   name="email"
// // //                   value={this.state.email}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.email}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.email}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>Mobile</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   name="mobile"
// // //                   value={this.state.mobile}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.mobile}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.mobile}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>Billing Address</Form.Label>
// // //                 <Form.Control
// // //                   as="textarea"
// // //                   rows={3}
// // //                   name="billingAddress"
// // //                   value={this.state.billingAddress}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.billingAddress}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.billingAddress}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>City</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   name="city"
// // //                   value={this.state.city}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.city}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.city}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>PIN</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   name="pin"
// // //                   value={this.state.pin}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.pin}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.pin}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //               <Form.Group>
// // //                 <Form.Label>State</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   name="state"
// // //                   value={this.state.state}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.state}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.state}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //             </Col>
// // //             <Col md={6}>
// // //               <h3>Shipping Details</h3>
// // //               <Form.Group>
// // //                 <Form.Label>Shipping Address</Form.Label>
// // //                 <Form.Control
// // //                   as="textarea"
// // //                   rows={3}
// // //                   name="shippingAddress"
// // //                   value={this.state.shippingAddress}
// // //                   onChange={this.handleInputChange}
// // //                   isInvalid={!!errors.shippingAddress}
// // //                 />
// // //                 <Form.Control.Feedback type="invalid">
// // //                   {errors.shippingAddress}
// // //                 </Form.Control.Feedback>
// // //               </Form.Group>
// // //             </Col>
// // //           </Row>
// // //           <div className="text-center mt-4">
// // //             <Button variant="primary" type="submit">
// // //               Proceed to Payment
// // //             </Button>
// // //           </div>
// // //         </Form>
// // //       </Container>
// // //     );
// // //   }
// // // }


// // // export default Checkout;
// // import React, { useState } from "react";
// // import { Button, Container, Row, Col, Form } from "react-bootstrap";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";

// // const Checkout = () => {
// //   const { orderId } = useParams(); // ✅ Get orderId from URL
// //   const navigate = useNavigate();

// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     mobile: "",
// //     billingAddress: "",
// //     city: "",
// //     pin: "",
// //     state: "",
// //     shippingAddress: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [paymentStatus, setPaymentStatus] = useState(false);

// //   const validate = () => {
// //     const err = {};
// //     if (!form.name) err.name = "Name is required.";
// //     if (!form.email || !form.email.includes("@")) err.email = "Valid email is required.";
// //     if (!form.mobile) err.mobile = "Mobile number is required.";
// //     if (!form.billingAddress) err.billingAddress = "Billing address is required.";
// //     if (!form.city) err.city = "City is required.";
// //     if (!form.pin) err.pin = "PIN is required.";
// //     if (!form.state) err.state = "State is required.";
// //     if (!form.shippingAddress) err.shippingAddress = "Shipping address is required.";

// //     setErrors(err);
// //     return Object.keys(err).length === 0;
// //   };

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     try {
// //       const response = await axios.post("http://localhost:3001/submit-checkout", {
// //         orderId,
// //         ...form,
// //       });

// //       if (response.status === 200) {
// //         alert("Order submitted successfully!");
// //         setPaymentStatus(true);
// //       }
// //     } catch (error) {
// //       console.error("Error submitting checkout:", error);
// //       alert("Submission failed. Check console for details.");
// //     }
// //   };

// //   if (paymentStatus) {
// //     return navigate(`/status/${orderId}`);
// //   }

// //   return (
// //     <Container>
// //       <h1 className="text-center mt-5">Checkout</h1>
// //       <Form onSubmit={handleSubmit}>
// //         <Row>
// //           <Col md={6}>
// //             <h4>Billing Details</h4>
// //             {["name", "email", "mobile", "billingAddress", "city", "pin", "state"].map((field) => (
// //               <Form.Group className="mb-2" key={field}>
// //                 <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
// //                 <Form.Control
// //                   type={field === "billingAddress" ? "textarea" : "text"}
// //                   name={field}
// //                   rows={field === "billingAddress" ? 3 : undefined}
// //                   value={form[field]}
// //                   onChange={handleChange}
// //                   isInvalid={!!errors[field]}
// //                 />
// //                 <Form.Control.Feedback type="invalid">
// //                   {errors[field]}
// //                 </Form.Control.Feedback>
// //               </Form.Group>
// //             ))}
// //           </Col>
// //           <Col md={6}>
// //             <h4>Shipping Details</h4>
// //             <Form.Group className="mb-2">
// //               <Form.Label>Shipping Address</Form.Label>
// //               <Form.Control
// //                 as="textarea"
// //                 rows={3}
// //                 name="shippingAddress"
// //                 value={form.shippingAddress}
// //                 onChange={handleChange}
// //                 isInvalid={!!errors.shippingAddress}
// //               />
// //               <Form.Control.Feedback type="invalid">
// //                 {errors.shippingAddress}
// //               </Form.Control.Feedback>
// //             </Form.Group>
// //           </Col>
// //         </Row>
// //         <div className="text-center mt-4">
// //           <Button type="submit" variant="primary">
// //             Proceed to Payment
// //           </Button>
// //         </div>
// //       </Form>
// //     </Container>
// //   );
// // };

// // export default Checkout;
// import React, { useState } from "react";
// import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     billingAddress: "",
//     city: "",
//     pin: "",
//     state: "",
//     shippingAddress: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const err = {};
//     if (!form.name) err.name = "Name is required.";
//     if (!form.email || !form.email.includes("@")) err.email = "Valid email is required.";
//     if (!form.mobile) err.mobile = "Mobile number is required.";
//     if (!form.billingAddress) err.billingAddress = "Billing address is required.";
//     if (!form.city) err.city = "City is required.";
//     if (!form.pin) err.pin = "PIN is required.";
//     if (!form.state) err.state = "State is required.";
//     if (!form.shippingAddress) err.shippingAddress = "Shipping address is required.";

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const checkoutResponse = await axios.post("http://localhost:3001/submit-checkout", {
//         orderId,
//         ...form,
//       });

//       // ✅ Load Razorpay script
//       const isScriptLoaded = await loadRazorpayScript();
//       if (!isScriptLoaded) {
//         alert("Razorpay SDK failed to load. Are you online?");
//         return;
//       }

//       // ✅ Create Razorpay order on backend
//       const razorpayOrder = await axios.post("http://localhost:3001/create-razorpay-order", {
//         orderId,
//       });

//       const options = {
//         key: "RAZORPAY_KEY_ID", // ✅ Replace with your Razorpay key_id
//         amount: razorpayOrder.data.amount,
//         currency: "INR",
//         name: "3Ding",
//         description: `Order #${orderId}`,
//         order_id: razorpayOrder.data.id,
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.mobile,
//         },
//         theme: {
//           color: "#528FF0",
//         },
//         handler: async function (response) {
//           // ✅ Payment success - verify on server
//           await axios.post("http://localhost:3001/verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//             orderId,
//           });

//           // ✅ Redirect
//           navigate(`/status/${orderId}`);
//         },
//         modal: {
//           ondismiss: function () {
//             alert("Payment cancelled.");
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error("Error in checkout:", err);
//       alert("Something went wrong. Check console for details.");
//     }
//   };

//   return (
//     <Container>
//       <h1 className="text-center mt-5">Checkout</h1>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <h4>Billing Details</h4>
//             {["name", "email", "mobile", "billingAddress", "city", "pin", "state"].map((field) => (
//               <Form.Group className="mb-2" key={field}>
//                 <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
//                 <Form.Control
//                   type={field === "billingAddress" ? "textarea" : "text"}
//                   name={field}
//                   rows={field === "billingAddress" ? 3 : undefined}
//                   value={form[field]}
//                   onChange={handleChange}
//                   isInvalid={!!errors[field]}
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   {errors[field]}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             ))}
//           </Col>
//           <Col md={6}>
//             <h4>Shipping Details</h4>
//             <Form.Group className="mb-2">
//               <Form.Label>Shipping Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="shippingAddress"
//                 value={form.shippingAddress}
//                 onChange={handleChange}
//                 isInvalid={!!errors.shippingAddress}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.shippingAddress}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <div className="text-center mt-4">
//           <Button type="submit" variant="primary">
//             Proceed to Payment
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Checkout;

// import React, { useState } from "react";
// import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     billingAddress: "",
//     city: "",
//     pin: "",
//     state: "",
//     shippingAddress: "",
//   });

//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const err = {};
//     if (!form.name) err.name = "Name is required.";
//     if (!form.email || !form.email.includes("@")) err.email = "Valid email is required.";
//     if (!form.mobile) err.mobile = "Mobile number is required.";
//     if (!form.billingAddress) err.billingAddress = "Billing address is required.";
//     if (!form.city) err.city = "City is required.";
//     if (!form.pin) err.pin = "PIN is required.";
//     if (!form.state) err.state = "State is required.";
//     if (!form.shippingAddress) err.shippingAddress = "Shipping address is required.";

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const loadRazorpayScript = () =>
//     new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       // Submit checkout details
//       await axios.post("http://localhost:3001/submit-checkout", {
//         orderId,
//         ...form,
//       });

//       // Load Razorpay script
//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) {
//         alert("Razorpay SDK failed to load.");
//         return;
//       }

//       // Create Razorpay order
//       const orderRes = await axios.post("http://localhost:3001/create-razorpay-order", {
//         orderId,
//       });

//       const { id, amount, currency } = orderRes.data;

//       const options = {
//         key: "rzp_live_ADtzP1cgVI1iDZ", // ✅ Replace with your Razorpay key
//         amount,
//         currency,
//         name: "3Ding",
//         description: `Order #${orderId}`,
//         order_id: id,
//         handler: async function (response) {
//           try {
//             await axios.post("http://localhost:3001/verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId,
//             });

//             navigate(`/status/${orderId}`);
//           } catch (err) {
//             console.error("Payment verification failed:", err);
//             alert("Something went wrong. Payment failed.");
//           }
//         },
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.mobile,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Checkout failed:", error);
//       alert("Something went wrong. Payment failed.");
//     }
//   };

//   return (
//     <Container>
//       <h1 className="text-center mt-5">Checkout</h1>
//       <Form onSubmit={handleSubmit}>
//         <Row>
//           <Col md={6}>
//             <h4>Billing Details</h4>
//             {["name", "email", "mobile", "billingAddress", "city", "pin", "state"].map((field) => (
//               <Form.Group className="mb-2" key={field}>
//                 <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name={field}
//                   value={form[field]}
//                   onChange={handleChange}
//                   isInvalid={!!errors[field]}
//                 />
//                 <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
//               </Form.Group>
//             ))}
//           </Col>
//           <Col md={6}>
//             <h4>Shipping Details</h4>
//             <Form.Group className="mb-2">
//               <Form.Label>Shipping Address</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="shippingAddress"
//                 value={form.shippingAddress}
//                 onChange={handleChange}
//                 isInvalid={!!errors.shippingAddress}
//               />
//               <Form.Control.Feedback type="invalid">{errors.shippingAddress}</Form.Control.Feedback>
//             </Form.Group>
//           </Col>
//         </Row>
//         <div className="text-center mt-4">
//           <Button type="submit" variant="primary">
//             Proceed to Payment
//           </Button>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Checkout;

// import React, { useState, useEffect } from "react";
// import { Button, Container, Row, Col, Form } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Checkout = () => {
//   const { orderId } = useParams();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     company: "",
//     gst: "",
//     billingAddress: "",
//     city: "",
//     pin: "",
//     state: "",
//     shippingName: "",
//     shippingEmail: "",
//     shippingMobile: "",
//     shippingCompany: "",
//     shippingAddress: "",
//     shippingCity: "",
//     shippingPin: "",
//     shippingState: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [sameAsBilling, setSameAsBilling] = useState(false);
//   const [total, settotal] = useState(0);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/orders/${orderId}`)
//       .then(res => {
//         const order = res.data;
//         const total = order.total || 0;
//         settotal(total);
//       })
//       .catch(err => console.error("Failed to fetch order total:", err));
//   }, [orderId]);

//   useEffect(() => {
//     if (sameAsBilling) {
//       setForm(prev => ({
//         ...prev,
//         shippingName: prev.name,
//         shippingEmail: prev.email,
//         shippingMobile: prev.mobile,
//         shippingCompany: prev.company,
//         shippingAddress: prev.billingAddress,
//         shippingCity: prev.city,
//         shippingPin: prev.pin,
//         shippingState: prev.state
//       }));
//     }
//   }, [sameAsBilling, form.name, form.email, form.mobile, form.company, form.billingAddress, form.city, form.pin, form.state]);

//   const validate = () => {
//     const err = {};
//     ["name", "email", "mobile", "billingAddress", "city", "pin", "state"].forEach(field => {
//       if (!form[field]) err[field] = `${field} is required.`;
//     });

//     ["shippingName", "shippingEmail", "shippingMobile", "shippingAddress", "shippingCity", "shippingPin", "shippingState"].forEach(field => {
//       if (!form[field]) err[field] = `${field} is required.`;
//     });

//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSameAsBillingChange = () => {
//     setSameAsBilling(!sameAsBilling);
//   };

//   const loadRazorpayScript = () => new Promise(resolve => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       await axios.post("http://localhost:3001/submit-checkout", {
//         orderId,
//         ...form
//       });

//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) return alert("Razorpay SDK failed to load.");

//       const orderRes = await axios.post("http://localhost:3001/create-razorpay-order", { orderId });
//       const { id, amount, currency } = orderRes.data;

//       const options = {
//         key: "rzp_live_ADtzP1cgVI1iDZ",
//         amount,
//         currency,
//         name: "3Ding",
//         description: `Order #${orderId}`,
//         order_id: id,
//         handler: async (response) => {
//           try {
//             await axios.post("http://localhost:3001/verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderId
//             });
//             navigate(`/status/${orderId}`);
//           } catch (err) {
//             console.error("Payment verification failed:", err);
//             alert("Something went wrong. Payment failed.");
//           }
//         },
//         prefill: {
//           name: form.name,
//           email: form.email,
//           contact: form.mobile
//         },
//         theme: { color: "#28a745" }
//       };

//       new window.Razorpay(options).open();
//     } catch (error) {
//       console.error("Checkout failed:", error);
//       alert("Something went wrong. Payment failed.");
//     }
//   };

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <Row className="mt-5">
//           <Col md={6}>
//             <p className="h4 mb-5">Billing Details</p>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Full Name" name="name" value={form.name} onChange={handleChange} isInvalid={!!errors.name} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Email ID" name="email" value={form.email} onChange={handleChange} isInvalid={!!errors.email} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} isInvalid={!!errors.mobile} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Company Name (Optional)" name="company" value={form.company} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="GST Number (Optional)" name="gst" value={form.gst} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Billing Address" name="billingAddress" value={form.billingAddress} onChange={handleChange} isInvalid={!!errors.billingAddress} />
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Control placeholder="City" name="city" value={form.city} onChange={handleChange} isInvalid={!!errors.city} />
//               </Col>
//               <Col>
//                 <Form.Control placeholder="PIN" name="pin" value={form.pin} onChange={handleChange} isInvalid={!!errors.pin} />
//               </Col>
//               <Col>
//                 <Form.Control placeholder="State" name="state" value={form.state} onChange={handleChange} isInvalid={!!errors.state} />
//               </Col>
//             </Row>
//           </Col>

//           <Col md={6}>
//             <p className="h4">Shipping Details</p>
//             <Form.Check type="checkbox" label="Same as billing details" checked={sameAsBilling} onChange={handleSameAsBillingChange} className="mb-2" />
//             <Form.Group className="mb-2 mt-3">
//               <Form.Control placeholder="Full Name" name="shippingName" value={form.shippingName} onChange={handleChange} isInvalid={!!errors.shippingName} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Email ID" name="shippingEmail" value={form.shippingEmail} onChange={handleChange} isInvalid={!!errors.shippingEmail} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Mobile Number" name="shippingMobile" value={form.shippingMobile} onChange={handleChange} isInvalid={!!errors.shippingMobile} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Company Name (Optional)" name="shippingCompany" value={form.shippingCompany} onChange={handleChange} />
//             </Form.Group>
//             <Form.Group className="mb-2">
//               <Form.Control placeholder="Shipping Address" name="shippingAddress" value={form.shippingAddress} onChange={handleChange} isInvalid={!!errors.shippingAddress} />
//             </Form.Group>
//             <Row>
//               <Col>
//                 <Form.Control placeholder="City" name="shippingCity" value={form.shippingCity} onChange={handleChange} isInvalid={!!errors.shippingCity} />
//               </Col>
//               <Col>
//                 <Form.Control placeholder="PIN" name="shippingPin" value={form.shippingPin} onChange={handleChange} isInvalid={!!errors.shippingPin} />
//               </Col>
//               <Col>
//                 <Form.Control placeholder="State" name="shippingState" value={form.shippingState} onChange={handleChange} isInvalid={!!errors.shippingState} />
//               </Col>
//             </Row>
//           </Col>
//         </Row>

//         <div className="text-center mt-5">
//           <h4>Order Total: ₹{total}</h4>
//           <div className="d-flex justify-content-center mb-3">
//             <Form.Check type="checkbox" label="Receive updates about this order via email" defaultChecked className="me-2" />
//           </div>
//           <div className="d-flex justify-content-center gap-3">
//             <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
//             <Button type="submit" variant="success">Proceed to Pay</Button>
//           </div>
//         </div>
//       </Form>
//     </Container>
//   );
// };

// export default Checkout;


// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3001";
const RAZORPAY_KEY_ID = "rzp_live_ADtzP1cgVI1iDZ"; // TODO: replace with your key

const Checkout = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Billing
    name: "",
    email: "",
    mobile: "",
    company: "",
    gst: "",
    billingAddress: "",
    city: "",
    pin: "",
    state: "",
    // Shipping
    shippingName: "",
    shippingEmail: "",
    shippingMobile: "",
    shippingCompany: "",
    shippingAddress: "",
    shippingCity: "",
    shippingPin: "",
    shippingState: "",
  });

  const [errors, setErrors] = useState({});
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [total, setTotal] = useState(0);

  // Get total (optional)
  useEffect(() => {
    axios
      .get(`${API_BASE}/orders/${orderId}`)
      .then((res) => setTotal(res.data?.total || 0))
      .catch((err) => console.error("Failed to fetch order:", err));
  }, [orderId]);

  // If "same as billing", mirror billing into shipping live
  useEffect(() => {
    if (!sameAsBilling) return;
    setForm((prev) => ({
      ...prev,
      shippingName: prev.name,
      shippingEmail: prev.email,
      shippingMobile: prev.mobile,
      shippingCompany: prev.company,
      shippingAddress: prev.billingAddress,
      shippingCity: prev.city,
      shippingPin: prev.pin,
      shippingState: prev.state,
    }));
  }, [
    sameAsBilling,
    form.name,
    form.email,
    form.mobile,
    form.company,
    form.billingAddress,
    form.city,
    form.pin,
    form.state,
  ]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const toggleSameAsBilling = () => setSameAsBilling((v) => !v);

  const validate = () => {
    const err = {};
    // Required billing fields
    ["name", "email", "mobile", "billingAddress", "city", "pin", "state"].forEach((f) => {
      if (!form[f]) err[f] = `${f} is required.`;
    });
    if (form.email && !form.email.includes("@")) err.email = "Valid email is required.";

    // Required shipping fields
    ["shippingName", "shippingEmail", "shippingMobile", "shippingAddress", "shippingCity", "shippingPin", "shippingState"].forEach((f) => {
      if (!form[f]) err[f] = `${f} is required.`;
    });
    if (form.shippingEmail && !form.shippingEmail.includes("@"))
      err.shippingEmail = "Valid shipping email is required.";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });

  // Build nested objects + aliases for maximum backend compatibility
  const buildPayload = () => {
    const billingDetails = {
      name: form.name,
      company: form.company || "",
      gstin: form.gst || "",
      // address aliases
      address: form.billingAddress,
      billingAddress: form.billingAddress,
      // locality
      city: form.city,
      state: form.state,
      // pin aliases
      pincode: form.pin,
      pin: form.pin,
      pinCode: form.pin,
      // contact aliases
      contact: form.mobile,
      mobile: form.mobile,
      phone: form.mobile,
      email: form.email,
      country: "India",
    };

    const shippingDetails = {
      name: form.shippingName,
      company: form.shippingCompany || "",
      // address aliases
      address: form.shippingAddress,
      shippingAddress: form.shippingAddress,
      // locality
      city: form.shippingCity,
      state: form.shippingState,
      // pin aliases
      pincode: form.shippingPin,
      pin: form.shippingPin,
      pinCode: form.shippingPin,
      // contact aliases
      contact: form.shippingMobile,
      mobile: form.shippingMobile,
      phone: form.shippingMobile,
      email: form.shippingEmail,
      country: "India",
    };

    return {
      orderId,
      // keep your original flat fields (backward-compat)
      ...form,
      // provide structured objects most backends expect
      billingDetails,
      shippingDetails,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // 1) Submit checkout with BOTH flat + nested structures
      const payload = buildPayload();
      await axios.post(`${API_BASE}/submit-checkout`, payload);

      // 2) Load Razorpay
      const ok = await loadRazorpayScript();
      if (!ok) return alert("Razorpay SDK failed to load.");

      // 3) Create Razorpay order
      const orderRes = await axios.post(`${API_BASE}/create-razorpay-order`, { orderId });
      const { id, amount, currency } = orderRes.data;

      // 4) Open Razorpay
      const options = {
        key: RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "3Ding",
        description: `Order #${orderId}`,
        order_id: id,
        handler: async (response) => {
          try {
            await axios.post(`${API_BASE}/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });
            navigate(`/status/${orderId}`);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Verification failed.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.mobile,
        },
        theme: { color: "#28a745" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      {/* <h1 className="text-center mt-5">Checkout</h1> */}
      <Form onSubmit={handleSubmit}>
        <Row className="mt-5">
          <Col md={6}>
            <h4>Billing Details</h4>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Email ID"
                name="email"
                value={form.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Mobile Number"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                isInvalid={!!errors.mobile}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Form.Control.Feedback type="invalid">{errors.mobile}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Company Name (Optional)"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="GST Number (Optional)"
                name="gst"
                value={form.gst}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Billing Address"
                name="billingAddress"
                value={form.billingAddress}
                onChange={handleChange}
                isInvalid={!!errors.billingAddress}
              />
              <Form.Control.Feedback type="invalid">{errors.billingAddress}</Form.Control.Feedback>
            </Form.Group>

            <Row className="g-2">
              <Col>
                <Form.Control
                  placeholder="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  placeholder="PIN"
                  name="pin"
                  value={form.pin}
                  onChange={handleChange}
                  isInvalid={!!errors.pin}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">{errors.pin}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                    placeholder="State"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
              </Col>
            </Row>
          </Col>

          <Col md={6}>
            <h4>Shipping Details</h4>

            <Form.Check
              type="checkbox"
              label="Same as billing details"
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              className="mb-2"
            />

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Full Name"
                name="shippingName"
                value={form.shippingName}
                onChange={handleChange}
                isInvalid={!!errors.shippingName}
              />
              <Form.Control.Feedback type="invalid">{errors.shippingName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Email ID"
                name="shippingEmail"
                value={form.shippingEmail}
                onChange={handleChange}
                isInvalid={!!errors.shippingEmail}
              />
              <Form.Control.Feedback type="invalid">{errors.shippingEmail}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Mobile Number"
                name="shippingMobile"
                value={form.shippingMobile}
                onChange={handleChange}
                isInvalid={!!errors.shippingMobile}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <Form.Control.Feedback type="invalid">{errors.shippingMobile}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Company Name (Optional)"
                name="shippingCompany"
                value={form.shippingCompany}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Shipping Address"
                name="shippingAddress"
                value={form.shippingAddress}
                onChange={handleChange}
                isInvalid={!!errors.shippingAddress}
              />
              <Form.Control.Feedback type="invalid">{errors.shippingAddress}</Form.Control.Feedback>
            </Form.Group>

            <Row className="g-2">
              <Col>
                <Form.Control
                  placeholder="City"
                  name="shippingCity"
                  value={form.shippingCity}
                  onChange={handleChange}
                  isInvalid={!!errors.shippingCity}
                />
                <Form.Control.Feedback type="invalid">{errors.shippingCity}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  placeholder="PIN"
                  name="shippingPin"
                  value={form.shippingPin}
                  onChange={handleChange}
                  isInvalid={!!errors.shippingPin}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                />
                <Form.Control.Feedback type="invalid">{errors.shippingPin}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  placeholder="State"
                  name="shippingState"
                  value={form.shippingState}
                  onChange={handleChange}
                  isInvalid={!!errors.shippingState}
                />
                <Form.Control.Feedback type="invalid">{errors.shippingState}</Form.Control.Feedback>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="text-center mt-5">
          <h4>Order Total: ₹{total}</h4>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="submit" variant="success">
              Proceed to Pay
            </Button>
          </div>
        </div>
      </Form>
    </Container>
  );
};

export default Checkout;
