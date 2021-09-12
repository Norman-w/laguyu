import React, {Component} from 'react';
import classNames from './Exporter.module.css'
class Exporter extends Component {
  state= {
      templates:
          [
              {
                  id: 'xiaoyuan',
                  name: '小圆',
              },
              {
                  id: 'anmusi',
                  name: '安慕斯',
              },
              {
                  id: 'chuchu',
                  name: 'chuchu',
              },
              {
                  id: 'beeshum',
                  name: 'beeshum',
              },
              {
                  id: 'haiguibaba',
                  name: '海龟爸爸',
              },
              {
                  id: 'yiwei',
                  name: '伊威',
              },
              {
                  id: 'aoluoli',
                  name: '澳洛丽',
              },
              {
                  id: 'gaolibaobei',
                  name: '高丽宝贝',
              },
              {
                  id: 'xingsha',
                  name: '星鲨',
              },
              {
                  id: 'spb',
                  name: 'spb',
              },
              {
                  id: 'aole',
                  name: '澳乐',
              },
              {
                  id: 'shanmoshi',
                  name: '膳魔师',
              },
              {
                  id: 'bailesi',
                  name: '百乐思',
              },
              {
                  id: 'topstar',
                  name: 'topstar',
              },
              {
                  id: 'holoholo',
                  name: 'holoholo',
              },
              {
                  id: 'inbebe',
                  name: 'inbebe',
              },
              {
                  id: 'dishini',
                  name: '迪士尼',
              },
              {
                  id: 'bokefu',
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
