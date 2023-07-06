import { forwardRef } from "react"
import "./InputComponent.css"

const InputComponent = forwardRef((props, ref) => {
  return (
    <span className="inputComponent" htmlFor={props.id} onChange={props.onInput}>
      <p>{props.text}</p>
      <input 
        id={props.id}
        maxLength={props.maxLength}
        min={props.min}
        type={props.type} 
        placeholder={props.placeholder || props.text} 
        required={props.required}
        ref={ref}
        defaultValue={props.value}
      />
      <i className="icon">{props.icon}</i>
    </span>
  )
});

export default InputComponent