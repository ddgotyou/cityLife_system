import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Select, Input, Radio, Upload, message, Button } from "antd";
import {
    DoubleRightOutlined, PlusOutlined, LoadingOutlined, AimOutlined
} from '@ant-design/icons';
import './index.css'
import MapComponent from "../../components/mapContainer";
import errandApi from "../../api/errand";
import moment from "moment/moment";

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
function Errand() {
    const [needTypeValue, setneedTypeValue] = useState('n1');
    const [getTypeValue, setgetTypeValue] = useState(1);
    //antd自带的hook
    const [formRef] = Form.useForm();
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
    const cardHeader = <div className="header">
        <span style={{ fontSize: '18px' }}>发起跑腿</span>
        <div className="more" style={{ float: 'right', fontSize: '14px', fontWeight: 'normal', width: '10%', marginTop: '3px' }}>
            <DoubleRightOutlined style={{ marginRight: "10px", marginTop: 4, overflow: 'hidden' }} />订单中心
        </div>
    </div>;

    const posLabel = <div style={{ display: 'inline-block', marginLeft: '30px' }}>< AimOutlined className="aimPos" />指定地点 </div>

    //----表单控制部分
    const onGetTypeChange = (e) => {
        setgetTypeValue(e.target.value);
    }
    const onNeedTypeChange = (e) => {
        setneedTypeValue(e);
    }
    //表单成功提交
    const onSubmit = () => {
        let form = formRef.getFieldValue();
        let curtime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        errandApi.submitOrder({
            ...form,
            time: curtime
        }).then(res => {
            message.success(res.data.message);
        })
        setTimeout(() => {
            formRef.resetFields();
        }, 200);

    }
    //表单清空
    const resetContent = () => {
        formRef.resetFields();
    }


    return <>
        <Card style={{ width: '80%', height: '90vh', overflow: 'hidden', marginTop: '2%', marginLeft: '12%' }} title={cardHeader}>
            <MapComponent />
            <Form layout="inline" form={formRef} >
                <Form.Item label="需求类型" name="needType"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Select value={needTypeValue}
                        style={{ width: 120 }}
                        options={[
                            { value: 'n1', label: '帮我送' },
                            { value: 'n2', label: '帮我买' },
                            { value: 'n3', label: '帮我排队' },
                            { value: 'n4', label: '全能帮' },
                        ]}
                        onChange={onNeedTypeChange}
                    />
                </Form.Item>
                <Form.Item label="骑手获取方式" name="getType"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Radio.Group value={getTypeValue} style={{ marginBottom: 8 }} onChange={onGetTypeChange}>
                        <Radio.Button value={1}>去指定地点</Radio.Button>
                        <Radio.Button value={2}>就近</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="收货地址" name="desAddr"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="请输入收货人详细地址"></Input>
                </Form.Item>

                <Form.Item label={posLabel} name="targetAddr"
                    rules={[
                        {
                            required: false,
                        },
                    ]}>
                    <Input placeholder="请输入目标的详细地址"></Input>
                </Form.Item>


                <Form.Item label="描述需求" style={{ marginTop: '20px' }} name="needContent"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <TextArea
                        showCount
                        maxLength={300}
                        style={{ width: 500, height: 120, marginRight: 190 }}

                        placeholder="请具体描述需要帮忙的内容,如购买的商品、目的地或者其他要求"
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
                {/* 按钮位置 */}
                <Form.Item className="buttonGroup" >
                    <Button type="default" onClick={resetContent}>清空</Button>
                    <Button type="primary" className="button2" onClick={onSubmit}>提交</Button>
                </Form.Item>
            </Form>
        </Card >
    </>;
}

export default Errand;