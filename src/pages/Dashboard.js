import React, { Fragment } from "react";
import { GlobalDataContext } from "../context/GlobalData";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavTop from "../component/global/NavTop";
const Dashboard = () => {
  const { userInfo } = React.useContext(GlobalDataContext);
  return (
    <Fragment>
      <header className="main-header">
        <NavTop />
      </header>
      <Container>
        <section className="main-content">
          <h1 className="text-center my-4">
            Dashboard Page {userInfo.user_full_name} {userInfo.user_created_at}
          </h1>
        </section>
      </Container>
    </Fragment>
  );
};
export default withRouter(Dashboard);
