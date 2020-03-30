import React from 'react';
import { Linking } from 'react-native';
import { Container, Content, Header, Left, Body, Right, Button, Text, Title, Icon, ListItem, Separator } from 'native-base';
import { observer } from 'mobx-react';

import licenseJson from '../../../license.json';
import ScreenBase from './ScreenBase';
import * as BasicStyle from '../../lib/BasicStyle';
import Navigator from '../../lib/Navigator';

import styled from 'styled-components/native';


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
            <Root>
                <Header_>
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' onPress={Navigator.back} />
                        </Button>
                    </Left>
                    <Body>
                        <Title>著作権表示</Title>
                    </Body>
                    <Right />
                </Header_>
                <Content>
                    <Separator bordered>
                        <SubTitle>台本</SubTitle>
                    </Separator>
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

                    <Separator bordered>
                        <SubTitle>BGM</SubTitle>
                    </Separator>
                    <ListItem>
                        <Text>騒音のない世界 © 2019 beco</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('https://noiselessworld.net')} />
                    </ListItem>

                    <Separator bordered>
                        <SubTitle>SE</SubTitle>
                    </Separator>
                    <ListItem>
                        <Text>ポケットサウンド</Text>
                        <LinkIcon name='external-link-alt' type='FontAwesome5' onPress={() =>  Linking.openURL('https://pocket-se.info/')} />
                    </ListItem>

                    <Separator bordered>
                        <SubTitle>ソフトウェア</SubTitle>
                    </Separator>
                    <SoftwareText>
                        {this.softwares}
                    </SoftwareText>
                </Content>
            </Root>
        );
    }
}


const Root = styled(Container)`
    ${BasicStyle.screenRoot}
`

const Header_ = styled(Header)`
    padding-top: 0;
    height: 50px;
`

const SubTitle = styled.Text`
    font-weight: 700;
`

const LinkIcon = styled(Icon)`
    margin-left: auto;
    font-size: 20px;
    color: gray;
`

const SoftwareText = styled.Text`
    margin-horizontal: 10px;
    font-size: 16px;
    line-height: 24px;
`