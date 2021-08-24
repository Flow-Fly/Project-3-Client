import React from "react";
import { MessengerContext } from "./MessengerContext";

export const withMessenger = (ComponentToPassMessengerContextTo) => {
  return function (props) {
    return (
      <MessengerContext.Consumer>
        {(context) => (
          <ComponentToPassMessengerContextTo {...props} messengerContext={context} />
        )}
      </MessengerContext.Consumer>
    );
  };
};
