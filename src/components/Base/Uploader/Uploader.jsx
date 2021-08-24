import React from "react";

// https://reactjs.org/docs/forwarding-refs.html

const Uploader = React.forwardRef((props, ref) => {
  // In this component we foward the ref of the input type file in order to deal with it in the parent component.

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const tempURL = URL.createObjectURL(file);
    props.onFileSelect && props.onFileSelect(tempURL);
  };

  return (
    <React.Fragment>
      <label className="Uploader label" htmlFor={props.name}>
        {props.children}
      </label>
      <input
        onChange={handleFileSelect}
        ref={ref}
        hidden
        id={props.name}
        name={props.name}
        type="file"
      />
    </React.Fragment>
  );
});

export default Uploader;
