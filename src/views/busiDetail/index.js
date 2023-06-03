import React, { useEffect, useState } from 'react';
import '../../static/iconfont/iconfont.css'
import { Layout, Card, Rate, Button } from 'antd';
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
                    <Header style={{ backgroundColor: '#fff', width: '100vw' }}><Search /></Header>
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
                            <div className='functional'><HeartOutlined /><ShareAltOutlined /></div>
                            <Button type="primary" size="middle">
                                写评价
                            </Button>

                        </Card>
                        <Card className='recommend'>
                            <h5>猜你喜欢</h5>
                            <ul>
                                {/* 推荐列表 */}
                                <li>孔雀</li>
                                <li>岳阳楼</li>
                                <li>金孔雀</li>
                            </ul>
                        </Card>
                        <Card className='products'>
                            <h5>火热推荐</h5>
                            {pItems.length ?
                                <ul type="none">
                                    {pItems.map((item, index) => {
                                        return (
                                            <li>
                                                <div>
                                                    <img src=''></img>
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

                            {commentList.length ? <ul type="none">{commentList.map((item, index) => {
                                return (
                                    <li>
                                        <div>
                                            <img src=''></img>
                                            <span>{item.userName}</span>
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
            </Content>
        </Layout>
    );

}

export default BusiDetail;