import React, { useRef, useState } from "react";
import './index.css'
import { Input, Button, Card } from 'antd';
import moment from "moment/moment";


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

//组件名大写
function SearchBox(props) {
    const info = useRef(null);
    const submitSearch = () => {
        let curtime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        let sec = parseInt(props.sec);
        //向顶层传回数据
        props.onClick({
            historySearch: info.current.input.value,
            sector: parseInt(sec),
            time: curtime
        });

    }

    return (
        <Card style={{ borderRadius: '0 0 0 0', width: '110vw', marginLeft: '-10vw' }}>
            <div className="searchWrapper" style={{ marginLeft: '26%', height: '10vh', paddingTop: '2%' }}>
                <Input size="large" ref={info} style={inputStyle} placeholder="搜索关键词(商家、商品、活动类型等)"></Input>
                <Button size="middle" type="primary" style={buttonStyle} onClick={submitSearch}>搜索</Button>
            </div>
        </Card>
    );
}

export default SearchBox;