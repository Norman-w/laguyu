import React, {Component} from 'react';
import { Table, Tag, Space } from 'antd';

import './App.css'
import 'antd/dist/antd.css'
import Creator from "./Creator";
import Exporter from "./Exporter";
import Searcher from "./Searcher";




const pages=
  {
    create:null,
    search:null,
    export:null,
  }

class App extends Component {
  constructor() {
    super();
    pages.search=<Searcher data={this.state.data}/>

    pages.create=<Creator/>

    pages.export=<Exporter/>
  }
  state=
    {
      columns:[
        {
          id:'name',
          name:'姓名',
        },
        {
          id:'mobile',
          name:'电话',
        },
        {
          id:'province',
          name:'省份',
        },
        {
          id:'city',
          name:'城市',
        },
        {
          id:'area',
          name:'区县',
        },
        {
          id:'address',
          name:'详细地址',
        },
        {
          id:'items',
          name:'商品信息',
        },
        {
          id:'createTime',
          name:'录入时间',
        },
        {
          id:'exportTime',
          name:'导出时间',
        },
      ],
      data:
        [
          {
            key: '1',
            name: '王先生',
            mobile:'13333332222',
            province:'河北省',
            city:'秦皇岛市',
            area:'海港区',
            address:'恩妮电子商务',
            items: 'A款商品10个,B款商品20个,C款商品1个,赠送D1个',
            createTime: '2021年09月11日21:11:11',
            exportTime: '2021年09月11日21:22:33'
          },
        ],
      //当前在展示哪一页
      currentPage:'create'
    }
  onClickCreateBtn()
  {
    this.setState({currentPage:'create'})
  }
  onClickSearchBtn()
  {
    this.setState({currentPage:'search'})
  }
  onClickExportBtn()
  {
    this.setState({currentPage:'export'})
  }
  render() {
    let currentPage = pages[this.state.currentPage];
    let onClickCreateBtn = this.onClickCreateBtn.bind(this);
    let onClickSearchBtn = this.onClickSearchBtn.bind(this);
    let onClickExportBtn = this.onClickExportBtn.bind(this);
    return (
      <div className={'main'}>
        <div id={'按钮行'} className={'buttonLine'}>
          <div className={'btn'} onClick={onClickCreateBtn}>新增</div>
          <div className={'btn'} onClick={onClickSearchBtn}>查询</div>
          <div className={'btn'} onClick={onClickExportBtn}>导出</div>
        </div>
        {currentPage}
      </div>
    );
  }
}

export default App;
