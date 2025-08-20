import Link from "next/link";
import Image from "next/image";
import "./navar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fw-bold text-white">
          ผลไม้บ้าน
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className="nav-link custom-nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className="nav-link custom-nav-link">
                About
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle custom-nav-link"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recommend
              </Link>
              <ul className="dropdown-menu custom-dropdown">
                <li>
                  <Link href="/service" className="dropdown-item">
                    Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="dropdown-item">
                    Contact
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link href="#" className="dropdown-item">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn custom-btn" type="submit">
              Search
            </button>
          </form>

          <Link href="/login1" passHref>
            <button
              className="btn custom-btn-login ms-lg-3 w-100 w-lg-auto mt-3 mt-lg-0"
              type="button"
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
