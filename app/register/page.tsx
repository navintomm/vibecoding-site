export default function RegisterClosed() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(black, #001a1a)",
      color: "#00ffcc",
      flexDirection: "column",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
        Registrations Closed
      </h1>

      <p style={{ opacity: 0.8 }}>
        Thank you for your interest.
      </p>
    </div>
  );
}