import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import classNames from "./alert.scss";
import { closeButton, alertWrapper } from "./alert.scss";
import styles from "./alertTransition.scss";

export default function Alert({ type, message, onClose }) {
  const className = classNames[type];
  const hidden = message && className;
  return (
    <ReactCSSTransitionGroup
      className={alertWrapper}
      transitionEnter={false}
      transitionName={styles}
      transitionEnterTimeout={700}
      transitionLeaveTimeout={700}
    >
      {hidden
        ? <div key="1" className={className}>
            <span onClick={onClose} className={closeButton}>
              &times;
            </span>
            {message}
          </div>
        : null}
    </ReactCSSTransitionGroup>
  );
}
