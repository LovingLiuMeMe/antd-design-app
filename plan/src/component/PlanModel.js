import React,{ PureComponent } from 'react';
import { Modal } from 'antd-mobile';

class PlanModel extends PureComponent {
    constructor(props){
        super(props)
        this.handClick = this.handClick.bind(this)
    }
    handClick(){
        this.node.click()
    }
    render(){
            return (
                <div>
                    <Modal
                        visible={this.props.show}
                        transparent
                        maskClosable={false}
                        onClose={() => this.props.press('cancel')}
                        title={this.props.title}
                        footer={[{ text: '取消', onPress: () => { this.props.press('cancel')}},{ text: '确定', onPress: () => {this.props.press('sure')}}]}
                        afterClose={() => { console.log('close modal'); }}
                        >
                        <div>
                        {
                            this.props.question
                        }
                        </div>
                    </Modal>
                </div>

            )
    }

    
}
export default PlanModel