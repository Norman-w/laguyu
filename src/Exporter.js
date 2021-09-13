import React, {Component} from 'react';
import classNames from './Exporter.module.css'
class Exporter extends Component {
  state= {
      templates:
          [
              {
                  id: 'laguyu.xiaoyuan',
                  name: '小圆',
              },
              {
                  id: 'laguyu.anmusi',
                  name: '安慕斯',
              },
              {
                  id: 'laguyu.chuchu',
                  name: 'chuchu',
              },
              {
                  id: 'laguyu.beeshum',
                  name: 'beeshum',
              },
              {
                  id: 'laguyu.haiguibaba',
                  name: '海龟爸爸',
              },
              {
                  id: 'laguyu.yiwei',
                  name: '伊威',
              },
              {
                  id: 'laguyu.aoluoli',
                  name: '澳洛丽',
              },
              {
                  id: 'laguyu.gaolibaobei',
                  name: '高丽宝贝',
              },
              {
                  id: 'laguyu.xingsha',
                  name: '星鲨',
              },
              {
                  id: 'laguyu.spb',
                  name: 'spb',
              },
              {
                  id: 'laguyu.aole',
                  name: '澳乐',
              },
              {
                  id: 'laguyu.shanmoshi',
                  name: '膳魔师',
              },
              {
                  id: 'laguyu.bailesi',
                  name: '百乐思',
              },
              {
                  id: 'laguyu.topstar',
                  name: 'topstar',
              },
              {
                  id: 'laguyu.holoholo',
                  name: 'holoholo',
              },
              {
                  id: 'laguyu.inbebe',
                  name: 'inbebe',
              },
              {
                  id: 'laguyu.dishini',
                  name: '迪士尼',
              },
              {
                  id: 'laguyu.bokefu',
                  name: '伯可福',
              },
          ],
      hoverIndex: -1,
  }
    onClickTemplate(temp,index)
    {
        if (this.props.onClickTemplate)
        {
            this.props.onClickTemplate(temp);
        }
    }
  render()
  {
      let temps = this.state.templates;
      let hoverIndex = this.state.hoverIndex;
      let onClickTemplate= this.onClickTemplate.bind(this);
      let getTempNode = function (item,index)
      {
          let c= classNames.template;
          if (hoverIndex === index)
          {
              c = classNames.templateHover;
          }
          return <div className={c}
                      onMouseEnter={()=>{this.setState({hoverIndex: index})}}
                      onMouseLeave={()=>{this.setState({hoverIndex: -1})}}
                      onClick={()=>{onClickTemplate(item,index)}}
          >
              {item.name}
          </div>
      }
      return <div className={classNames.main}>
          {temps.map(getTempNode.bind(this))}
      </div>
  }
}

export default Exporter;
