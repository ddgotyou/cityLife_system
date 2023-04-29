import React, { useState } from 'react';
import { Menu } from 'antd';
import './index.css'
import { MailOutlined, CoffeeOutlined, SmileOutlined } from '@ant-design/icons';
import '../../static/iconfont/iconfont.css'
const getItem = (label, key, icon, children, theme) => {
    return {
        key,
        icon,
        children,
        label,
        theme,
    };
}



function MyMenu(props) {
    const theme = 'light';
    const { onChange } = props;//解构会破坏响应性

    //菜单表
    const items = [
        getItem(
            '美食',
            1,
            <CoffeeOutlined />,
            null,
            theme,
        ),
        getItem(
            '休闲娱乐',
            2,
            <SmileOutlined />,
            null,
            theme,
        ),
        // getItem(
        //     '医疗健康',
        //     'op3',
        //     < MailOutlined />,
        //     null,
        //     theme,
        // ),
        getItem(
            '萌宠',
            3,
            <i className='iconfont'>&#xe641;</i>,
            null,
            theme,
        ),
        getItem(
            '跑腿',
            4,
            <i className='iconfont'>&#xe6bb;</i>,
            null,
            theme,
        ),
        // getItem(
        //     '圈子',
        //     5,
        //     < MailOutlined />,
        //     null,
        //     theme,
        // )
    ];


    //点击事件
    const isClick = (e) => {
        onChange(e.key);
    }

    return (
        <Menu
            className='menu'
            onClick={isClick}
            selectedKeys={[props.option]}
            mode="vertical"
            theme={theme}
            items={items}>
        </Menu>
    );

}

export default React.memo(MyMenu);