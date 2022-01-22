import React, {Component} from 'react';
import classNames from './ItemSelect.module.css'
import {Button, Input, message, Modal, Table} from "antd";
import app from "./global/app";
import ItemInfo from "./ItemInfo";

const {Search} = Input;
class ItemSelect extends Component {
  searchRef;
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
  }
  componentDidMount() {
    if (this.searchRef && this.searchRef.current) {
      this.searchRef.current.focus();
    }
  }

  columns=[
    {
      title:'商品名称',
      dataIndex:'Name',
      key:'Name',
    },
    {
      title:'编码',
      dataIndex: 'ShortName',
      key:'ShortName',
    },
    {
      title:'价格',
      dataIndex: 'Price',
    },
    {
      title:'成本',
      dataIndex: 'CostPrice'
    },
    {
      title:'操作',
      render:(a,b)=>{
        return <div className={classNames.buttonsLine}>
          <Button type={'ghost'}
                  onClick={()=>{
                    this.onClickEditOrCreateItem('edit',b);
                  }}
          >编辑</Button>
          <Button type={'primary'}
                  onClick={()=>
                  {
                    this.onClickSelectThisItemAndReturn(b);
                  }}
          >选择此商品</Button>
        </div>
      }
    }
  ]
  state={
    searched:false,
    items:[],
  }
  lastSearchValue = null;
  onSearchBtnClicked(value)
  {
    this.lastSearchValue = value;
    let that = this;
    app.request(
      {
        api:'qp.api.items.get',
        params:
          {
            tag:value,
            fields:'*',
          },
        success:
          (res)=>
          {
            if (res.IsError)
            {
              message.error(res.ErrMsg);
            }
            else if (res.Items&& res.Items.length>=0)
            {
              that.setState({items:res.Items,searched:true});
              if(res.Items.length===0)
              {
                message.warn('未找到商品信息');
              }
            }
            else
            {
              message.warn('未找到商品信息');
            }
          }
      }
    )
  }

  onCreateItem(props,md)
  {
    let that = this;
    // console.log(props);
    app.request(
      {
        api:'qp.api.item.add',
        params:
          {
            ...props,
          },
        success:(rsp)=>
        {
          if (rsp.IsError)
          {
            message.error(rsp.ErrMsg);
          }
          else
          {
            message.success('商品添加成功');
            md.destroy();
            that.onSearchBtnClicked(that.lastSearchValue)
          }
        }
      }
    )
  }
  onUpdateItem(item,md)
  {
    let that = this;
    app.request(
      {
        api:'qp.api.item.update',
        params:
          {
            ...item,
          },
        success:(rsp)=>
        {
          if (rsp.IsError)
          {
            message.error(rsp.ErrMsg);
          }
          else
          {
            message.success('商品修改成功');
            md.destroy();
            that.onSearchBtnClicked(that.lastSearchValue)
          }
        }
      }
    )
  }
  onDeleteItem(id,md)
  {
    let that = this;
    app.request(
      {
        api:'qp.api.item.delete',
        params:
          {
            itemId:id,
          },
        success:(rsp)=>
        {
          if (rsp.IsError)
          {
            message.error(rsp.ErrMsg);
          }
          else
          {
            message.success('商品删除完成');
            md.destroy();
            that.onSearchBtnClicked(that.lastSearchValue)
          }
        }
      }
    )
  }
  onClickEditOrCreateItem(mode,item) {
    let md = Modal.info(
      {
        centered: true,
        okButtonProps: {hidden: true},
        width: 1000,
        title: mode === 'create' ? '新建产品' : '编辑商品',
        content: <ItemInfo
          item={item}
          mode={mode}
          onSubmit={(item) => {
            if (mode === 'create')
              this.onCreateItem(item, md);
            else {
              this.onUpdateItem(item, md);
            }
          }}
          onCancel={() => {
            md.destroy()
          }}
          onDelete={(id)=>{
            this.onDeleteItem(id,md);
          }}
        />
      }
    )

  }
  //当点击选择此商品按钮后,携带此商品返回上一页
  onClickSelectThisItemAndReturn(item)
  {
    if (this.props.onSelected)
    {
      this.props.onSelected(item);
    }
  }
  render() {
    let searched = this.state.searched;
    let items = this.state.items;
    let hasItems = false;
    let onClickEditOrCreateItem = this.onClickEditOrCreateItem.bind(this);
    if (this.state.items&&this.state.items.length>0)
    {
      hasItems = true;
    }
    let onSearchBtnClicked = this.onSearchBtnClicked.bind(this);
    return (
      <div className={classNames.main}>
        <Search ref={this.searchRef} placeholder={'请输入后按搜索按钮或敲回车键...'} size={'large'} style={{width:'50%'}}
                onSearch={onSearchBtnClicked}
        />
        {searched&&hasItems&&<Table columns={this.columns} style={{width:'100%'}}
                                    dataSource={items}
        ></Table>}
        {searched&&<Button style={{marginTop:20}}
                           onClick={()=>{
                             onClickEditOrCreateItem('create')
                           }}
        >新增商品信息</Button>}
        {/*<Button>确认</Button>*/}
      </div>
    );
  }
}

export default ItemSelect;
