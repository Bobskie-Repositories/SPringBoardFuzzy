import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

const Dropdown = (props) => {
  const { value, onChange, label, options, inputProps } = props;

  return (
    <FormControl sx={{ m: 1, maxWidth: 120 }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={inputProps}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
};

export default Dropdown;
