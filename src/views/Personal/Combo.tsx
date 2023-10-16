import queren from "./queren.png"
import MySide from "./MySide"
import { Layout } from "antd"

const { Content } = Layout

const Combo = () => {
  return (
    <Layout>
      <MySide></MySide>
      <Content className="my-combo-box">
        <div className="tc-header">
          <a href="#tc-short-video">短视频制作会员</a>
          <a href="#tc-live">直播会员</a>
          <a href="#tc-custom">定制服务</a>
        </div>
        <div id="tc-short-video">
          <div className="sv-item">
            <p className="sv-item-1">免费版</p>
            <p className="sv-item-2">
              ¥<span>0</span>
            </p>
            <button className="sv-item-3">免费使用</button>
            <div className="sv-item-4">
              <p>
                <img src={queren} alt="" />
                <span>合成时长：30S 试用时长</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>页面限制</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>数字人部分免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>声音免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>100+张背景、插图免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>导入 PPT 制作免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>存储空间：1GB</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>视频分辨率：1080P</span>
              </p>
            </div>
          </div>
          <div className="sv-item">
            <p className="sv-item-1">进阶版</p>
            <p className="sv-item-2">
              ¥<span>298</span>/月
            </p>
            <button className="sv-item-3 sv-item-btn">立即购买</button>
            <div className="sv-item-4">
              <p>
                <img src={queren} alt="" />
                <span>合成时长：300S 试用时长</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>页面限制</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>数字人部分免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>声音免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>500+张背景、插图免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>导入 PPT 制作免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>存储空间：10GB</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>视频分辨率：1080P</span>
              </p>
            </div>
          </div>
          <div className="sv-item">
            <p className="sv-item-1">高级版</p>
            <p className="sv-item-2">
              ¥<span>1289</span>/年
            </p>
            <button className="sv-item-3">立即购买</button>
            <div className="sv-item-4">
              <p>
                <img src={queren} alt="" />
                <span>合成时长：3000S 时长</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>页面限制</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>数字人部分免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>声音免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>1000+张背景、插图免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>导入 PPT 制作免费</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>存储空间：20GB</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>视频分辨率：1080P</span>
              </p>
            </div>
          </div>
        </div>

        <div id="tc-live">
          <div className="tc-item tc-item-blue">
            <div className="tc-item-header">2.5D无人AI直播</div>
            <div className="tc-item-content">
              <div className="tcc-item tc-no-border">
                <p className="tcc-item-1">
                  ¥<span>4999</span>/月
                </p>
                <button className="tcc-item-2">立即购买</button>
                <div className="tcc-item-3">
                  <p>
                    <img src={queren} alt="" />
                    <span>合成时长：30S 试用时长</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>页面限制</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>数字人部分免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>声音免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>100+张背景、插图免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>导入 PPT 制作免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>存储空间：1GB</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>视频分辨率：1080P</span>
                  </p>
                </div>
              </div>
              <div className="tcc-item">
                <p className="tcc-item-1">
                  ¥<span>48999</span>/年
                </p>
                <button className="tcc-item-2 tc-item-btn">立即购买</button>
                <div className="tcc-item-3">
                  <p>
                    <img src={queren} alt="" />
                    <span>合成时长：30S 试用时长</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>页面限制</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>数字人部分免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>声音免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>100+张背景、插图免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>导入 PPT 制作免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>存储空间：1GB</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>视频分辨率：1080P</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="tc-item">
            <div className="tc-item-header">3D真人驱动直播</div>
            <div className="tc-item-content">
              <div className="tcc-item tc-no-border">
                <p className="tcc-item-1">
                  ¥<span>999</span>/年
                </p>
                <button className="tcc-item-2">立即购买</button>
                <div className="tcc-item-3">
                  <p>
                    <img src={queren} alt="" />
                    <span>合成时长：30S 试用时长</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>页面限制</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>数字人部分免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>声音免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>100+张背景、插图免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>导入 PPT 制作免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>存储空间：1GB</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>视频分辨率：1080P</span>
                  </p>
                </div>
              </div>
              <div className="tcc-item">
                <p className="tcc-item-1">
                  ¥<span>9999</span>/年
                </p>
                <button className="tcc-item-2 tc-item-btn">立即购买</button>
                <div className="tcc-item-3">
                  <p>
                    <img src={queren} alt="" />
                    <span>合成时长：30S 试用时长</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>页面限制</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>数字人部分免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>声音免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>500+张背景、插图免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>导入 PPT 制作免费</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>存储空间：1GB</span>
                  </p>
                  <p>
                    <img src={queren} alt="" />
                    <span>视频分辨率：1080P</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tc-custom">
          <p className="tcm-title">形象克隆定制</p>
          <div className="tcc-content">
          <div className="tcm-item">
            <p className="tcm-item-1">个人版</p>
            <p className="tcm-item-2">
              ¥<span>9999</span>/年
            </p>
            <button className="tcm-item-3 tcm-item-btn">立即咨询</button>
            <div className="tcm-item-4">
              <p>
                <img src={queren} alt="" />
                <span>需要提供 5 分钟有效素材</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>不提供拍摄服务</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>根据用户提供的素材，进行数字人模型训练</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>交付形象克隆一个</span>
              </p>
            </div>
          </div>
          <div className="tcm-item" id="tc-item-blue">
            <p className="tcm-item-1">企业版</p>
            <p className="tcm-item-2">
              ¥<span>50000</span>/年
            </p>
            <button className="tcm-item-3 tcm-item-btn">立即咨询</button>
            <div className="tcm-item-4">
              <p>
                <img src={queren} alt="" />
                <span>需要提供 30 分钟有效素材</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>就近提供专业的拍摄服务，包括场地、拍摄、服装、妆容</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>专业上门（或远程）拍摄指导</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>视频专业剪辑及优化</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>数字人模型训练及优化</span>
              </p>
              <p>
                <img src={queren} alt="" />
                <span>交付形象克隆一个</span>
              </p>
            </div>
          </div>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

export default Combo
