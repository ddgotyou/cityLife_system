import React from "react";
import './index.css'
import Search from '../../components/searchBox'
import '../../static/iconfont/iconfont.css'
import { Card } from "antd";

//推荐数据表
const arr = new Array(7).fill(0);


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

                arr.map((item, index) => {
                    return <><div className={index === arr.length - 1 ? "last" : "sub"}>
                        <img src={require('../../static/images/h1.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">川湘麻辣</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={playHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                arr.map((item, index) => {
                    return <><div className={index === arr.length - 1 ? "last" : "sub"}>
                        <img src={require('../../static/images/h2.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">KTV</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={animalHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                arr.map((item, index) => {
                    return <><div className={index === arr.length - 1 ? "last" : "sub"}>
                        <img src={require('../../static/images/h3.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">狗狗用品</span>
                    </div>

                    </>
                })
            }
        </Card>
        <Card className="homeContent" title={errandHeader} extra={<a className="extra" href="#">More</a>} style={{ ...subCardStyle }}>
            {
                arr.map((item, index) => {
                    return <><div className={index === arr.length - 1 ? "last" : "sub"}>
                        <img src={require('../../static/images/h4.jpg')} style={{ width: '100%' }}></img>
                        <hr />
                        <span className="textDes">帮我买</span>
                    </div>

                    </>
                })
            }
        </Card>
    </>;
}

export default HomeContent;