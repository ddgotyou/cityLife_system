import React, { useEffect, useState } from 'react';
import '../../static/iconfont/iconfont.css'
import { Layout, Card, Rate, Button, List } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    HeartOutlined,
    ShareAltOutlined
} from '@ant-design/icons';
import './index.css'
import Search from '../../components/searchBox'
import { useLocation, useNavigate } from 'react-router-dom'

//请求接口
import proApi from '../../api/product';
import comApi from '../../api/comment';
import historyApi from '../../api/history';

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




function BusiDetail() {
    let navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    //产品列表
    const [pItems, setPItems] = useState([]);
    const [commentList, setCommentList] = useState([]);

    //猜你喜欢的推荐列表
    const [recommendList, setRecommendList] = useState([{
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    }]);

    useEffect(() => {
        proApi.getBusiProduct({ busiId: state.id }).then((res) => {
            setPItems(res.data.data);
        })
        //获得商家评论
        comApi.getBusiComment({ busiId: state.id, tType: 'b' }).then((res) => {
            console.log(res.data.data);
            setCommentList(res.data.data);
        })
    }, [])

    const locateHome = () => {
        navigate('/home');
    }

    const clickSearch = (obj) => {
        //本身拦截器就会自带token，后端解析便可
        historyApi.search({ ...obj });
    };


    return (
        <Layout style={{ height: 100 + 'vh', overflowX: 'hidden' }}>
            <Header style={headerStyle}>
                <div className='leading'>
                    {/* 前面放：图标和网站名称 */}
                    <span className='title'>奇点APP /  </span>
                    <span>商家详情</span>
                </div>
                <div className='backIcon'>
                    {/* 后面放：用户图标和设置*/}
                    <span id='home' onClick={locateHome}><HomeOutlined /></span>
                    <span style={{ marginLeft: 40 }}><UserOutlined /></span>
                </div>
            </Header>
            <Content>
                <Layout>
                    <Header style={{ backgroundColor: '#fff', width: '100vw' }}><Search sec='0' onClick={clickSearch} /></Header>
                    <Content style={contentStyle}>
                        <Card className='info'>
                            <img style={{ width: '20%', height: 200, float: 'left' }} src="http://localhost:9000/images/shopImage/shop2.jpg"></img>
                            <div style={{ display: 'inline-block', marginLeft: '2%' }}>
                                <h5>{state.name}</h5>
                                <div className="shopInfo">
                                    <p><Rate disabled value={state.rank}></Rate> &nbsp;&nbsp;评分:{state.rank}</p>
                                    <p>{state.label}</p>
                                    <p>电话 :{state.tel}</p>
                                    <p>邮箱 :{state.mail}</p>
                                    <p>地址 :{state.place}</p>
                                </div>
                            </div>
                            <div className='functional'><HeartOutlined className='like' /><ShareAltOutlined className='share' /></div>
                            <Button type="primary" size="middle" className='writeComment'>
                                写评价
                            </Button>

                        </Card>
                        <Card className='recommend'>
                            <h5>猜你喜欢</h5>
                            <List
                                grid={{
                                    gutter: 8,
                                    column: 2,
                                }}
                                dataSource={recommendList}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card title={item.title} hoverable>Card content</Card>
                                    </List.Item>
                                )}
                            />

                        </Card>
                        <Card className='products'>
                            <h5>火热推荐</h5>
                            {pItems.length ?
                                <ul type="none" style={{ marginLeft: '-2%' }}>
                                    {pItems.map((item, index) => {
                                        return (
                                            <li style={{ float: 'left', marginRight: '5%' }}>
                                                <div>
                                                    <img style={{ width: '50px', height: '50px', marginRight: '5px' }} src='http://localhost:9000/images/productImage/菜品.jpg'></img>
                                                    <p>{item.name}</p>
                                                </div>
                                            </li>
                                        )
                                    })}</ul>
                                : <p>暂无产品</p>
                            }

                        </Card>
                        <Card className='comments'>
                            <h5>网友评价</h5>

                            {commentList.length ? <ul type="none" >{commentList.map((item, index) => {
                                return (
                                    <li style={{ borderBottom: '1px solid #f0f0f0', marginLeft: '-3%', marginTop: '1%' }}>
                                        <div>
                                            <img style={{ width: '30px', height: '30px', marginRight: '5px' }} src='http://localhost:9000/images/userImage/默认用户头像.jpg'></img>
                                            <span><b>{item.userName}</b></span>
                                            <Rate disabled value={item.rank}></Rate>
                                            <pre>{item.content}</pre>
                                        </div>
                                    </li>
                                )
                            })} </ul>
                                : <p>暂无评价</p>
                            }

                        </Card>
                    </Content>
                </Layout>
            </Content >
        </Layout >
    );

}

export default BusiDetail;