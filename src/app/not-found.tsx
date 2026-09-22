import Link from "next/link";

export default function NotFound() {
  return (
    <main className="ok-site ok-container ok-section">
      <p>Open Kiln · Evidence, made accessible</p>
      <h1>We couldn’t find that page.</h1>
      <p>Return to the evidence register, research and verification pathways.</p>
      <Link className="ok-button" href="/">
        Back to Open Kiln
      </Link>
    </main>
  );
}
