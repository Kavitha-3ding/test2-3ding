import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, CAlert } from "@coreui/react";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully.");
        navigate("/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleResetPassword}>
                    <h1 className="text-center my-4">Reset Password</h1>
                    {message && <CAlert color="success">{message}</CAlert>}
                    {error && <CAlert color="danger">{error}</CAlert>}
                    {/* Verification Code Input */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="bi bi-key-fill"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Verification Code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    {/* New Password Input */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="bi bi-lock-fill"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    {/* Confirm Password Input */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <i className="bi bi-lock-fill"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CRow className="text-center">
                      <CCol className="text-center">
                        <CButton type="submit" color="primary" className="px-4">
                          Reset Password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default ResetPassword;