import React from "react";
import ReactDOM from "react-dom";
import each from "underscore";
import "es6-promise/auto";

import App from "./App";
import blockData from "../data/home.json";

console.log("IKEA Textiles version 1.4");

(function() {
  window.textiles = {};

  if (process.env.NODE_ENV === "development") {
    window.textiles.assetPath = "/";
  } else if (process.env.NODE_ENV === "staging") {
    // window.textiles.assetPath = "//rabbithole.ikea.com/campaigns/textiles/staging/";
    window.textiles.assetPath = "//rabbithole.ikea.com/campaigns/mantra-generator/staging/";
  } else {
    // window.textiles.assetPath = "//rabbithole.ikea.com/campaigns/mantra-generator/production/";
    window.textiles.assetPath = "//rabbitholetestorch001.blob.core.windows.net/plugins/dist/";
  }

  if (window.location.href.indexOf("/ie/en/") !== -1) {
    window.textiles.locale = "ie-en";
    window.textiles.localeSimple = "ieen";
  } else {
    window.textiles.locale = "gb-en";
    window.textiles.localeSimple = "gben";
  }

  window.textiles.isTouch = "ontouchstart" in window;

  // In dev we have no jquery, so use DOMContentLoaded
  if (process.env.NODE_ENV === "development") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    // In staging and production we have IKEA's window.$
    $(document).ready(function() {
      $("head").append(
        '<link rel="stylesheet" href="' +
          window.textiles.assetPath +
          'textiles.css" type="text/css" />'
      );
      init();
    });
  }

  function init() {
    // Google Analytics
    (function(i, s, o, g, r, a, m) {
      i.GoogleAnalyticsObject = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-117378796-1", "auto");
    ga("send", "pageview", window.location.pathname);

    // Find first script tags so others can be inserted before this;
    const firstScriptTag = document.getElementsByTagName("script")[0];
    const facebookScriptTag = document.createElement("script");

    // Add FB API
    facebookScriptTag.type = "text/javascript";
    facebookScriptTag.src = "https://connect.facebook.net/en_US/sdk.js";
    firstScriptTag.parentNode.insertBefore(facebookScriptTag, firstScriptTag);

    // Add YouTube API
    window.youTubeIframeAPIReady = false;
    window.youTubeCallbacks = [];

    window.onYouTubeIframeAPIReady = function() {
      window.youTubeIframeAPIReady = true;
      each(window.youTubeCallbacks, callback => {
        callback();
      });
    };

    const youtubeScriptTag = document.createElement("script");
    youtubeScriptTag.type = "text/javascript";
    youtubeScriptTag.src = "https://www.youtube.com/iframe_api";
    firstScriptTag.parentNode.insertBefore(youtubeScriptTag, firstScriptTag);

    // Add main div to page
    const pageModule = getElement("IKEA-PageModule-Editorial-Editorial");
    const ikeaTextiles = document.createElement("div");
    ikeaTextiles.setAttribute("id", "textiles-main");
    ikeaTextiles.setAttribute("style", "display:none;");
    pageModule.appendChild(ikeaTextiles);

    // Add touch class if neccessary
    if (window.textiles.isTouch) {
      document.getElementById("textiles-main").setAttribute("class", "touch");
    }

    // Get blocks
    const blocks = blockData.blocks;

    // Do we have a block we need to move? (due to something being the QS)
    const blockToMove = getBlockToMove(blocks);

    // Reorder blocks if neccessary
    const correctlyOrderedBlocks =
      typeof blockToMove === "undefined" ? blocks : moveBlockToIndex(blocks, blockToMove, 1);

    // React mount point
    ReactDOM.render(
      <App blockData={correctlyOrderedBlocks} />,
      document.querySelector("#textiles-main")
    );
  }

  function moveBlockToIndex(array, blockToMove, toIndex) {
    const fromIndex = array.indexOf(blockToMove);
    if (toIndex === fromIndex) return array;

    const increment = toIndex < fromIndex ? -1 : 1;

    for (let k = fromIndex; k !== toIndex; k += increment) {
      array[k] = array[k + increment];
    }
    array[toIndex] = blockToMove;
    return array;
  }

  function getBlockToMove(array) {
    let blockToMove;
    if (window.location.href.toLowerCase().indexOf("section=ideas") !== -1) {
      setTimeout(()=>{
        if((window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0) <= 0){
          window.scrollTo(0, document.getElementById("section-ideas").offsetTop - 82);
        }
      },250)
    }
    return blockToMove;
  }

  

  function getElement(className) {
    return document.getElementsByClassName(className)[0];
  }
})();
