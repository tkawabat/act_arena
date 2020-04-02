import React from 'react';
import { Linking } from 'react-native';
import { Content, Button, Text, Icon, ListItem, Separator } from 'native-base';
import { observer } from 'mobx-react';

import ScreenBase from './ScreenBase';
import * as BasicStyle from '../../lib/BasicStyle';
import { ScreenRoot, } from '../../lib/BasicModule';
import Navigator from '../../lib/Navigator';
import licenseJson from '../../../license.json';

import styled from 'styled-components/native';

import BasicHeader from '../l3/BasicHeader';


@observer
export default class CopyrightScreen extends ScreenBase {
    private softwares = []
    
    constructor(props) {
        super(props);
        for (const name in licenseJson) {
            this.softwares.push(name+'\n');
        }
    }

    render() {
        return (
            <ScreenRoot>
                <BasicHeader title={'著作権表示'} back={true} />
                
                <Content>
                    <_Separator bordered>
                        <SubTitle>台本サイト</SubTitle>
                    </_Separator>
                    <ListItem>
                        <Text>doodle.txt © ススキドミノ</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('http://doodletxt.web.fc2.com/')} />
                    </ListItem>
                    <ListItem>
                        <Text>VOX◆BOX © Soromon / Genn Torikata</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('https://srmntrktgnn.wixsite.com/voxbox')} />
                    </ListItem>
                    <ListItem>
                        <Text>ぴよぴよつづる。。。 © 早川ふう</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('http://piyo2script.starfree.jp/')} />
                    </ListItem>
                    <ListItem>
                        <Text>台本棚 © agemakiyorika</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('http://agemakitxt.webcrow.jp/txt/text00.html')} />
                    </ListItem>

                    <_Separator bordered>
                        <SubTitle>BGM</SubTitle>
                    </_Separator>
                    <ListItem>
                        <Text>騒音のない世界 © 2019 beco</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('https://noiselessworld.net')} />
                    </ListItem>

                    <_Separator bordered>
                        <SubTitle>SE</SubTitle>
                    </_Separator>
                    <ListItem>
                        <Text>ポケットサウンド</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('https://pocket-se.info/')} />
                    </ListItem>

                    <_Separator bordered>
                        <SubTitle>ソフトウェア</SubTitle>
                    </_Separator>
                    <SoftwareText>
                        {this.softwares}
                    </SoftwareText>
                </Content>
            </ScreenRoot>
        );
    }
}

const _Separator = styled(Separator)`
    background-color: ${BasicStyle.colorLight};
`;


const SubTitle = styled.Text`
    font-weight: 700;
    color: #fff;
`;

const LinkIcon = styled(Icon)`
    margin-left: auto;
    font-size: 20px;
    color: gray;
`

const SoftwareText = styled.Text`
    margin-left: 12px;
    font-size: 16px;
    line-height: 28px;
`