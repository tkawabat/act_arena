import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';

import ArenaStore from '../../store/ArenaStore';
import ArenaScenarioStore from '../../store/ArenaScenarioStore';


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
var body;

var color = function() {
    var text = body[0].textContent;
    var start = '${start}';
    var end = '${end}';

    var start_pos = text.indexOf(start);
    var end_pos = text.indexOf(end);
    if (start_pos === -1 || end_pos === -1) return;
    end_pos += end.length;

    var t = text.substring(start_pos, end_pos).split(new RegExp('\\r\\n|\\n|\\r', 'g'));
    var line = [];
    for (l of t) {
        if (!l || l.match(/^[\s　]*$/)) continue;
        line.push(l);
    }

    body.highlightRegex(new RegExp(line.join('|'), 'g'), {
            className: 'act_arena_highlight',
            attrs: {'style': 'background: #FFCCCC'},
    });

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
        body = $('body');
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

        ArenaScenarioStore.scroll2Top = () => {
            this.webview.injectJavaScript('scroll2Top();');
        }
        ArenaScenarioStore.scroll2Start = () => {
            this.webview.injectJavaScript('scroll2Start();');
        }
    }

    render() {
        return (
            <WebView
                javaScriptEnabled={true}
                ref={ref => this.webview = ref}
                injectedJavaScript={js(ArenaScenarioStore.startText, ArenaScenarioStore.endText)}
                source={{ uri: ArenaScenarioStore.scenarioUrl }}
            />
        );
    }
}