import React from "react";

type CloseSvgProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function CloseSvg({onClick}: CloseSvgProps) {
    return <>
        <button onClick={onClick} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    </>
}