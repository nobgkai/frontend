import Link from "next/link";
import "../components/Contact.css";

export default function About() {
  return (
    <>
      <div className="container py-5 mt-5">
        <h1 className="mb-5 text-center fw-bold">About Us</h1>

        {/* Section 1 */}
        <section className="mb-5 p-4 border rounded bg-light shadow-sm">
          <h2 className="mb-3">Our Mission</h2>
          <p>
            We aim to deliver fresh and quality fruits directly from farms to
            your table, ensuring the best experience and satisfaction.
          </p>
        </section>

        {/* Section 2 */}
        <section className="mb-5 p-4 border rounded bg-light shadow-sm">
          <h2 className="mb-3">Our Story</h2>
          <p>
            Started as a small local fruit seller, we grew by focusing on
            quality and customer trust, now proudly serving thousands of happy
            customers nationwide.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-5 p-4 border rounded bg-light shadow-sm ">
          <h2 className="mb-3">Contact & Socials</h2>
          <p>
            Feel free to reach out to us on social media or send us a message
            anytime.
          </p>
          <div className="d-flex gap-3 justify-content-center fs-4 mt-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-dark"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://line.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Line"
              className="text-dark"
            >
              <i className="bi bi-line"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-dark"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
