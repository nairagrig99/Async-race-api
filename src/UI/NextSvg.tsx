import type {SvgProps} from "../interface/event-props-type.ts";

export default function NextSvg({onClick}: SvgProps) {
    return <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
    </svg>
}