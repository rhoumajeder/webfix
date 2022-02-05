import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";

const texts = ["Fast", "Scalable", "Potato"];

class ReactTextAnimation extends Component {
  state = { textIndex: 0,};

  componentDidMount() {
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1,
      });
    }, 1500);
  }

  render() {
    return (
            <ReactTextTransition
              text={texts[this.state.textIndex % texts.length]}
              springConfig={presets.gentle}
              style={{ margin: "0 4px" }}
              inline
            />
    );
  }
}

export default ReactTextAnimation;