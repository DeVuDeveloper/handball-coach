import React, { forwardRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";

const Selector = forwardRef(({ children, className, ...props }, ref) => (

    <FormControl style={{ minWidth: 120 }}>
      <InputLabel
        id="demo-simple-select-label"
        style={{ marginTop: 15, fontSize: 14 }}
      >
        frequency
      </InputLabel>
      <Select
       ref={ref}
       {...props}
        labelId="demo-simple-select-label"
        style={{ height: 37, marginTop: 23 }}
        sx={{
          boxShadow: "none",
          ".MuiOutlinedInput-notchedOutline": {
            border: 0,
            borderBottom: 2,
            borderColor: "rgb(87 83 78)",
          },
        }}
      >
       {children}
      </Select>
    </FormControl>
  ))

  Selector.displayName = 'Select'
  Selector.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  };

export default Selector;