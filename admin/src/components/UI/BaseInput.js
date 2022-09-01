

function BaseInput({ type = 'text', name, placeholder, label, onChange = () => {}, defaultValue = '', id }) {
   return (
      <div className="input">
         <input
            type={type}
            name={name}
            id={id}
            onChange={(e) => onChange(e)}
            placeholder={placeholder}
            defaultValue={defaultValue} />
         {label && (
            <label htmlFor={id}>{label}</label>
         )}
      </div>
   )
}

export default BaseInput;