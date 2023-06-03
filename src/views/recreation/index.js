import React, { useState, useEffect } from "react";
import './index.css'
import { Card, Tabs, Button, Checkbox, Rate } from "antd";
//请求接口
import busiApi from '../../api/business';

const mallList = ['万达广场', '合生汇', '东方艺术中心', '五角场'];
const areaList = ['浦东区', '杨浦区', '青浦区', '长宁区', '嘉定区'];
const tabItems = [{
    label: '热门商区', key: 1, children: (() => {
        return mallList.map((item) => <li className="liItem">{item}</li>)
    })()
}, {
    label: '行政区', key: 2, children: (() => {
        return areaList.map((item) => <li className="liItem">{item}</li>)
    })()
}];
const cateList = [
    'KTV', '酒吧', '洗浴/汗蒸', '按摩/足疗', '剧本杀', '运动健身', '影院', '轰趴馆', '网吧/电竞', 'DIY手工坊'
]
const liStyle = { borderBottom: '1px solid #f0f0f0', paddingBottom: '1%' };



function Recreation() {
    const [busiList, setBusiList] = useState([]);
    //获得休闲娱乐店家列表
    useEffect(() => {
        busiApi.getBusiness({
            type: 2
        }).then(res => {
            setBusiList(res.data.data);
        })
    }, []);


    const cardHeader = <div className="header">
        <span>热门娱乐地点</span>
        <ul type="none" style={{ float: 'right', fontSize: '14px', fontWeight: 'normal', width: '25%' }}>
            <li className="liItem"><Checkbox className="ck" />好评</li>
            <div className="vr"></div>
            <li className="liItem"><Checkbox className="ck" />人气</li>
            <div className="vr"></div>
            <li className="liItem"><Checkbox className="ck" />距离</li>
        </ul>
    </div>
    return (
        <>
            <Card style={{ width: '80%', marginTop: '2%', marginLeft: '12%' }} title="休闲娱乐">
                <div className="part1">
                    <div className="showMore">更多</div>
                    <span>品类:</span>
                    <Button className="coverStyle" type="primary" shape="round" size="small" style={{ marginLeft: '50px' }}>
                        不限
                    </Button>
                    <div className="cateList">
                        <ul type="none" >
                            {(() => {
                                return cateList.map((item) => <li className="liItem" key={item}>{item}</li>)
                            })()
                            }
                        </ul>
                    </div>

                </div>
                <div className="part2">
                    <span>地点:</span>
                    <Button className="coverStyle" type="primary" shape="round" size="small" style={{ marginLeft: '50px' }}>
                        不限
                    </Button>
                    <div className="siteList">
                        <Tabs
                            defaultActiveKey="1"
                            type="card"
                            size="middle"
                            items={tabItems}
                        />
                    </div>

                </div>

            </Card >
            <Card style={{ marginLeft: '12%', width: '80%', marginTop: '2%', padding: '0 0' }} title={cardHeader}>
                <ul type="none">
                    {
                        busiList.map((item, index) => {
                            return <li style={index == 0 ? { ...liStyle } : { ...liStyle, paddingTop: '2%' }}>
                                <img style={{ width: '20%', height: 200, float: 'left' }} src="http://localhost:9000/images/shopImage/shop2.jpg"></img>
                                <div style={{ display: 'inline-block', marginLeft: '2%' }}>
                                    <h5>{item.name}</h5>
                                    <div className="shopInfo">
                                        <p><Rate disabled value={item.rank}></Rate> &nbsp;&nbsp;评分:{item.rank}</p>
                                        <p>{item.label}</p>
                                        <p>电话 :{item.tel}</p>
                                        <p>邮箱 :{item.mail}</p>
                                        <p>地址 :{item.place}</p>
                                    </div>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </Card>
        </>
    );
}

export default Recreation;