import React from "react";
import ColorRender from "./components/ColorRender";
import HexRender from "./components/HexRender";
import { SketchPicker } from "react-color";

export default function App() {
  const [seedColor, setSeedColor] = React.useState("")
  const [colorScheme, setColorScheme] = React.useState("monochrome");
  const [colors, setColors] = React.useState([]);
  const [count, setCount] = React.useState(5);

  function handleSubmit(event) {
    event.preventDefault();
    fetch(
      `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorScheme}&count=${count}`
    )
      .then(setColors([]))
      .then((res) => res.json())
      .then((data) =>
        data.colors.map((dataObject) => {
          setColors((prevColors) => {
            return [...prevColors, dataObject.hex.value];
          });
        })
      );
  }

  const colorsRender = colors.map((colors) => {
    return <ColorRender colors={colors} />;
  });

  const hexRender = colors.map((colors) => {
    return <HexRender hex={colors} />;
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setColorScheme(event.target.value);
  }

  function handleCount(event) {
    setCount(event.target.value);
  }

  function handleSeedColorChange(event) {
    setSeedColor(event.target.value)
  }

  return (
    <div className="main-container">
      <nav>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Insert hex code"
            value={seedColor}
            name="seed_color"
            onChange={handleSeedColorChange}
          />
          <input
            type="number"
            min="1"
            placeholder="Insert palette length"
            onChange={handleCount}
          />
          <select
            value={colorScheme}
            onChange={handleChange}
            name="color_scheme"
          >
            <option value="monochrome">Monochrome</option>
            <option value="monochrome-dark">Monochrome-dark</option>
            <option value="monochrome-light">Monochrome-light</option>
            <option value="analogic">Analogic</option>
            <option value="complement">Complement</option>
            <option value="analogic-complement">Analogic-complement</option>
            <option value="triad">Triad</option>
          </select>
          <button>Get color scheme</button>
        </form>
      </nav>
      <div className="colors-container">{colorsRender}</div>
      <div className="hex-container">{hexRender}</div>
    </div>
  );
}
