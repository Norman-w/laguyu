import React, {Component} from 'react';
import {Table} from 'antd';
import classNames from './Searcher.module.css'


const columns = [
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

  render() {
    return (
      <Table columns={columns}
             dataSource={this.props.data}
             className={classNames.main}
      >
      </Table>
    );
  }
}

export default Searcher;
