import React, { useState, useEffect } from "react";
import { ProCard } from '@ant-design/pro-components';
import { Card, Divider, Carousel, Tabs } from "antd";
import "./index.css"
import {
    DoubleRightOutlined
} from '@ant-design/icons';
import busiApi from '../../api/business'
//分为两大类：宠物店和服务  商品售卖
//参考网站：https://www.boqii.com/

//商品分类
const cate = ['狗粮', '猫粮', '零食', '玩具', '保健品', '医药品', '沐浴露', '日用品']
const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

function Animal() {
    const [petShop, setPetshop] = useState([]);
    const [petHos, setPetHos] = useState([]);
    useEffect(() => {
        busiApi.getBusinessPerCate({
            cate: '宠物店',
            type: 3,
        }).then(res => {
            console.log(res);
            setPetshop(res.data.data);
        });
        busiApi.getBusinessPerCate({
            cate: '宠物医院',
            type: 3,
        }).then(res => {
            setPetHos(res.data.data);
        })
    }, []);

    const cardHeader = <div className="header">
        <span style={{ fontSize: '18px' }}>附近的</span>
        <div className="more" style={{ float: 'right', fontSize: '14px', fontWeight: 'normal', width: '10%' }}>
            <DoubleRightOutlined style={{ marginRight: "10px", marginTop: 4, overflow: 'hidden' }} />查看更多店家
        </div>
    </div>
    return (
        <>
            <Card style={{ width: '80%', marginTop: '2%', marginLeft: '12%' }} title={cardHeader}>
                <Card className="shop" title="宠物店">
                    {

                        petShop.map((item, index) => {
                            return <><div className={index === petShop.length - 1 ? "lastCard" : "subCard"}>
                                <img src={require('../../static/images/shop.jpg')} style={{ width: '100%' }}></img>
                                <hr />
                                <span>{item.name}</span>
                                <br />
                                <ul type="none">
                                    <li>
                                        地址：{item.place}
                                    </li>
                                    <li>
                                        TEL：{item.tel}
                                    </li>
                                    <li>
                                        邮箱：{item.mail}
                                    </li>
                                    {/* <li>
                                        更多
                                    </li> */}
                                </ul>
                            </div>

                            </>
                        })
                    }

                </Card>
                <Card className="hospital" title="宠物医院">
                    {

                        petHos.map((item, index) => {
                            return <><div className={index === petHos.length - 1 ? "lastCard" : "subCard"}>
                                <img src={require('../../static/images/shop.jpg')} style={{ width: '100%' }}></img>
                                <hr />
                                <span>{item.name}</span>
                                <br />
                                <ul type="none">
                                    <li>
                                        地址：{item.place}
                                    </li>
                                    <li>
                                        TEL：{item.tel}
                                    </li>
                                    <li>
                                        邮箱：{item.mail}
                                    </li>
                                    {/* <li>
                                        更多
                                    </li> */}
                                </ul>
                            </div>

                            </>
                        })
                    }
                </Card>
            </Card>

            <Card style={{ marginLeft: '12%', width: '80%', marginTop: '2%' }} >
                <div className="subArea">
                    {/* <span className="title">狗狗</span> */}
                    <ProCard
                        className="product"
                        split='vertical'
                        bordered
                    >
                        <ProCard title="热门推荐" colSpan="30%">
                            <Carousel >
                                <div>
                                    <h3 style={contentStyle}>1</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>2</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>3</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>4</h3>
                                </div>
                            </Carousel>
                        </ProCard>
                        <ProCard className="aniSate">
                            <Tabs
                                defaultActiveKey="1"
                                type="card"
                                size="large"
                                items={cate.map((item, i) => {
                                    const id = "type" + String(i + 1);
                                    return {
                                        label: item,
                                        key: id,
                                        children: `Content of card tab ${id}`,
                                    };
                                })}
                            />
                        </ProCard>
                    </ProCard>
                </div>
            </Card>

        </>
    );
}

export default Animal;