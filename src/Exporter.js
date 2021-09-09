import React, {Component} from 'react';
import classNames from './Exporter.module.css'
class Exporter extends Component {
  state={
    templates:
        [
          {
            id:'deli',
            name:'得力文具模板',
          },
            {
                id:'deli',
                name:'保温杯模板',
            },
            {
                id:'deli',
                name:'C公司专用模板',
            },
            {
                id:'deli',
                name:'D公司模板',
            },
            {
                id:'deli',
                name:'E公司模板aaa',
            },
        ],
      hoverIndex:-1,
  }
  render()
  {
      let temps = this.state.templates;
      let hoverIndex = this.state.hoverIndex;
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
