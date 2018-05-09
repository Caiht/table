import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs, Divider} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class PeriodicalSearch2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: {},
            dataSourse: [],
            total: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/api/periodical/search/params')
            .then((res) => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        publisher: item.publisher,
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
                        type: item.type,
                        introduction: item.introduction

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
                axios.get(`http://localhost:8081/api/periodical/search/params?title=${value.title}&author=${value.author}&publish=${value.publish}&type=${value.type}&introduction=${value.introduction}`)
                    .then(res => {
                        let sourse = [];
                        res.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                author: item.author,
                                publisher: item.publisher,
                                date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
                                type: item.type,
                                introduction: item.introduction
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
        axios.get(`http://localhost:8081/api/periodical/search/params?title=${this.state.tab.title}&author=${this.state.tab.author}&publish=${this.state.tab.publish}&type=${this.state.tab.type}&introduction=${this.state.tab.introduction}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        publisher: item.publisher,
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
                        type: item.type,
                        introduction: item.introduction
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
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        }, {
            title: '提供方',
            dataIndex: 'publisher',
            key: 'publisher',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '发布时间',
            dataIndex: 'date',
            key: 'date',
        }];
        const extraSearch = () => (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem style={{width: '30%'}} label="标题">
                        {getFieldDecorator('title')(
                            <Input  placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="作者">
                        {getFieldDecorator('author')(
                            <Input  placeholder="请输入作者"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="出版方">
                        {getFieldDecorator('publish')(
                            <Input  placeholder="请输入出版方"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="类型">
                        {getFieldDecorator('type')(
                            <Input  placeholder="请输入类型"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="摘要">
                        {getFieldDecorator('introduction')(
                            <TextArea  placeholder="请输入摘要"/>
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
                    <Table dataSource={this.state.dataSourse} columns={columns}
                           expandedRowRender={record => <p style={{margin: 0}}>{record.introduction}</p>}
                           pagination={pagination}/>
                </Card>
            </div>
        )
    }
}

export default PeriodicalSearch2 = Form.create()(PeriodicalSearch2)