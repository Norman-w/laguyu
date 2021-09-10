import React, {Component} from 'react';
import {Table, Input, Radio, message} from 'antd';
import classNames from './Searcher.module.css'
import app from "./global/app";

const { Search } = Input;

const columns = [
  // {
  //   dataIndex: 'id',
  //   key: 'id',
  //   render: text => null,
  // },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width:80,
    // render: text => <div>{text}</div>,
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
    width: 120
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province',
    width:100,
  },
  {
    title: '城市',
    key: 'city',
    dataIndex: 'city',
    width:80,
  },
  {
    title: '区县',
    dataIndex: 'area',
    key: 'area',
    width:80,
  },
  {
    title: '详细地址',
    key: 'address',
    dataIndex: 'address',
    width: 200,
  },
  {
    title: '商品信息',
    key: 'items',
    dataIndex: 'items',
  },
  {
    title: '录入时间',
    key: 'createTime',
    dataIndex: 'createTime',
    width: 150,
  },
  {
    title: '导出时间',
    key: 'exportTime',
    dataIndex: 'exportTime',
    width: 150,
  },
];

class Searcher extends Component {
state=
    {
      selectedRowKeys:[],
      data:[],
      searchingName:'',
      searchingMobile:'',
      searchingStatus:'',//就是搜索salebill的status  如果指定了 WAIT_SELLER_SEND_GOODS 或者 WAIT_SELLER_CONFIRM_GOODS 或者是不指定 不指定就是搜全部了
      loading:false,
    }
    constructor(props) {
      super(props);
    }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    if (this.props.onSelectChange)
    {
      this.props.onSelectChange(selectedRowKeys);
    }
  };

componentDidMount() {
  this.onSearchSalebill();
}

  onSearchSalebill()
  {
    this.setState({loading:true})
    let searchParam = {
      fields:'salebillid,details,receiver_name,receiver_mobile,receiver_state,receiver_city,receiver_area,receiver_address,sellermemo,createtime,modifiedtime'
    }
    if (this.state.searchingName)
    {
      searchParam.ReceiverName = this.state.searchingName;
    }
    if(this.state.searchingMobile)
    {
      searchParam.ReceiverMobile = this.state.searchingMobile;
    }
    if (this.state.searchingStatus)
    {
      if (this.state.searchingStatus === 'ALL')
      {
        searchParam.Status = '';
      }
      else {
        searchParam.Status = this.state.searchingStatus;
      }
    }
    let keys = Object.keys(searchParam);
    if (!keys || keys.length<1)
    {
      message.warn('请输入要查询的内容');
      return;
    }
    let that =this;
    app.request(
      {
        api:'qp.api.salebills.get',
        params:searchParam,
        success:(res)=>
        {
          that.setState({loading:false})
          console.log('获取到的数据是:',res);
          let newDatas = [];
          for (let i = 0; i < res.SaleBills.length; i++) {
            let current = res.SaleBills[i];
            let row = {
                key: current.SaleBillId,
                name: current.Receiver_Name,
                mobile:current.Receiver_Mobile,
                province:current.Receiver_State,
                city:current.Receiver_City,
                area:current.Receiver_Area,
                address:current.Receiver_Address,
                items:current.SellerMemo,
                createTime: current.CreateTime,
                exportTime: current.ModifiedTime === current.CreateTime? '': current.ModifiedTime,
              };
            newDatas.push(row);
          }
          console.log(
            '新的组合好后的要展示的数据:', newDatas
          )
          that.setState({data:newDatas});
        },
        failProcFunc:()=>
        {
          that.setState({loading:false})
        }
      }
    )
  }
  onSearchingStatusChange(e)
  {
    let v = e.target.value;
    //WAIT_SELLER_SEND_GOODS
    //WAIT_BUYER_CONFIRM_GOODS
    //ALL
    this.setState({searchingStatus:v},
      ()=>
      {
        this.onSearchSalebill();
      }
    );

  }

  render() {
    let selectedRowKeys = this.state.selectedRowKeys;
    let onSearchSalebill= this.onSearchSalebill.bind(this);
    let onSearchingStatusChange = this.onSearchingStatusChange.bind(this);
    let data = this.state.data;
    let loading = this.state.loading;
    console.log('渲染时候的data:',data);
    const rowSelection = {selectedRowKeys, onChange:this.onSelectChange.bind(this)};
    let table = <Table columns={columns}
                       rowSelection={rowSelection}
                       dataSource={data}
                       className={classNames.table}
                       loading={loading}
    >
    </Table>
    return (
        <div className={classNames.main}>
          <div className={classNames.searchLine}>
            <div className={classNames.nameArea}>
              <div className={classNames.nameLabel}>姓名:</div>
              <Search
                  placeholder="姓名"
                  enterButton
                  value={this.state.searchingName}
                  onSearch={onSearchSalebill}
                  onChange={(v)=>{this.setState({searchingName:v.target.value})}}
              />
            </div>
            <div className={classNames.mobileArea}>
              <div className={classNames.mobileLabel}>手机:</div>
              <Search placeholder="手机号" enterButton
                      value={this.state.searchingMobile}
                      onSearch={onSearchSalebill}
                      onChange={(v)=>{this.setState({searchingMobile:v.target.value})}}
              />
            </div>
            <div className={classNames.statusArea}>
              <Radio.Group defaultValue="WAIT_SELLER_SEND_GOODS" buttonStyle="solid" onChange={onSearchingStatusChange}>
                <Radio.Button value="WAIT_SELLER_SEND_GOODS">未导出</Radio.Button>
                <Radio.Button value="WAIT_BUYER_CONFIRM_GOODS">已导出</Radio.Button>
                <Radio.Button value="ALL">全部</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          {table}
        </div>

    );
  }
}

export default Searcher;
