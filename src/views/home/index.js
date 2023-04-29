import React, { useCallback, useState } from 'react';
import Menu from './menu';
import '../../static/iconfont/iconfont.css'
import { Layout, Card } from 'antd';
import {
    HomeOutlined,
    UserOutlined
} from '@ant-design/icons';
import './index.css'
import Search from '../../components/searchBox'

//引入子页面
import Food from '../food';
import Animal from '../animal';
import Errand from '../errand';
import Recreation from '../recreation';
import Social from '../social';
import HomeContent from './content';

//布局元素拆解
const { Header, Content, Sider } = Layout;
//布局样式
const headerStyle = {
    color: '#fff',
    height: 64,
    backgroundColor: '#ffc34d',
};

const contentStyle = {
    width: '100%',
    color: '#fff',
    overflowX: 'hidden',
    zIndex: '99',
    marginTop: '4%'
}

function Home() {
    const [subPageType, setPageType] = useState('0');
    const changeSub = useCallback((value) => {

        setPageType(value);
    }, [subPageType]);

    return (

        <Layout style={{ height: 100 + 'vh', overflowX: 'hidden' }}>
            <Header style={headerStyle}>
                <div className='leading'>
                    {/* 前面放：图标和网站名称 */}
                    <span className='title'>奇点APP /  </span>
                    {(() => {
                        //-----switch case使用的是严格比较
                        switch (subPageType) {
                            case '0': return <span>首页</span>;
                            case '1': return <span>美食</span>;
                            case '2': return <span>休闲娱乐</span>;
                            case '3': return <span>萌宠</span>;
                            case '4': return <span>跑腿</span>;
                            case '5': return <span>圈子</span>;
                            default: return null;
                        }

                    })()}
                </div>
                <div className='backIcon'>
                    {/* 后面放：用户图标和设置*/}
                    <span id='home' onClick={() => setPageType('0')}><HomeOutlined /></span>
                    <span style={{ marginLeft: 40 }}><UserOutlined /></span>
                </div>
            </Header>
            <Content>
                <Layout>
                    <Header style={{ backgroundColor: '#fff', width: '100vw' }}><Search /></Header>
                    <Content style={contentStyle}>

                        <Menu onChange={changeSub} option={subPageType} />

                        {/* 下面放：子页面*/}
                        {(() => {

                            switch (subPageType) {
                                case '0': return <HomeContent />;
                                case '1': return <Food />;
                                case '2': return <Recreation />;
                                case '3': return <Animal />;
                                case '4': return <Errand />;
                                case '5': return <Social />;
                                default: return null;
                            }
                        })()}

                    </Content>
                </Layout>
            </Content>
        </Layout>

    );

}

export default Home;