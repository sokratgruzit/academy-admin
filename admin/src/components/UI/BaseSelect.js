import Select from 'react-select'

function BaseSelect({ name, options, getOptionLabel, getOptionValue, defaultValue = '', placeholder = 'select' }) {
   return (
      <Select
         className='base-select-container'
         classNamePrefix="base-select"
         name={name}
         options={options}
         placeholder={placeholder}
         getOptionLabel={getOptionLabel}
         getOptionValue={getOptionValue}
         defaultValue={defaultValue}
      />
   )
}

export default BaseSelect; 