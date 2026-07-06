// Shown instantly when navigating to /work, so the click never feels frozen
// while the page renders. Kept dependency-free (no context) on purpose.
export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        padding: "80px 0",
      }}
    >
      <style>{`@keyframes sf-spin{to{transform:rotate(360deg)}}`}</style>
      <div
        aria-hidden
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.15)",
          borderTopColor: "#d4af37",
          animation: "sf-spin 0.8s linear infinite",
        }}
      />
      <p style={{ opacity: 0.6, letterSpacing: "0.08em", fontSize: 14 }}>
        Loading gallery…
      </p>
    </div>
  );
}
