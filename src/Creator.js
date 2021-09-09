import React from 'react';
import {Cascader, message, Row, Col, Button, Space, Checkbox, Modal} from 'antd';
import { Input } from 'antd';
import app from "./global/app";
import styles from './Creator.module.css'
import InputModal from "./InputModal";



const clipboardy =require('clipboardy');

const { TextArea } = Input;



class Creator extends React.Component
{
  state={
    showingFullAddressInputModal:false,
    inputtingValues:
        {
          province:'',
          city:'',
          area:'',
          name:'',
          mobile:'',
          address:'',
          memo:'',
          asDefault:true,
        },
    pickerValue:[],
    waitParseString:null,
  }
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps, nextContext) {

  }


  onAreaPickerChange(value) {
    console.log(value);
    if (value && value.length > 0) {
      this.state.inputtingValues.province = value[0];
    } else {
      this.state.inputtingValues.province = '';
    }
    if (value && value.length > 1) {
      this.state.inputtingValues.city = value[1];
    } else {
      this.state.inputtingValues.city = '';
    }
    if (value && value.length > 2) {
      this.state.inputtingValues.area = value[2];
    } else {
      this.state.inputtingValues.area = '';
    }
    this.setState({pickerValue:value});
  }
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getYear()+1900 + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
  }
  getGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4()+S4()+S4()+S4()+S4()+S4()+S4()+S4());
  }
  addSeller() {
    //region 地址校验
    console.log(this.state.inputtingValues);

    if ((''+this.state.inputtingValues.province + this.state.inputtingValues.city + this.state.inputtingValues.area).length<1)
    {
      message.warn('请选择有效的省市区');
      return;
    }
    if(!this.state.inputtingValues.name || this.state.inputtingValues.name.length<1)
    {message.warn('请输入正确的发货人');return;}
    if (!this.state.inputtingValues.address || this.state.inputtingValues.address.length<2)
    {
      message.warn('请输入有效的发货地址');
      return;
    }
    if (!this.state.inputtingValues.mobile || this.state.inputtingValues.mobile.length<11)
    {
      message.warn('请输入有效的发货人手机号');
      return;
    }
    let mobile = parseInt(this.state.inputtingValues.mobile);
    if (!mobile)
    {
      message.warn('请输入有效的发货人手机号');
      return;
    }
    let c1 = this.state.inputtingValues.mobile[0];
    let c2 = this.state.inputtingValues.mobile[1];
    if(parseInt(c1)!==1 || parseInt(c2)<3)
    {
      message.warn('请输入有效的发货人手机号');
      return;
    }
    if (!this.state.inputtingValues.memo)
    {
      message.warn('请输入商品信息');
      return;
    }
    //endregion
    //region 包裹信息创建
    let createTime = this.getNowFormatDate();
    console.log('时间:',createTime);
    let tid = this.getGuid();
    let bill = {
      Receiver_Name:this.state.inputtingValues.name,
      Receiver_Area:this.state.inputtingValues.area,
      Receiver_State:this.state.inputtingValues.province,
      Receiver_City:this.state.inputtingValues.city,
      Receiver_Address:this.state.inputtingValues.address,
      Receiver_Mobile:this.state.inputtingValues.mobile,
      // TotalCount:1,
      CreateTime:createTime,
      ModifiedTime:createTime,
      // EntriesCount:0,
      DeliveryWay:'送货',
      SellerMemo:this.state.inputtingValues.memo,
      Status:'WAIT_SELLER_CONFIRM_GOODS',
      Balance:true,
      Details:[],
    };
    //endregion
    let that = this;
    app.request(
        {
          api:'qp.api.salebill.add',
          params:
              {
                SalebillJson:JSON.stringify(bill),
              },
          success:
              (res)=>
              {
                console.log(res);
                let success = false;
                if(res.SalebillId)
                {
                  success = true;
                  message.success('录入成功,编号:'+res.SalebillId);
                }
                else
                {
                  success = false;
                  message.error('啊哦,创建包裹失败了哦~!');
                }
                if(that.props.onFinish)
                {
                  that.props.onFinish(success,res.SalebillId);
                }
              }
        }
    )
  }
  onNameChange(e)
  {
    this.state.inputtingValues.name=e.target.value;
    this.setState({inputtingValues:this.state.inputtingValues})
  }
  onMobileChange(e)
  {
    this.state.inputtingValues.mobile=e.target.value;
    this.setState({inputtingValues:this.state.inputtingValues})

  }
  onAddressChange(e)
  {
    this.state.waitParseString=e.target.value;
    this.setState({waitParseString:this.state.waitParseString})
  }
  onMemoChange(e)
  {
    this.state.inputtingValues.memo=e.target.value;
    this.setState({inputtingValues:this.state.inputtingValues})
  }
  async onClickParseAddressBtn(waitParseAddress)
  {
    this.setState({waitParseString:waitParseAddress});
    let parseAddressRet = await this.asyncParseAddress(waitParseAddress);
    // console.log('函数结束了',parseAddressRet);
    if (parseAddressRet)
    {
      this.setState({inputtingValues:parseAddressRet,
        pickerValue:[parseAddressRet.province,parseAddressRet.city,parseAddressRet.area],
        showingFullAddressInputModal:false})
    }
  }
  asyncParseAddress(waitParseAddress)
  {
    return new Promise(
        (suc,fail)=>
        {
          // let that = this;
          app.request(
              {
                api: 'qp.api.address.distinguishaddressstr',
                params:
                    {
                      inputString: encodeURIComponent(waitParseAddress),
                    },
                success: (res)=> {
                  console.log('请求有返回了',res);
                  if(res.Province)
                  {
                    if (res.Province || res.Name || res.Mobile) {
                      // console.log('解析地址成功', res.Result.data)
                      message.success('解析完成!')
                      let newData = {
                        province:res.Province,
                        city:res.City,
                        area: res.Area,
                        address:res.Address,
                        name:res.Name,
                        mobile:res.Mobile,
                        memo:res.OtherStr,
                      }
                      // that.setState({inputtingValues:newData});
                      suc(newData);
                    }
                    else
                    {
                      //函数调用成功但是解析地址不成功
                      message.warn('未能解析该地址信息');
                      // fail(res)
                    }
                  }
                  else
                  {
                    //函数调用不成功
                    message.error('调用接口失败!');
                    // fail(res)
                  }
                }
              }
          )
        }
    )
  }
  onClickShowParseModalBtn(e)
  {
    this.setState({showingFullAddressInputModal:true})
  }
  async onClickParseBtn(waitParseAddress)
  {
    await this.onClickParseAddressBtn(this.state.waitParseString);
  }
  async onClickPasteAddressQuickFillBtn()
  {
    let data = await this.asyncReadClipBoard();
    console.log(data);
    await this.onClickParseAddressBtn(data);
  }
  asyncReadClipBoard()
  {
    return clipboardy.read();
  }
  render() {
    let pickerData = app.globalData.addressPickerData;
    let onClickSubmitBtn = this.addSeller.bind(this);
    let mustSetAsDefault = this.props.isTheSellerFirstSender;
    let onClickShowParseModalBtn = this.onClickShowParseModalBtn.bind(this);
    let onClickParseBtn = this.onClickParseBtn.bind(this);
    let parseAddressModal  = null;
    if (this.state.showingFullAddressInputModal)
    {
      parseAddressModal = <InputModal onConfirm={this.onClickParseAddressBtn.bind(this)}
                                      onCancel={()=>{this.setState({showingFullAddressInputModal:false})}}
      />
    }
    return <div className={styles.main}><Space size={8} direction='vertical' className={styles.content}>
      {parseAddressModal}
      <Row>
        <div className={styles.firstLine}>
          <Button hidden={false} className={styles.pasteBtnAndParseBtn} type="primary" shape="round" size='middle' onClick={this.onClickPasteAddressQuickFillBtn.bind(this)}>粘贴并识别</Button>
          {/*<Button className={styles.pasteBtnAndParseBtn} type="primary" shape="round" size='middle' onClick={onClickShowParseModalBtn}>识别</Button>*/}
          <Button className={styles.pasteBtnAndParseBtn} type="primary" shape="round" size='middle' onClick={onClickParseBtn}>识别</Button>
        </div>
      </Row>
      <Row>
        <Col style={{width:'100%'}}>
          <TextArea
              value={this.state.waitParseString}
              placeholder="输入或粘贴将要解析的信息,商品信息请在独立行"
              allowClear
              onChange={this.onAddressChange.bind(this)}
              autoSize={{ minRows: 6, maxRows: 99 }}
          />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={6}><Cascader value={this.state.pickerValue} options={pickerData} onChange={this.onAreaPickerChange.bind(this)} placeholder="请选择省市区"
                                style={{width: '100%'}}/></Col>
        <Col span={6}><Input value={this.state.inputtingValues.name} placeholder="姓名" onChange={this.onNameChange.bind(this)}/></Col>
        <Col span={6}><Input value={this.state.inputtingValues.mobile} placeholder="联系电话" onChange={this.onMobileChange.bind(this)}/></Col>
         </Row>
      <Row>
        <Col style={{width:'100%'}}>
          <TextArea value={this.state.inputtingValues.address} placeholder="输入详细地址信息:" allowClear onChange={this.onAddressChange.bind(this)}/>
        </Col>
      </Row>
      <Row>
        <Col style={{width:'100%'}}>
          <TextArea value={this.state.inputtingValues.memo} placeholder="请输入商品信息" allowClear onChange={this.onMemoChange.bind(this)}/>
        </Col>
      </Row>

      <Row>
        <Col className={styles.btnLine}>
          <Button type="primary" shape="round" size='large' onClick={onClickSubmitBtn} className={styles.createBtn}>创建</Button>
        </Col>
      </Row>
    </Space>
    </div>
  }
}

export default Creator;
