import React from "react";
import "./verifOtp.css";

function VerifOtp(){







  
return(
 <div className="verify-page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🎓</span>
          <span>StudentForum</span>
        </div>

        <button className="logout-btn">
          Logout
        </button>
      </nav>

      {/* Main */}
      <main className="verify-container">

        <div className="otp-card">

          {/* Icon */}
          <div className="otp-icon-wrapper">
            <div className="otp-icon">
              📩
              <span className="lock-icon">🔒</span>
            </div>
          </div>

          {/* Heading */}
          <h1>
            Verify Your <span>Email</span>
          </h1>

          <p className="otp-description">
            We've sent a 6-digit OTP to
          </p>

          <p className="email">
            mradul.tiwari88@gmail.com
          </p>

          {/* OTP Inputs */}
          <div
            className="otp-input-container"
            //onPaste={handlePaste}
          >
            {/* {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className={digit ? "filled" : ""}
              />
            ))} */}
          </div>

          {/* Timer */}
          <div className="otp-timer">
            <span>🛡️</span>
            OTP will expire in
            <strong>02:59</strong>
          </div>

          {/* Verify */}
          <button
            className="verify-btn"
            // onClick={verifyOtp}
          >
            Verify OTP
          </button>

          {/* Divider */}
          <div className="divider">
            <span></span>
            <p>Didn't receive the code?</p>
            <span></span>
          </div>

          {/* Resend */}
          <button className="resend-btn">
            <span>↻</span>
            Resend OTP <strong>(28s)</strong>
          </button>

        </div>
      </main>

      {/* Help */}
      <button className="help-btn">
        ?
      </button>

    </div>
)

}


export default VerifOtp;