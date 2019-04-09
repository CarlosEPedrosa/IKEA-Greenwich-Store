import React, { Component } from "react";

import Divider from "./blocks/Divider";
import Heading from "./blocks/Heading";
import ProductGrid from "./blocks/ProductGrid";
import Reasons from "./blocks/Reasons";
import YouTube from "./blocks/YouTube";
import Ideas from "./blocks/Ideas";

import PreloaderContext from "./PreloaderContext";

class App extends Component {
  constructor(props) {
    super(props);

    this.preloadItemsTotal = 0;
    this.preloadItemsLoaded = 0;

    this.state = {
      pagePreloaded: false
    };

    this.registerPreloadItem = this.registerPreloadItem.bind(this);
    this.handleItemPreloaded = this.handleItemPreloaded.bind(this);
  }

  registerPreloadItem() {    
    this.preloadItemsTotal++;
  }

  handleItemPreloaded() {
    this.preloadItemsLoaded++;
    if (this.preloadItemsLoaded === this.preloadItemsTotal) {
      this.setState({ pagePreloaded: true });
    }
  }

  renderBlocks() {
    const { blockData } = this.props;
    return blockData.map((block, index) => {
      const type = block.type;
      switch (type) {
        case "Divider":
          return <Divider key={`${type}-${index}`} blockID={index} />;
        case "Heading":
          return <Heading key={`${type}-${index}`} data={block} blockID={index} />;
        case "ProductGrid":
          return <ProductGrid data={block} blockID={index} key={index} />;
        case "Reasons":
          return <Reasons data={block} blockID={index} key={index} />;
        case "YouTube":
          return <YouTube data={block} blockID={index} key={index} />;
        case "Ideas":
          return <Ideas data={block} blockID={index} key={index} />;
        default:
          return null;
      }
    });
  }

  render() {
    return (
      <PreloaderContext.Provider
        value={{
          pagePreloaded: this.state.pagePreloaded,
          registerPreloadItem: this.registerPreloadItem,
          handleItemPreloaded: this.handleItemPreloaded
        }}
      >
        <div>{this.renderBlocks()}</div>
      </PreloaderContext.Provider>
    );
  }
}

export default App;
