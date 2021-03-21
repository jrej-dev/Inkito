Object.defineProperty(exports, '__esModule', { value: true });

function parseTokens(state) {
  var i, j, l, tokens, sources, alt, nodes, blockTokens = state.tokens;
  //linkifier = null, links, autolinker;
  var afterRule = false;
  var firstImage = true;
  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline') {
      if (blockTokens[j].type === 'hr') {
        afterRule = true;
      }
      continue;
    }
    tokens = blockTokens[j].children;
    nodes = [];

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      if (tokens[i]) {
        let regex = /(https?:\/\/.*\.(?:png|jpg))/;
        if (tokens[i].type === 'text' && tokens[i].content.match(regex)) {

          sources = tokens[i].content.match(regex);

          alt = sources[0].slice(-14, sources[0].length).replace(/-/gi, "");

          nodes.push({
            type: "image",
            src: sources[0],
            title: "",
            alt: afterRule ? "infoImage" : alt,
            level: tokens[i].level
          });
        }

        if (!afterRule && tokens[i].type === 'htmltag' && tokens[i].content === "<hr/>") {
          afterRule = true;
        }

        if (tokens[i].type === 'image' && firstImage) {
          firstImage = false;
        } else if (tokens[i].type === 'image' && afterRule && !firstImage) {
          tokens[i].alt = "infoImage"
        }

        if (nodes.length > 0) {
          blockTokens[j].children = tokens = [].concat(nodes);
        }
      }
    }
  }
}

function imgify(md) {
  md.core.ruler.push('imgify', parseTokens);
}

exports.imgify = imgify;
