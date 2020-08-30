import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const filter = createFilterOptions();

export default function SelectSkill({ optionsList, setOptionsList }) {
  const [value, setValue] = useState(null);

  const handleOnChange = (event, newValue) => {
    if (typeof newValue === "string") {
      setValue({
        title: newValue,
      });
      setOptionsList((optionsList) => [
        ...optionsList,
        {
          title: newValue,
        },
      ]);
    } else if (newValue && newValue.inputValue) {
      setValue({
        title: newValue.inputValue,
      });
      setOptionsList((optionsList) => [
        ...optionsList,
        {
          title: newValue.inputValue,
        },
      ]);
    } else {
      setValue(newValue);
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleOnChange}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            title: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="select-skill"
      options={optionsList}
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(option) => option.title}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Student Skills"
          variant="outlined"
        />
      )}
    />
  );
}
