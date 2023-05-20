import React, { Component } from "react";
import Hls from "hls.js";

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls({ enableWorker: false });
  }

  componentDidMount() {
    const { src, video } = this.props;
    if (Hls.isSupported()) {
      this.hls.loadSource(src);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || "application/x-mpegURL"}
      />
    );
  }
}
