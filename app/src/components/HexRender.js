import React from "react"
import ReactDOM from "react-dom"

export default function HexRender(props) {
    return (
        <div className="hex-container">
            {props.hex}
        </div>
    )
}