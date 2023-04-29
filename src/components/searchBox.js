import React from "react";
import './index.css'
import { Input, Button, Card } from 'antd';

const inputStyle = {
    display: 'inline-block',
    width: '50%',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 5,
}

const buttonStyle = {
    display: 'inline-block',
    width: '10%',
    color: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 0,
}


function searchBox() {
    return (
        <Card style={{ borderRadius: '0 0 0 0', width: '110vw', marginLeft: '-10vw' }}>
            <div className="searchWrapper" style={{ marginLeft: '26%', height: '10vh', paddingTop: '2%' }}>
                <Input size="large" style={inputStyle} placeholder="搜索关键词(商家、商品、活动类型等)"></Input>
                <Button size="middle" type="primary" style={buttonStyle}>搜索</Button>
            </div>
        </Card>
    );
}

export default searchBox;