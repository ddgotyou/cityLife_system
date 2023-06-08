
import React, { useEffect, useRef, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { message } from 'antd';

//请求接口
import userApi from '../../api/user';

const Login = () => {
    let userNameRef = useRef(null);
    let passWordRef = useRef(null);
    let loginRef = useRef(null);
    let setRef = useRef(null);
    //注册表
    let userForm = [useRef(null), useRef(null), useRef(null), useRef(null)];
    let navigate = useNavigate();

    useEffect(() => {
        loginRef.current.style.display = 'block';
        setRef.current.style.display = 'none';
        //清空
        userForm.forEach((item) => {
            item.current.value = null;
        })
    }, []);//加载时的初始状态

    const onSubmit = () => {
        //-----请求模块
        userApi.login({
            userId: userNameRef.current.value,
            password: passWordRef.current.value
        }).then(res => {
            if (res.data.code == 200) {
                //登陆成功覆盖
                message.success("登录成功!");
                localStorage.setItem('userToken', res.data.token);
                navigate('/home')//这时候才跳转
            }
            else {
                message.error(res.data.message);
            }
        })

    }
    //显示注册模块
    const onSet = () => {
        loginRef.current.style.display = 'none';
        setRef.current.style.display = 'block';
        //清空
        passWordRef.current.value = null;
        userNameRef.current.value = null;
    }
    //返回登录模块
    const returnLogin = () => {
        loginRef.current.style.display = 'block';
        setRef.current.style.display = 'none';
        //清空
        userForm.forEach((item) => {
            item.current.value = null;
        })
    }
    //完成注册
    const buildNewAccount = () => {
        if (userForm[1].current.value === userForm[2].current.value) {
            let param = { name: userForm[0].current.value, password: userForm[1].current.value, email: userForm[3].current.value };
            userApi.register(param).then(res => {
                if (res.data.code == 200) {
                    returnLogin();
                }
                else {
                    message.error(res.data.message);
                }
            })
        }
        else {
            message.error('请保证两次输入密码一致!');
        }
    }
    return (
        <div className='pageStyle'>
            <Card className="loginModule" ref={loginRef} hoverable>
                <Card.Title>欢迎开启智慧生活</Card.Title>
                <Card.Body>
                    <Form.Group >
                        <Form.Label>账号</Form.Label>
                        <Form.Control id="user" ref={userNameRef}></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>密码</Form.Label>
                        <Form.Control id="password" ref={passWordRef} type="password"></Form.Control>
                    </Form.Group>

                    <Button className="loginButton1" variant="outline-secondary" onClick={onSet}>注册</Button>
                    <Button className="loginButton2" variant="outline-primary" onClick={onSubmit}>登录</Button>
                </Card.Body>
            </Card>
            <Card className='setModule' ref={setRef}>
                {/* 回退图标 */}
                <Card.Title><ArrowLeftOutlined onClick={returnLogin} /><span style={{ display: 'inline-block', marginLeft: '43%', marginTop: '2%' }}>注册</span></Card.Title>
                <Card.Body>
                    <Form.Group >
                        <Form.Label>用户名</Form.Label>
                        <Form.Control ref={userForm[0]}></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>输入密码</Form.Label>
                        <Form.Control type="password" ref={userForm[1]}></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>确认密码</Form.Label>
                        <Form.Control type="password" ref={userForm[2]}></Form.Control>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>邮箱</Form.Label>
                        <Form.Control ref={userForm[3]}></Form.Control>
                    </Form.Group>
                    <Button className="loginButton1" variant="outline-secondary" onClick={returnLogin}>返回</Button>
                    <Button className="loginButton2" variant="outline-primary" onClick={buildNewAccount}>提交</Button>
                </Card.Body>
            </Card>
        </div>
    );
}


export default Login;