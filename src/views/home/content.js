import React from "react";
import './index.css'
import '../../static/iconfont/iconfont.css'
import { Card } from "antd";


//大类推荐
const cate1 = [
    '自助餐', '火锅', '面包/饮品', '烧烤烤串', '西餐', '粤菜', '川菜', '酒吧', '鱼鲜', '小吃快餐'
];
const cate2 = [
    'KTV', '酒吧', '洗浴/汗蒸', '按摩/足疗', '剧本杀', '运动健身', '影院', '轰趴馆', '网吧/电竞', 'DIY手工坊'
];
const cate3 = ['狗粮', '猫粮', '宠物零食', '宠物玩具', '宠物保健品', '宠物医药品', '宠物沐浴露', '宠物日用品']
const cate4 = ['帮我送', '帮我买', '帮我排队', '全能帮'];

const subCardStyle = {
    width: '80%',
    border: 'solid 1px #FF8000',
    boxShadow: '1px 1px 2px #FACC2E',
    marginTop: '2%',
    marginLeft: '12%',
}

const foodHeader = <div className="header">
    <span style={{ fontSize: '18px' }}>
        <i className="iconfont" style={{ marginRight: '1%' }}>&#xe654;</i>
        美食
    </span>

</div>

const playHeader = <div className="header">
    <span style={{ fontSize: '18px' }}>
        <i className="iconfont" style={{ marginRight: '1%' }}>&#xe631;</i>休闲娱乐
    </span>

</div>

const animalHeader = <div className="header">
    <span style={{ fontSize: '18px' }}>
        <i className="iconfont" style={{ marginRight: '1%' }}>&#xe641;</i>宠物</span>

</div>

const errandHeader = <div className="header">
    <span style={{ fontSize: '18px' }}>
        <i className="iconfont" style={{ marginRight: '1%' }}>&#xe70e;</i> 跑腿
    </span>
</div>

function HomeContent() {
    return <>
        {/* 推荐 */}
        <Card className="homeContent" title={foodHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {

                cate1.map((item, index) => {
                    return <><div className={index === cate1.length - 1 ? "last" : "sub"} key={String(index)}>
                        <img src={require('../../static/images/h1.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">{item}</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={playHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                cate2.map((item, index) => {
                    return <><div className={index === cate2.length - 1 ? "last" : "sub"} key={String(index)}>
                        <img src={require('../../static/images/h2.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">{item}</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={animalHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                cate3.map((item, index) => {
                    return <><div className={index === cate3.length - 1 ? "last" : "sub"} key={String(index)}>
                        <img src={require('../../static/images/h3.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">{item}</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={errandHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                cate4.map((item, index) => {
                    return <><div className={index === cate4.length - 1 ? "last" : "sub"} key={String(index)}>
                        <img src={require('../../static/images/h4.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">{item}</span>
                    </div>

                    </>
                })
            }
        </Card>
    </>;
}

export default HomeContent;