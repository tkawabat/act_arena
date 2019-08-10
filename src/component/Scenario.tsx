import React, {Component} from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import { Platform, StyleSheet, Text, View, WebView } from 'react-native';

const js = (start, end) => {
    return `
var b, t, line;

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

var color = function() {
        b = document.querySelector("body");
        start = '${start}';
        end = '${end}';

        start_pos = b.textContent.indexOf(start);
        end_pos = b.textContent.indexOf(end);
        if (start_pos === -1 || end_pos === -1) return;
        end_pos += end.length;

        t = b.textContent.substring(start_pos, end_pos).split(new RegExp('\\r\\n|\\n|\\r', 'g'));
        for (line of t) {
            if (!line) continue;
            if (line.match(/^\s*$/)) continue;

            var regexp = new RegExp(line, 'g');
            $('body').highlightRegex(regexp, {
                    className: 'act_arena_highlight',
                    attrs: {'style': 'background: #FFCCCC'},
            });
        }
};

loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js", function() {
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jQuery.highlightRegex/0.1.2/highlightRegex.min.js", function() {
        color();

        // scroll
        var elm = $(".act_arena_highlight").first();
        if (elm.length) {
            var pos = elm.get(0).offsetTop - 100;
            $('body').stop().animate({scrollTop:pos}, 500);   
        }
    });
});
`;
}

interface ScenarioProps {
    url: string;
    start: string;
    end: string;
}

export default class Scenario extends Component<ScenarioProps> {

    render() {
        return (
                <WebView style={styles.webview}
                    javaScriptEnabled={true}
                    injectedJavaScript={js(this.props.start, this.props.end)}
                    source={{uri: this.props.url}}
                />
               );
    }
}


const styles = StyleSheet.create({
webview: {
},
});