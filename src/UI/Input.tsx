import React from "react";
import type {InputPropsInterface} from "../interface/input-props.interface.ts";


const Input: React.FC<InputPropsInterface> = ({blockClass, errors, value, labelClass, label, id, ...props}) => {

    return <div className={blockClass} >
        <label htmlFor={id} className={labelClass}>
           <p>{label}</p>
            <input  value={value} id={id} {...props}/>
        </label>
        <span className="text-red-600 w-[350px]">{errors}</span>
    </div>
}
export default Input