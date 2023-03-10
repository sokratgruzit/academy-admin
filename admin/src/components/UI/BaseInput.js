

function BaseInput({ readOnly, value, type = 'text', name, placeholder, label, onChange = () => {}, id }) {
   return (
      <div className="input">
         <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            readOnly={readOnly}
         />
         {label && (
            <label htmlFor={id}>{label}</label>
         )}
      </div>
   )
}

export default BaseInput;