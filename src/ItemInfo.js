import React, { Component } from 'react';
import {Button,Input} from "antd";

import classNames from './ItemInfo.module.css'

const emptyItem =
  {
    ItemId:0,
    // Barcode : undefined,
    Name: undefined,
    ShortName:undefined,
    Price:0,
    CostPrice:0,
  }
class ItemInfo extends Component {
  state={
    ...emptyItem,
    mode:'create',//edit
  }
  componentDidMount() {
    // console.log('组件已经加载,参数是;', this.props)
    if (this.props.item)
    {
      let newState ={
        ...this.props.item,
        mode:this.props.mode,
      }
      this.setState(newState);
    }
    else
    {
      let newState = {
        ...emptyItem,
        mode:this.props.mode
      }
      this.setState(newState);
    }
  }
//获取警告信息文本
  getWarningLabel(data,name,unit, min,max) {
// console.log('输入的data为:',data);
    let longWarning = null;

    if (data !== undefined) {
      if (data) {
        let float = parseFloat(data);
        if (isNaN(float)) {
          longWarning = '无效的' + name + '信息';
        } else if (float > 1000000 || float < 0) {
          longWarning = '有效值为' + min + '~' + max;
// '无效的长度信息,应当介于' + min + unit + '到' + max + unit + '之间';
        }
      } else {
        longWarning = '请输入有效的' + name;
      }
    } else {
    }

    return longWarning;
  }
  render() {
    let createMode = this.state.mode ==='create';
//region 商品全称的提示
    let fullNameWarning = null;
    if (this.state.Name !== undefined)
    {
      if (!this.state.Name) {
        fullNameWarning = '请输入有效的商品全称';
      }
      else
      {
        let length = this.state.Name.length;
         if (length<5) {
           fullNameWarning = '商品的全称太短';
        }
         else if(length>100)
         {
           fullNameWarning = '商品的名称太太太太太太太太太长';
         }
      }
    }
//endregion
    let codeWarning = null
    if (this.state.ShortName !== undefined)
    {
      if (!this.state.ShortName) {
        codeWarning = '请输入简称(商家编码)';
      }
      else
      {
        let len = this.state.ShortName.length;
        if (len<3)
        {
          codeWarning = '商品简称太短';
        }
        else if(len>100)
        {
          codeWarning = '商品的简称太太太太太太太太长';
        }
      }
    }
//region 名称提示
    let nameWarning = null;
    if(this.state.Name !== undefined)
    {
      if (!this.state.Name)
      {
        nameWarning = '请输入正确的药品名称';
      }
      else if(this.state.Name.length<2)
      {
        nameWarning = '药品名称太短';
      }
    }
//endregion
//region 长度宽度高度警告信息
    let costPriceWarning = this.getWarningLabel(this.state.CostPrice, '成本价','元', 0,1000000);
    let priceWarning = this.getWarningLabel(this.state.Price, '售价','元', 0,1000000);
//endregion

//region 是否可以提交修改或者新增
    let canSubmit = true;
    if (nameWarning || fullNameWarning || costPriceWarning || priceWarning)
    {
      canSubmit = false;
    }
//endregion
    return <div id={'main'} className={classNames.main}>
      <div id={'商品全称行'} className={classNames.infoLine}>
        <div id={'全称和星号'} className={classNames.titleLine}><div style={{color:'red'}}>*</div>商品全称(可包含厂商,渠道,名称,规格,SKU等信息)可用于搜索</div>
        <Input id={'全称输入框'} placeholder={'请输入商品全称'} value={this.state.Name} onChange={(e) => {
          this.setState({Name: e.target.value})
        }}/>
        <div id={'全称提示'} className={classNames.warningText}>{fullNameWarning}</div>
      </div>
      <div id={'商家编码行'} className={classNames.infoLine}>
        <div id={'商家编码行和星'} className={classNames.titleLine}><div style={{color:'red'}}>*</div>简称(商家编码)</div>
        <Input id={'编码输入框'} placeholder={'请输入商家编码'} value={this.state.ShortName} onChange={(e) => {
          this.setState({ShortName: e.target.value})
        }}/>
        <div id={'商家编码提示'} className={classNames.warningText}>{codeWarning}</div>
      </div>
      <div id={'商品价格行'} className={classNames.sizeLine}>
        <div id={'成本价区域'}>
          <div id={'星号成本价'} className={classNames.titleLine}><div style={{color:'red'}}>*</div>成本价</div>
          <Input id={'成本价输入'} placeholder={''} value={this.state.CostPrice} onChange={(e) => {
            this.setState({CostPrice: e.target.value})
          }}/>
          <div id={'成本价提示'} className={classNames.warningText}>{costPriceWarning}</div>
        </div>
        <div id={'售价区域'}>
          <div id={'售价和星'} className={classNames.titleLine}><div style={{color:'red'}}>*</div>销售价</div>
          <Input id={'售价输入'} placeholder={''} value={this.state.Price} onChange={(e) => {
            this.setState({Price: e.target.value})
          }}/>
          <div id={'售价提示'} className={classNames.warningText}>{priceWarning}</div>
        </div>
      </div>

      <div id={'按钮行'} className={classNames.buttonLine}>
        <Button type={'primary'} disabled={!canSubmit} onClick={()=>{
          if (this.props.onSubmit)
          {
            this.props.onSubmit(this.state);
          }
        }}>{createMode?'确认新增':'保存修改'}</Button>
        {!createMode&&<Button type={'danger'}
                              onClick={
                                ()=>
                                {
                                  if (this.props.onDelete)
                                  {
                                    this.props.onDelete(this.state.ItemId);
                                  }
                                }
                              }
        >删除</Button>}
        <Button type={'ghost'}
                onClick={()=>
                {
                  if (this.props.onCancel)
                  {
                    this.props.onCancel();
                  }
                }}
        >取消</Button>
      </div>
    </div>
  }
}

export default ItemInfo;
