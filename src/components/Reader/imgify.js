Object.defineProperty(exports, '__esModule', { value: true });

//function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

// Autoconvert URL-like texts to links

// Stupid fabric to avoid singletons, for thread safety.
// Required for engines like Nashorn.
//
/*function createLinkifier() {
  var links = [];
  var autolinker = new Autolinker({
    stripPrefix: false,
    url: true,
    email: false,
    replaceFn: function (match) {
      // Only collect matched strings but don't change anything.
      switch (match.getType()) {
        /*eslint default-case:0*/
/*case 'url':
  links.push({
    text: match.matchedText,
    url: match.getUrl()
  });
  break;
}
return false;
}
});
return {
links: links,
autolinker: autolinker
};
}*/



function parseTokens(state) {
  var i, j, l, tokens, sources, alt, nodes, blockTokens = state.tokens;
  //linkifier = null, links, autolinker;

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline') { continue; }
    tokens = blockTokens[j].children;
    nodes = [];

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {

      let regex = /(https?:\/\/.*\.(?:png|jpg))/;

      if (tokens[i].type === 'text' && tokens[i].content.match(regex)) {

        sources = tokens[i].content.match(regex);
        console.log(sources);

        alt = sources[0].slice(-14, sources[0].length).replace(/-/gi, "");

        nodes.push({
          type: "image",
          src: sources[0],
          title: "",
          alt: alt,
          level: tokens[i].level
        });
      }

      if (nodes.length > 0) {
        blockTokens[j].children = tokens = [].concat(nodes);
      }
    }
  }
}

function imgify(md) {
  md.core.ruler.push('imgify', parseTokens);
}

exports.imgify = imgify;
