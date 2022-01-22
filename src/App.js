import React, {Component} from 'react';
import {Table, Tag, Space, Button, message} from 'antd';
import app from "./global/app";

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

    pages.exportSelected=<Exporter onClickTemplate={this.onClickTemplate.bind(this)}/>

    pages.exportAllUnExport=<Exporter onClickTemplate={this.onClickTemplate.bind(this)}/>
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
        {
          id:'action',
          name:'操作'
        }
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
      willExportTidList:[],
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
      this.setState({exportAble:true,willExportTidList:rows})
    }
    else
    {
      this.setState({exportAble:false,willExportTidList:[]})
    }
  }
  onClickTemplate(selectedTemp)
  {
    console.log('点了模板',selectedTemp);
    console.log('当前页面:', this.state.currentPage);
    this.setState({currentPage:'create', exportAble:false});
    if (this.state.currentPage === 'exportSelected')
    {//如果是选择了只导出部分的话
      let sidStr = '';
      for (let i = 0; i < this.state.willExportTidList.length; i++) {
        let current = this.state.willExportTidList[i];
        if(sidStr.length>0)
        {
          sidStr += ',';
        }
        sidStr += ''+current;
      }
      let that = this;
      app.request(
          {
            api:"qp.api.customization.laguyu.salebills.export2excel",
            params:
                {
                  // ExportAllUnExport
                  templatecode:selectedTemp.id,
                  templatename:selectedTemp.name,
                  salebillidslist:sidStr,
                },
            success:(res)=> {
              console.log('下载成功了',res)
              message.success('操作成功,请查看下载的文件');
              this.setState({willExportTidList:[],exportAble:false});
            },
            errProcFunc:(res)=>
            {
              message.error('操作失败:'+res.ErrMsg);
              console.log('下载失败了',res);
              this.setState({willExportTidList:[],exportAble:false});
            }
          }
      )
    }
    else if(this.state.currentPage === 'exportAllUnExport')
    {
      //选择导出全部未导出项
      app.request(
          {
            api:"qp.api.customization.laguyu.salebills.export2excel",
            params:
                {
                  // ExportAllUnExport
                  templatecode:selectedTemp.id,
                  templatename:selectedTemp.name,
                  ExportAllUnExport:true,
                },
            success:(res)=> {
              console.log('下载成功了',res)
              message.success('操作成功,请查看下载的文件');
            },
            errProcFunc:(res)=>
            {
              message.error('操作失败:'+res.ErrMsg);
              console.log('下载失败了',res)
            }
          }
      )
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
          <Button size={'normal'} type={currentPageIndex ==='create' ? 'primary':''} onClick={onClickCreateBtn}>新增订单</Button>
          <Button size={'normal'} type={currentPageIndex ==='search' ? 'primary':''} onClick={onClickSearchBtn}>订单查询</Button>
          <div className={'exportBtnLine'}>
            <div className={'b1'}>
              <Button size={'normal'} type={currentPageIndex ==='exportSelected' ? 'primary':''} disabled={!exportAble} onClick={onClickExportSelectedBtn}>导出选中项</Button>
            </div>
            <Button size={'normal'} type={currentPageIndex ==='exportAllUnExport' ? 'primary':''} onClick={onClickExportAllUnExportBtn}>导出全部未导出项</Button>
          </div>
          </div>
        {currentPage}
      </div>
    );
  }
}

export default App;
