import React, {Component} from 'react';
import {Table, Tag, Space, Button} from 'antd';

import './App.css'
import 'antd/dist/antd.css'
import Creator from "./Creator";
import Exporter from "./Exporter";
import Searcher from "./Searcher";




const pages=
  {
    create:null,
    search:null,
    exportSelected:null,
  }

class App extends Component {
  constructor() {
    super();
    this.state.data=[];
    pages.search=<Searcher onRef={(ref)=>{this.child = ref}} onSelectChange={this.onSelectChange.bind(this)}/>

    pages.create=<Creator/>

    pages.exportSelected=<Exporter/>

    pages.exportAllUnExport=<Exporter/>
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
      currentPage:'search',
      exportAble:false,
    }
  onClickCreateBtn()
  {
    this.setState({currentPage:'create', exportAble:false})
  }
  onClickSearchBtn()
  {
    if (this.state.currentPage === 'search')
    {
      // this.child.onReset();
    }
    else {
      this.setState({currentPage: 'search', exportAble: false})
    }
  }
  onClickExportAllUnExportBtn()
  {
    this.setState({currentPage:'exportAllUnExport'})
  }
  onClickExportSelectedBtn()
  {
    this.setState({currentPage:'exportSelected'});
  }

  onSelectChange(rows)
  {
    if (rows && rows.length>0)
    {
      this.setState({exportAble:true})
    }
    else
    {
      this.setState({exportAble:false})
    }
  }
  render() {
    let currentPage = pages[this.state.currentPage];
    let currentPageIndex = this.state.currentPage;
    let onClickCreateBtn = this.onClickCreateBtn.bind(this);
    let onClickSearchBtn = this.onClickSearchBtn.bind(this);
    let onClickExportAllUnExportBtn = this.onClickExportAllUnExportBtn.bind(this);
    let onClickExportSelectedBtn = this.onClickExportSelectedBtn.bind(this);
    let exportAble = this.state.exportAble;
    return (
      <div className={'main'}>
        <div id={'按钮行'} className={'buttonLine'}>
          <Button size={'normal'} type={currentPageIndex ==='create' ? 'primary':''} onClick={onClickCreateBtn}>新增</Button>
          <Button size={'normal'} type={currentPageIndex ==='search' ? 'primary':''} onClick={onClickSearchBtn}>查询</Button>
          <div className={'exportBtnLine'}>
            <div className={'b1'}>
              <Button size={'normal'} type={currentPageIndex ==='exportAllUnExport' ? 'primary':''} disabled={!exportAble} onClick={onClickExportAllUnExportBtn}>导出选中项</Button>
            </div>
            <Button size={'normal'} type={currentPageIndex ==='exportSelected' ? 'primary':''} onClick={onClickExportSelectedBtn}>导出全部未导出项</Button>
          </div>
          </div>
        {currentPage}
      </div>
    );
  }
}

export default App;
