import React from "react";
import {Modal, Input, message} from "antd";
import app from "./global/app";


const {TextArea} = Input;

class InputModal extends React.Component
{
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }
    componentDidMount() {
        if (this.inputRef && this.inputRef.current) {
            this.inputRef.current.focus();
        }
    }
    state=
        {
            show:true,
            inputtingValue:null,
        }
        onConfirm()
        {
            if (!this.state.inputtingValue || this.state.inputtingValue.length<3)
            {
                message.warn('请输入有效的地址信息');
                return;
            }
            if (this.props.onConfirm)
            {
                this.props.onConfirm(this.state.inputtingValue);
            }
        }
        onCancel()
        {
            if (this.props.onCancel)
            {
                this.props.onCancel();
            }
        }
        onTextChange(e)
        {
            this.setState({inputtingValue:e.target.value});
        }
        onPaste(e)
        {
            let address = e.clipboardData.getData('Text');
            // console.log('粘贴了地址:',e.clipboardData.getData('Text'));
            this.setState({inputtingValue:address},()=>
            {
                this.onConfirm();
            })
        }
    render() {
        if (!this.state.show)
        {
            return null;
        }
        let DOM = <Modal visible={true}
                         title={'智能识别'}
                         okText={'识别'}
                         cancelText={'取消'}
                         onCancel={this.onCancel.bind(this)}
                         onOk={this.onConfirm.bind(this)}
                         centered={true}
        >
            <TextArea
                onPaste={this.onPaste.bind(this)} ref={this.inputRef}
                onChange={this.onTextChange.bind(this)}
                allowClear
                placeholder={'在此处填写地址后点击识别,若在此粘贴剪切板内容将自动解析'}>
            </TextArea>
        </Modal>

        return DOM;
    }
}
export default InputModal;
