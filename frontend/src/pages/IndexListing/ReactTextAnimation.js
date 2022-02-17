import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";



class ReactTextAnimation extends Component {
  state = { textIndex: 0,};
  
  componentDidMount() {
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1,
      });
    }, this.props.time);
  }

  render() {
    return (
            <ReactTextTransition
              text={this.props.texts[this.state.textIndex % this.props.texts.length]}
              springConfig={presets.gentle}
              style={{ margin: "0 4px" }}
              inline
            />
    );
  }
}

export default ReactTextAnimation;