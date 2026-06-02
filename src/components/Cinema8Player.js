import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'; 
import { getSDK } from './utils'


/**
 * Cinema8Player Component
 */

const DEFAULT_SDK_URL = 'https://static-01.cinema8.com/player/api/cinema8.player.api.min.js?v=react-player'
const SDK_GLOBAL = 'Cinema8Player'


const Cinema8Player =  React.forwardRef((props, ref) => {

  // `sdkUrl` lets the host override the player-API script source —
  // useful for local development against a self-hosted backend, or for
  // pinning a specific build at deploy time. Defaults to the public CDN
  // so the production path is unchanged.
  const { id, className, width, height, style, sdkUrl, ...rest } = props;
  const SDK_URL = sdkUrl || DEFAULT_SDK_URL;

  const containerRef = useRef(null);
  const [player, setPlayer] = useState();

	useEffect(() => {
    player && player.unload();
		(id || rest.externalVideoUrl) && load();
  }, [id, rest.externalVideoUrl])


  // Load Player
	const load = () => {
    getSDK(SDK_URL, SDK_GLOBAL).then(Cinema8Player => {
      const player = new Cinema8Player(containerRef.current, {
          id,
          width: '100%',
          height: '100%',
          ...rest
      });

      setPlayer(player);
      ref && (ref.current = player);
    }, () => {
      console.log("err");
    });
  }
  
  let _style = {
    width: '100%',
    height: '100%'
  }
  width && (_style["width"] = width);
  height && (_style["height"] = height);
  _style = {..._style, ...style};

  return (
    <div
      ref={containerRef}
      style={{..._style}}
      className={className}
    />
  )  
});

Cinema8Player.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  host: PropTypes.string,
  sdkUrl: PropTypes.string,
  autoplay: PropTypes.bool,
  muted: PropTypes.bool,
  subtitles: PropTypes.string,
  controls: PropTypes.bool,
  externalVideoUrl: PropTypes.string,
  authToken: PropTypes.string,
  externalUser: PropTypes.object,
  campaignParams: PropTypes.string,
  time: PropTypes.string,
  resumeLastPosition: PropTypes.bool,
  connectSharesWithParent: PropTypes.bool,
  type: PropTypes.string,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onProgress: PropTypes.func,
  onEnd: PropTypes.func,
  onCustomCallback: PropTypes.func,
  onWebhookResponse: PropTypes.func,
  onError: PropTypes.func,
  onBeforeUnload: PropTypes.func,
  onUnload: PropTypes.func
}

export default Cinema8Player;