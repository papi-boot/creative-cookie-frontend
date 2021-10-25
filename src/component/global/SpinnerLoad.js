import React, { Fragment } from "react";
import { Spinner } from "react-bootstrap";

const SpinnerLoad = React.forwardRef(({...res}, ref) => {
  const [show, setShow] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    toggleSpinner() {
      setShow(!show);
    },
  }));
  return (
    <Fragment>
      {show ? (
        <Spinner {...res} role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        ""
      )}
    </Fragment>
  );
});

export default SpinnerLoad;
