import React, { useEffect, useState } from 'react';
import '../../static/iconfont/iconfont.css'
import { Layout, Card, Rate, Button, List, Modal, Form, message, Input, Upload } from 'antd';
import {
    HomeOutlined,
    UserOutlined,
    HeartOutlined,
    ShareAltOutlined,
    PlusOutlined, LoadingOutlined, ReloadOutlined
} from '@ant-design/icons';
import './index.css'
import Search from '../../components/searchBox'
import { useLocation, useNavigate } from 'react-router-dom'

//请求接口
import proApi from '../../api/product';
import comApi from '../../api/comment';
import historyApi from '../../api/history';
import busiApi from '../../api/business';
import moment from 'moment';

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

//排序函数
const order = (a, b) => {
    if (a.rank < b.rank) return 1;
    else if (a.rank > b.rank) return -1;
    else if (a.rank == b.rank) return 0;
}

const { TextArea } = Input;
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function BusiDetail() {
    let navigate = useNavigate();
    const location = useLocation();
    //antd自带的hook
    const [formRef] = Form.useForm();
    const { state } = location;
    //写评论
    const [open, setOpen] = useState(false);
    const [flavorRank, setFR] = useState(0);
    const [environRank, setEN] = useState(0);
    const [serviceRank, setSE] = useState(0);
    const onFRchange = (value) => {

    }
    const onENchange = (value) => {

    }
    const onSEchange = (value) => {

    }
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    //产品列表
    const [pItems, setPItems] = useState([]);
    const [commentList, setCommentList] = useState([]);

    //猜你喜欢的推荐列表
    const [recommendList, setRecommendList] = useState([]);

    useEffect(() => {
        //获得所有产品
        proApi.getBusiProduct({ busiId: state.id }).then((res) => {
            setPItems(res.data.data);
        })
        //获得商家评论
        comApi.getBusiComment({ busiId: state.id, tType: 'b' }).then((res) => {
            console.log(res.data.data);
            setCommentList(res.data.data);
        })
        //获得猜你喜欢的推荐
        busiApi.getBusinessPerCate({
            cate: state.label,
            type: state.type
        }).then((res) => {
            //推荐前5个，按评分排序
            let cur = res.data.data.filter((item) => item.id != state.id);
            cur.sort(order);
            cur = cur.map((item) => {
                return { title: item.name, rank: item.rank };
            })
            setRecommendList(cur.slice(0, 5));
        })
    }, [])

    const locateHome = () => {
        navigate('/home');
    }

    const clickSearch = (obj) => {
        //本身拦截器就会自带token，后端解析便可
        historyApi.search({ ...obj });
    };

    //写评论位置的打开
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
        formRef.resetFields();
    };
    const submitModal = () => {
        console.log(formRef.getFieldValue());
        //写入后端
        let obj = formRef.getFieldValue();
        let res = {};
        res.tId = state.id;
        res.tType = 'b';//代表是对商家的评论
        res.content = obj.comment;
        res.rank = ((obj.flavor + obj.service + obj.environ) / 3).toFixed(1);
        res.time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        comApi.submitComment(res).then((r) => {
            message.success(r.data.message);
        });
        setOpen(false);
        formRef.resetFields();
    }

    //刷新评论
    const reloadComments = () => {
        //获得商家评论
        comApi.getBusiComment({ busiId: state.id, tType: 'b' }).then((res) => {
            setCommentList(res.data.data);
        })
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
                    <Header style={{ backgroundColor: '#fff', width: '100vw' }}><Search sec='0' onClick={clickSearch} /></Header>
                    <Content style={contentStyle}>
                        <Modal
                            title="写下你的评价"
                            open={open}
                            onOk={submitModal}
                            onCancel={hideModal}
                            okText="发布"
                            cancelText="取消"
                            className='myModal'
                        >
                            <Form form={formRef}>
                                <Form.Item label="口味" name="flavor"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <Rate value={flavorRank} onChange={onFRchange} />
                                </Form.Item>

                                <Form.Item label="环境" name="environ"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <Rate value={environRank} onChange={onENchange} />
                                </Form.Item>

                                <Form.Item label="服务" name="service"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <Rate value={serviceRank} onChange={onSEchange} />
                                </Form.Item>

                                <Form.Item label="具体评论" style={{ marginTop: '20px' }} name="comment"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <TextArea
                                        showCount
                                        maxLength={300}
                                        style={{ width: 300, height: 120, marginRight: 190 }}

                                        placeholder="让大家看到你的评价~"
                                    />
                                </Form.Item>
                                <Form.Item label="图片描述" style={{ marginTop: '20px' }} name="pic"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}>
                                    <Upload
                                        name="avatar"

                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </Form.Item>
                            </Form>
                        </Modal>

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
                            <Button type="primary" size="middle" className='writeComment' onClick={showModal}>
                                写评价
                            </Button>

                        </Card>
                        <Card className='recommend'>
                            <h5>猜你喜欢</h5>
                            <List
                                grid={{
                                    gutter: 5,
                                    column: 1,
                                }}
                                dataSource={recommendList}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Card title={item.title} hoverable>
                                            <Rate disabled value={item.rank}></Rate>
                                            <span> 评分: {item.rank}</span>
                                        </Card>
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
                            <ReloadOutlined className='reload' title="刷新评论" onClick={reloadComments} />
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