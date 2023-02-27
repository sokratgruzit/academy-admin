import Select from "react-select";

function BaseSelect({
  name,
  options,
  getOptionLabel,
  getOptionValue,
  defaultValue = "",
  placeholder = "select",
  isMulti = false,
  onChange,
}) {
  return (
    <Select
      className="base-select-container"
      classNamePrefix="base-select"
      name={name}
      options={options}
      placeholder={placeholder}
      getOptionLabel={getOptionLabel}
      getOptionValue={getOptionValue}
      defaultValue={defaultValue}
      isMulti={isMulti}
      onChange={onChange}
    />
  );
}

export default BaseSelect;
