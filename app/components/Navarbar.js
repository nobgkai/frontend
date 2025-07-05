import Link from "next/link";
import Image from "next/image";
import "./navar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-white" href="#">
          ผลไม้บ้าน
        </a>
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
              <a className="nav-link custom-nav-link" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-nav-link" href="../about">
                About
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle custom-nav-link"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Recommend
              </a>
              <ul className="dropdown-menu custom-dropdown">
                <li>
                  <a className="dropdown-item" href="../service">
                    Service
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="../contact">
                    Contact
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
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
        </div>
      </div>
    </nav>
  );
}
