import React from "react";

const FooterComponent = () => {
  return (
    <>
      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }} />
      <div className="row mt-3">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>ABOUT ME</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
            dolore facilis mollitia sequi quis natus voluptas optio! Pariatur
            eius deserunt aspernatur necessitatibus quaerat, adipisci
            asperiores, ipsum unde natus soluta similique?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
            voluptate ea vero sapiente odio. Veniam culpa quaerat ea ut fuga
            minima ducimus voluptatum modi quos dolor, accusantium assumenda
            quia quidem.
          </p>
          <ul>
            <li className="list-inline-item">
              <a
                href="https://facebook.com/tranbasonbb"
                rel="noreferrer"
                style={{ color: "#f4c10f" }}
              >
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" rel="noreferrer" style={{ color: "#f4c10f" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" rel="noreferrer" style={{ color: "#f4c10f" }}>
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/" rel="noreferrer" style={{ color: "#f4c10f" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-4 col-ms-6" style={{ color: "#5a606b" }}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"> </i> Address:
                </strong>{" "}
                city, state, country
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <i className="fas fa-phone"> </i> Phone:
                </strong>{" "}
                +84 00 00 00 00 00
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"> </i> Email:
                </strong>{" "}
                genson1808@gmail.com
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default React.memo(FooterComponent);
