import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./tongQuan.scss";
import ChartDuong from "../../../components/Chart/ChartDuong";
import ChartTron from "../../../components/Chart/ChartTron";

function TongQuanAdmin() {
  if (!localStorage.getItem("token")) {
    window.location.replace("/dang-nhap");
  }
  return (
    <div className="tongQuanNe">
      <div className="container pt-4">
        {/* Section: Main chart */}
        <section className="mb-4">
          <div className="card">
            <div className="card-header py-3">
              <h5 className="mb-0 text-center">
                <strong>Sales</strong>
              </h5>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Biểu đồ đường chiếm 8 cột */}
                <div className="col-md-8 d-flex justify-content-center">
                  <div style={{ width: "90%", height: "400px" }}>
                    <ChartDuong />
                  </div>
                </div>

                {/* Biểu đồ tròn chiếm 4 cột */}
                <div className="col-md-4 d-flex justify-content-center mt-5">
                  <div style={{ width: "80%", height: "300px" }}>
                    <ChartTron />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Main chart */}
        {/*Section: Sales Performance KPIs*/}
        <section className="mb-4">
          <div className="card">
            <div className="card-header text-center py-3">
              <h5 className="mb-0 text-center">
                <strong>Sales Performance KPIs</strong>
              </h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col" />
                      <th scope="col">Product Detail Views</th>
                      <th scope="col">Unique Purchases</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Product Revenue</th>
                      <th scope="col">Avg. Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Value</th>
                      <td>18,492</td>
                      <td>228</td>
                      <td>350</td>
                      <td>$4,787.64</td>
                      <td>$13.68</td>
                    </tr>
                    <tr>
                      <th scope="row">Percentage change</th>
                      <td>
                        <span className="text-danger">
                          <i className="fas fa-caret-down me-1" />
                          <span>-48.8%%</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>14.0%</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>46.4%</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>29.6%</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-danger">
                          <i className="fas fa-caret-down me-1" />
                          <span>-11.5%</span>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Absolute change</th>
                      <td>
                        <span className="text-danger">
                          <i className="fas fa-caret-down me-1" />
                          <span>-17,654</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>28</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>111</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-success">
                          <i className="fas fa-caret-up me-1" />
                          <span>$1,092.72</span>
                        </span>
                      </td>
                      <td>
                        <span className="text-danger">
                          <i className="fas fa-caret-down me-1" />
                          <span>$-1.78</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        {/*Section: Sales Performance KPIs*/}
        {/*Section: Minimal statistics cards*/}
        <section>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <i className="fas fa-pencil-alt text-info fa-3x" />
                    </div>
                    <div className="text-end">
                      <h3>278</h3>
                      <p className="mb-0">New Posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <i className="far fa-comment-alt text-warning fa-3x" />
                    </div>
                    <div className="text-end">
                      <h3>156</h3>
                      <p className="mb-0">New Comments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <i className="fas fa-chart-line text-success fa-3x" />
                    </div>
                    <div className="text-end">
                      <h3>64.89 %</h3>
                      <p className="mb-0">Bounce Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div className="align-self-center">
                      <i className="fas fa-map-marker-alt text-danger fa-3x" />
                    </div>
                    <div className="text-end">
                      <h3>423</h3>
                      <p className="mb-0">Total Visits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-danger">278</h3>
                      <p className="mb-0">New Projects</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-rocket text-danger fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-success">156</h3>
                      <p className="mb-0">New Clients</p>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-user text-success fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-warning">64.89 %</h3>
                      <p className="mb-0">Conversion Rate</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-chart-pie text-warning fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-info">423</h3>
                      <p className="mb-0">Support Tickets</p>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-life-ring text-info fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-info">278</h3>
                      <p className="mb-0">New Posts</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-book-open text-info fa-3x" />
                    </div>
                  </div>
                  <div className="px-md-1">
                    <div
                      className="progress mt-3 mb-1 rounded"
                      style={{ height: 7 }}
                    >
                      <div
                        className="progress-bar bg-info"
                        role="progressbar"
                        style={{ width: "80%" }}
                        aria-valuenow={80}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-warning">156</h3>
                      <p className="mb-0">New Comments</p>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-comments text-warning fa-3x" />
                    </div>
                  </div>
                  <div className="px-md-1">
                    <div
                      className="progress mt-3 mb-1 rounded"
                      style={{ height: 7 }}
                    >
                      <div
                        className="progress-bar bg-warning"
                        role="progressbar"
                        style={{ width: "35%" }}
                        aria-valuenow={35}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-success">64.89 %</h3>
                      <p className="mb-0">Bounce Rate</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-mug-hot text-success fa-3x" />
                    </div>
                  </div>
                  <div className="px-md-1">
                    <div
                      className="progress mt-3 mb-1 rounded"
                      style={{ height: 7 }}
                    >
                      <div
                        className="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "60%" }}
                        aria-valuenow={60}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 col-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between px-md-1">
                    <div>
                      <h3 className="text-danger">423</h3>
                      <p className="mb-0">Total Visits</p>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-map-signs text-danger fa-3x" />
                    </div>
                  </div>
                  <div className="px-md-1">
                    <div
                      className="progress mt-3 mb-1 rounded"
                      style={{ height: 7 }}
                    >
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow={40}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Section: Minimal statistics cards*/}
        {/*Section: Statistics with subtitles*/}
        <section>
          <div className="row">
            <div className="col-xl-6 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between p-md-1">
                    <div className="d-flex flex-row">
                      <div className="align-self-center">
                        <i className="fas fa-pencil-alt text-info fa-3x me-4" />
                      </div>
                      <div>
                        <h4>Total Posts</h4>
                        <p className="mb-0">Monthly blog posts</p>
                      </div>
                    </div>
                    <div className="align-self-center">
                      <h2 className="h1 mb-0">18,000</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between p-md-1">
                    <div className="d-flex flex-row">
                      <div className="align-self-center">
                        <i className="far fa-comment-alt text-warning fa-3x me-4" />
                      </div>
                      <div>
                        <h4>Total Comments</h4>
                        <p className="mb-0">Monthly blog posts</p>
                      </div>
                    </div>
                    <div className="align-self-center">
                      <h2 className="h1 mb-0">84,695</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between p-md-1">
                    <div className="d-flex flex-row">
                      <div className="align-self-center">
                        <h2 className="h1 mb-0 me-4">$76,456.00</h2>
                      </div>
                      <div>
                        <h4>Total Sales</h4>
                        <p className="mb-0">Monthly Sales Amount</p>
                      </div>
                    </div>
                    <div className="align-self-center">
                      <i className="far fa-heart text-danger fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-12 mb-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between p-md-1">
                    <div className="d-flex flex-row">
                      <div className="align-self-center">
                        <h2 className="h1 mb-0 me-4">$36,000.00</h2>
                      </div>
                      <div>
                        <h4>Total Cost</h4>
                        <p className="mb-0">Monthly Cost</p>
                      </div>
                    </div>
                    <div className="align-self-center">
                      <i className="fas fa-wallet text-success fa-3x" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*Section: Statistics with subtitles*/}
      </div>
    </div>
  );
}
export default TongQuanAdmin;
