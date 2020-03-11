import React, { Component } from 'react';
import { ActivityIndicator, } from 'react-native';
import { WebView } from 'react-native-webview';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';

import * as WebViewJs from '../../lib/WebViewJs';

import ArenaScenarioStore from '../../store/ArenaScenarioStore';


const js = (start, end) => {
    return `
${WebViewJs.init}
${WebViewJs.loadScriptFunction}

window.ActArena.scroll2Top = function() {
   window.ActArena.body.stop().animate({scrollTop:0}, 500);
}

window.ActArena.scroll2Start = function() {
   window.ActArena.body.stop().animate({scrollTop:window.ActArena.startPos}, 500);
}

window.ActArena.color = function() {
    var text = window.ActArena.body[0].textContent;
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

    window.ActArena.body.highlightRegex(new RegExp(line.join('|'), 'g'), {
        className: 'act_arena_highlight',
        attrs: {'style': 'background: #FFCCCC'},
    });

    for (elm of $('.act_arena_highlight')) {
        if (!elm.textContent) continue;
        if (elm.textContent.indexOf(start) === -1) continue;

        window.ActArena.startPos = elm.offsetTop - 100;
        break;
    }

    window.ReactNativeWebView.postMessage('colored');
};

window.ActArena.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", function() {
    window.ActArena.loadScript("https://cdnjs.cloudflare.com/ajax/libs/jQuery.highlightRegex/0.1.2/highlightRegex.min.js", function() {
        window.ActArena.body = $('body');
        window.ActArena.color();
        window.ActArena.scroll2Start();       
    });
});
`;
}

@observer
export default class Scenario extends Component {
    private webview:WebView;

    private setWebview = (ref) => {
        this.webview = ref;
    }

    private onMessage = (event) => {
        const { data } = event.nativeEvent;
        if (data === 'colored') {
            ArenaScenarioStore.isColored = true;
        }
    };

    constructor(props) {
        super(props);

        ArenaScenarioStore.scroll2Top = () => {
            this.webview.injectJavaScript('window.ActArena.scroll2Top();');
        }
        ArenaScenarioStore.scroll2Start = () => {
            this.webview.injectJavaScript('window.ActArena.scroll2Start();');
        }
    }

    render() {
        return (
            <Root>
                <WebView
                    javaScriptEnabled={true}
                    ref={this.setWebview}
                    injectedJavaScript={"setTimeout(function() { "+js(ArenaScenarioStore.startText, ArenaScenarioStore.endText)+"}, 0)"}
                    source={{ uri: ArenaScenarioStore.scenarioUrl }}
                    onMessage={this.onMessage}
                />
                {!ArenaScenarioStore.isColored && <Spinner size='large' />}
            </Root>
        );
    }
}

const Root = styled.View`
    flex: 1;
`;

const Spinner = styled(ActivityIndicator)`
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
`