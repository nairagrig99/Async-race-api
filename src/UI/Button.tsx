import React from "react";
import type {ButtonPropsInterface} from "../interface/button-props.interface.ts";

const Button:React.FC<ButtonPropsInterface> = ({className,value,type,...props}) => {
    return <>
        <button type={type} className={className} {...props}>{value}</button>
    </>
}
export default Button;
