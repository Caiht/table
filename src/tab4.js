import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class Tab4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: {},
            dataSourse: [],
            total: null
        }
    }

    componentDidMount() {
        axios.get('patent/search/params')
            .then((res) => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        introduction: item.introduction,
                        type: item.type,
                        requestNumber: item.requestNumber,
                        publicationNumber: item.publicationNumber,
                        proposer: item.proposer,
                        inventor: item.inventor,
                        requestDate: new Date(item.requestDate).getFullYear() + '年' + (new Date(item.requestDate).getMonth() + 1) + '月' + new Date(item.requestDate).getDate() + '日',
                        publicationDate: new Date(item.publicationDate).getFullYear() + '年' + (new Date(item.publicationDate).getMonth() + 1) + '月' + new Date(item.publicationDate).getDate() + '日'
                    })
                });
                this.setState({
                    dataSourse: sourse,
                    total: res.data.total
                })
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                _this.setState({
                    tab: value
                });
                axios.get(`patent/search/params?title=${value.title}&requestNumber=${value.requestNumber}&publicationNumber=${value.publicationNumber}&proposer=${value.proposer}&inventor=${value.inventor}&introduction=${value.introduction}&type=${value.type}`)
                    .then(res => {
                        let sourse = [];
                        res.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                introduction: item.introduction,
                                type: item.type,
                                requestNumber: item.requestNumber,
                                publicationNumber: item.publicationNumber,
                                proposer: item.proposer,
                                inventor: item.inventor,
                                requestDate: new Date(item.requestDate).getFullYear() + '年' + (new Date(item.requestDate).getMonth() + 1) + '月' + new Date(item.requestDate).getDate() + '日',
                                publicationDate: new Date(item.publicationDate).getFullYear() + '年' + (new Date(item.publicationDate).getMonth() + 1) + '月' + new Date(item.publicationDate).getDate() + '日'
                            })
                        });
                        _this.setState({
                            dataSourse: sourse,
                            total: res.data.total
                        })
                    })
            }
        })
    };

    handleChangePage(page, pageSize) {
        console.log(page, pageSize);
        const _this = this;
        axios.get(`patent/search/params?title=${this.state.tab.title}&requestNumber=${this.state.tab.requestNumber}&publicationNumber=${this.state.tab.publicationNumber}&proposer=${this.state.tab.proposer}&inventor=${this.state.tab.inventor}&introduction=${this.state.tab.introduction}&type=${this.state.tab.type}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        introduction: item.introduction,
                        type: item.type,
                        requestNumber: item.requestNumber,
                        publicationNumber: item.publicationNumber,
                        proposer: item.proposer,
                        inventor: item.inventor,
                        requestDate: new Date(item.requestDate).getFullYear() + '年' + (new Date(item.requestDate).getMonth() + 1) + '月' + new Date(item.requestDate).getDate() + '日',
                        publicationDate: new Date(item.publicationDate).getFullYear() + '年' + (new Date(item.publicationDate).getMonth() + 1) + '月' + new Date(item.publicationDate).getDate() + '日'
                    })
                });
                _this.setState({
                    dataSourse: sourse
                })
            })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '申请号',
            dataIndex: 'requestNumber',
            key: 'requestNumber',
        }, {
            title: '申请日',
            dataIndex: 'requestDate',
            key: 'requestDate',
        }, {
            title: '公开号',
            dataIndex: 'publicationNumber',
            key: 'publicationNumber',
        }, {
            title: '公开日',
            dataIndex: 'publicationDate',
            key: 'publicationDate',
        }, {
            title: '申请人',
            dataIndex: 'proposer',
            key: 'proposer',
        }, {
            title: '发明人',
            dataIndex: 'inventor',
            key: 'inventor',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }];
        const extraSearch = () => (
            <div>
                <Form className="ant-form-inline" layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem style={{width: '30%'}} label="标题">
                        {getFieldDecorator('title')(
                            <Input  placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="申请号">
                        {getFieldDecorator('requestNumber')(
                            <Input  placeholder="请输入申请号"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="公开号">
                        {getFieldDecorator('publicationNumber')(
                            <Input  placeholder="请输入搜索内容"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="申请人">
                        {getFieldDecorator('proposer')(
                            <Input  placeholder="请输入申请人"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="发明人">
                        {getFieldDecorator('inventor')(
                            <Input  placeholder="请输入发明人"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="类型">
                        {getFieldDecorator('type')(
                            <Input  placeholder="请输入类型"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            精准搜索
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
        const pagination = {
            total: this.state.total,
            pageSize: 20,
            showTotal: total => `共${total}条`,
            onChange: (page, pageSize) => {
                this.handleChangePage(page, pageSize)
            }
        };
        return (
            <div>
                <Card extra={extraSearch()}>
                    <Table dataSource={this.state.dataSourse} expandedRowRender={record => <p style={{ margin: 0 }}>{record.introduction}</p>} columns={columns} pagination={pagination}/>
                </Card>
            </div>
        )
    }
}

export default Tab4 = Form.create()(Tab4)