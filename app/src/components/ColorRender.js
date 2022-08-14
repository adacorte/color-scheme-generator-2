import React from "react"
import ReactDOM from "react-dom"

export default function ColorRender(props) {
    return (
        <div style={{backgroundColor: `${props.colors}`}} className="boxes">
        </div>
    )
}