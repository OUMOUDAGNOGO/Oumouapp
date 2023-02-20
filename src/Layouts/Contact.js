import React from "react";

function Contact() {
  return (
    <>
      <div className="container py-4">
        <div className="row">
          <div className="col">
            <h2 class="h1-responsive font-weight-bold text-center my-4">
              Contactez Nous
            </h2>

            <p class="text-center w-responsive mx-auto mb-5">
              Avez vous une question? N'hesitez pas de nous ecrire pour prendre
              contact avec nous
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6 col-xs-12">
            <form id="contactForm">
              <div className="mb-3">
                <label className="form-label" for="name">
                  Nom
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="Name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" for="emailAddress">
                  Addresse Email
                </label>
                <input
                  className="form-control"
                  id="emailAddress"
                  type="email"
                  placeholder="Email Address"
                />
                <div className="invalid-feedback">Veillez entre Email.</div>
              </div>

              <div className="mb-3">
                <label className="form-label" for="message">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  type="text"
                  placeholder="Message"
                  style={{ height: "10rem" }}
                ></textarea>
                <div className="invalid-feedback">Veillez entre Message.</div>
              </div>

              <div clasName="d-grid">
                <button
                  className="btn btn-primary btn-lg disabled"
                  id="submitButton"
                  type="submit"
                >
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          <div className="col-xxl-6 col-xl-6 col-md-6 col-lg-6 col-xs-12">
            <div className="card text-center py-3 ">
            
              <i
                className="bi bi-telephone-fill"
                style={{ fontSize: "3rem" }}
              ></i>
              <h3>(+223) 00000000</h3>
            </div>

            <div className="card text-center py-3 my-3">
              <i
                className="bi bi-geo-alt-fill"
                style={{ fontSize: "3rem" }}
              ></i>
              <h3>(+223) 00000000</h3>
            </div>

            <div className="card text-center py-3">
              <i
                className="bi bi-geo-alt-fill"
                style={{ fontSize: "3rem" }}
              ></i>
              <h3>(+223) 00000000</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contact;
