import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs, Divider, Modal} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class ArticleSearchAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: {},
            dataSourse: [],
            total: null,
            addModal: false,
            editModal: false,
            page: 1,
            pageSize: 20,
            editData: [],
            id: null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8081/api/article/cnki/search/all')
            .then((res) => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate()
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
                    tab1: value
                });
                axios.get(`http://localhost:8081/api/article/cnki/search/all?queryStr=${value.queryStr}`)
                    .then(res => {
                        let sourse = [];
                        console.log(res);
                        res.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                author: item.author,
                                introduction: item.introduction,
                                teacher: item.teacher,
                                university: item.university,
                                type: item.type,
                                date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate()
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
        axios.get(`http://localhost:8081/api/article/cnki/search/all?queryStr=${this.state.queryStr}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                console.log(res);
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate()
                    })
                });
                _this.setState({
                    dataSourse: sourse
                })
            })
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        const columns = [

            {
                title: '标题',
                dataIndex: 'title',
                key: 'title',

            }, {
                title: '作者',
                dataIndex: 'author',
                key: 'author',
            }, {
                title: '老师',
                dataIndex: 'teacher',
                key: 'teacher',
            }, {
                title: '学校',
                dataIndex: 'university',
                key: 'university',
            }, {
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            }, {
                title: '发表时间',
                dataIndex: 'date',
                key: 'date',
            }];
        const extraSearch = () => (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('queryStr')(
                            <Input style={{width: '900px'}} placeholder="请输入搜索内容"/>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            全文搜索
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


export default ArticleSearchAll= Form.create()(ArticleSearchAll)