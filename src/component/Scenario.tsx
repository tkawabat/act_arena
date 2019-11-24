import React, { Component } from 'react';
import { WebView } from 'react-native';
import { observer } from 'mobx-react';

import ArenaStore from '../store/ArenaStore';


const js = (start, end) => {
    return `
function loadScript(src, callback) {
    var done;
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = src;
    head.appendChild(script);

    script.onload = script.onreadystatechange = function() {
        if ( !done && (!this.readyState ||
                    this.readyState === "loaded" || this.readyState === "complete") ) {
            done = true;
            callback();
        }
    };
}

var startPos = 0;
var body = $('body');

var color = function() {
    var b = document.querySelector("body");
    var start = '${start}';
    var end = '${end}';

    var start_pos = b.textContent.indexOf(start);
    var end_pos = b.textContent.indexOf(end);
    if (start_pos === -1 || end_pos === -1) return;
    end_pos += end.length;

    var t = b.textContent.substring(start_pos, end_pos).split(new RegExp('\\r\\n|\\n|\\r', 'g'));
    var line;
    for (line of t) {
        if (!line) continue;
        if (line.match(/^[\s　]*$/)) continue;

        var regexp = new RegExp(line, 'g');
        $('body').highlightRegex(regexp, {
                className: 'act_arena_highlight',
                attrs: {'style': 'background: #FFCCCC'},
        });
    }

    for (elm of $('.act_arena_highlight')) {
        if (!elm.textContent) continue;
        if (elm.textContent.indexOf(start) === -1) continue;

        startPos = elm.offsetTop - 100;
        break;
    }
    
};

var scroll2Top = function() {
    body.stop().animate({scrollTop:0}, 500);
}

var scroll2Start = function() {
    body.stop().animate({scrollTop:startPos}, 500);
}

loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jQuery.highlightRegex/0.1.2/highlightRegex.min.js", function() {
        color();
        scroll2Start();       
    });
});
`;
}

@observer
export default class Scenario extends Component {
    private webview:WebView;

    constructor(props) {
        super(props);

        ArenaStore.scroll2Top = () => {
            this.webview.injectJavaScript('scroll2Top();');
        }
        ArenaStore.scroll2Start = () => {
            this.webview.injectJavaScript('scroll2Start();');
        }
    }

    render() {
        return (
            <WebView
                javaScriptEnabled={true}
                ref={ref => this.webview = ref}
                injectedJavaScript={js(ArenaStore.startText, ArenaStore.endText)}
                source={{ uri: ArenaStore.scenarioUrl }}
            />
        );
    }
}