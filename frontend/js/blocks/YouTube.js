import React, { Component } from "react";

const YT_UNSTARTED_STATE = -1;
const YT_ENDED_STATE = 0;
const YT_PAUSED_STATE = 2;

class YouTube extends Component {
  constructor(props) {
    super(props);
    this.playVideo = this.playVideo.bind(this);
    this.handleYouTubeReady = this.handleYouTubeReady.bind(this);
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handlePlayerStateChange = this.handlePlayerStateChange.bind(this);
    this.handleCTAClick = this.handleCTAClick.bind(this);

    this.state = {
      showPoster: true,
      playerReady: false,
      player: null
    };
  }

  componentDidMount() {
    if (window.youTubeIframeAPIReady) {
      this.handleYouTubeReady();
    } else {
      window.youTubeCallbacks.push(this.handleYouTubeReady);
    }
  }

  playVideo() {
    if (this.state.playerReady) {
      this.setState({ showPoster: false });
      this.state.player.playVideo();
    }
  }

  handleYouTubeReady() {
    this.setState({
      player: new YT.Player(this.player, {
        videoId: this.props.data.videoId[window.textiles.localeSimple],
        playerVars: {
          rel: 0
        },
        height: "390",
        width: "640",
        events: {
          onReady: this.handlePlayerReady,
          onStateChange: this.handlePlayerStateChange
        }
      })
    });
  }

  handlePlayerReady() {
    this.setState({ playerReady: true });
  }

  handlePlayerStateChange(e) {    
    if (e.data === YT_UNSTARTED_STATE) {
      ga("send", {
        hitType: "event",
        eventCategory: "Interaction",
        eventAction: "TVC play",
        eventLabel: "TVC play"
      });
    }
    if (e.data === YT_ENDED_STATE) {
      ga("send", {
        hitType: "event",
        eventCategory: "Interaction",
        eventAction: "TVC completion",
        eventLabel: "TVC completion"
      });
    }
    // This is the only way we can know if the user has pressed 'done'
    // and returned to the webpage from the popout player on iOS. Or if
    // the video has finished and the popout player has closed on its own.
    // In this instance we want to show the poster frame so the user can
    // still swipe to the other videos. Simply returning to the carousel
    // with the slide still showing the YT player eats the touch events.
    // We don't want to do this on desktop as the YT_PAUSED_STATE event
    // fires when you're scrubbing. Thanks YouTube.
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
      if (e.data === YT_PAUSED_STATE) {
        this.setState({ showPoster: true });
      }
      if (e.data === YT_ENDED_STATE) {
        this.setState({ showPoster: true });
      }
    }
  }

  handleCTAClick() {
    ga("send", {
      hitType: "event",
      eventCategory: "Click",
      eventAction: "TVC learn more click",
      eventLabel: "TVC learn more click"
    });
  }

  render() {
    const {
      blockID,
      classes,
      data: { id, heading, text, mobile_text, cta, image }
    } = this.props;
    const { playerReady, showPoster } = this.state;

    return (
      <div
        className={`youtube block block-${blockID} ${classes ? classes : ""}`}
        id={id ? id : null}
      >
        <div className="youtube__copy">
          <h2 className="heading">
            {heading}
          </h2>
          <p className="text" dangerouslySetInnerHTML={{ __html: text }} />
          <p className="mobile-text" dangerouslySetInnerHTML={{ __html: mobile_text }} />
          <div className="copy-cta">
            <a
              href={cta[window.textiles.localeSimple]}
              target="_blank"
              onClick={this.handleCTAClick}
            >
              {cta.text}
            </a>
          </div>
        </div>
        <div className="youtube__video">
          <div className={`youtube-player${showPoster ? " show-poster" : ""}`}>
            <div
              className="player"
              ref={el => {
                this.player = el;
              }}
            />
            <div className="poster-wrapper">
              <img
                className="poster"
                src={`${window.textiles.assetPath}images/${image}`}
                alt=""
              />
              <div
                className="spinner"
                style={{ opacity: `${playerReady ? 0 : 1}` }}
              />
              <div
                className="play-button"
                style={{ opacity: `${playerReady ? 1 : 0}` }}
                onClick={this.playVideo}
              />
            </div>
          </div>
          <div className="video-cta">
            <a
              href={cta[window.textiles.localeSimple]}
              target="_blank"
              onClick={this.handleCTAClick}
            >
              {cta.text}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default YouTube;
