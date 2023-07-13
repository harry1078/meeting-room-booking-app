import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectDropdown(props) {
  const theme = useTheme();
  const { data, inputLabel, styles, size, selectedValue } = props;
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    selectedValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={styles} size={size}>
        <InputLabel id="demo-multiple-name-label">{inputLabel}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={inputLabel} />}
          MenuProps={MenuProps}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.label}
              style={getStyles(item.label, value, theme)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
