import React, {Component} from 'react';
import {Table,Input,Radio} from 'antd';
import classNames from './Searcher.module.css'

const { Search } = Input;

const columns = [
  {
    dataIndex: 'id',
    key: 'id',
    render: text => null,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    // render: text => <div>{text}</div>,
  },
  {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province',
  },
  {
    title: '城市',
    key: 'city',
    dataIndex: 'city',
  },
  {
    title: '区县',
    dataIndex: 'area',
    key: 'area',
  },
  {
    title: '详细地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '商品信息',
    key: 'items',
    dataIndex: 'items'
  },
  {
    title: '录入时间',
    key: 'createTime',
    dataIndex: 'createTime'
  },
  {
    title: '导出时间',
    key: 'exportTime',
    dataIndex: 'exportTime'
  },
];


class Searcher extends Component {
state=
    {
      selectedRowKeys:[],
      data:[],
    }
    constructor(props) {
      super(props);
      this.state.data = this.props.data;
    }
    // componentWillReceiveProps(nextProps, nextContext) {
    //   console.log('接受新参数', nextProps)
    //   if (nextProps.data && this.state.data !== nextProps.data) {
    //     this.setState({data: nextProps.data});
    //   }
    // }
  componentDidMount() {
  console.log('搜索控件加载');
  // this.props.onRef(this);
  this.onReset();
  }

  onReset()
    {
      this.setState({data:[]});
    }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
    if (this.props.onSelectChange)
    {
      this.props.onSelectChange(selectedRowKeys);
    }
  };

  render() {
    let selectedRowKeys = this.state.selectedRowKeys;
    let data = this.state.data;
    const rowSelection = {selectedRowKeys, onChange:this.onSelectChange};
    return (
        <div className={classNames.main}>
          <div className={classNames.searchLine}>
            <div className={classNames.nameArea}>
              <div className={classNames.nameLabel}>姓名:</div>
              <Search
                  placeholder="姓名"
                  enterButton
                  // suffix={suffix}
                  // onSearch={onSearch}
              />
            </div>
            <div className={classNames.mobileArea}>
              <div className={classNames.mobileLabel}>手机:</div>
              <Search placeholder="手机号" enterButton />
            </div>
            <div className={classNames.statusArea}>
              <Radio.Group defaultValue="c" buttonStyle="solid">
                <Radio.Button value="a">未导出</Radio.Button>
                <Radio.Button value="b">已导出</Radio.Button>
                <Radio.Button value="c">全部</Radio.Button>
              </Radio.Group>
            </div>
          </div>
          <Table columns={columns}
                 rowSelection={rowSelection}
                 dataSource={data}
                 className={classNames.table}
          >
          </Table>
        </div>

    );
  }
}

export default Searcher;
