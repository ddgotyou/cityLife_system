import React, { useState } from "react";
import { Card, Form, Select, Input, Radio, Upload, message, Button } from "antd";
import {
    DoubleRightOutlined, PlusOutlined, LoadingOutlined, AimOutlined
} from '@ant-design/icons';
import './index.css'
import MapComponent from "../../components/mapContainer";

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
            <DoubleRightOutlined style={{ marginRight: "10px", marginTop: '1px', overflow: 'hidden' }} />订单中心
        </div>
    </div>;
    return <>
        <Card style={{ width: '80%', marginTop: '2%', marginLeft: '12%' }} title={cardHeader}>
            <MapComponent />
            <Form className="config">
                <Form layout="inline">
                    <Form.Item label="需求类型" >
                        <Select defaultValue="n1"
                            style={{ width: 120 }}
                            options={[
                                { value: 'n1', label: '帮我送' },
                                { value: 'n2', label: '帮我买' },
                                { value: 'n3', label: '帮我排队' },
                                { value: 'n3', label: '全能帮' },
                            ]} />
                    </Form.Item>
                    <Form.Item label="骑手获取方式" >
                        <Radio.Group value="des" style={{ marginBottom: 8 }}>
                            <Radio.Button value="des">去指定地点</Radio.Button>
                            <Radio.Button value="near">就近</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="收获地址">
                        <Input placeholder="请输入详细地址"></Input>
                    </Form.Item>
                    <Form.Item>< AimOutlined /></Form.Item>
                    <Form.Item label="目标地点" >
                        <Input placeholder="请输入详细地址"></Input>
                    </Form.Item>
                </Form>
                <Form layout="inline" className="detail">
                    <Form.Item label="描述需求" >
                        <TextArea
                            showCount
                            maxLength={300}
                            style={{ width: 500, height: 120, marginRight: 190 }}

                            placeholder="请具体描述需要帮忙的内容,如购买的商品、目的地或者其他要求"
                        />
                    </Form.Item>
                    <Form.Item label="图片描述" >
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
            </Form>
            {/* 按钮位置 */}
            <div className="buttonGroup">
                <Button type="default">重置</Button>
                <Button type="primary" className="button2">提交</Button>
            </div>
        </Card>
    </>;
}

export default Errand;