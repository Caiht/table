import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class BookSearch1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: {},
            dataSourse: [],
            total: null
        }
    }

    componentDidMount() {
        axios.get('book/SearchByQueryStr')
            .then((res) => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        score: item.score,
                        author: item.author,
                        price: item.price,
                        person: item.person,
                        date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月',
                        publish: item.publish,
                        tag: item.tag,
                        introduction: item.introduction,
                        isbn: item.isbn

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
                axios.get(`book/SearchByQueryStr?queryStr=${value.queryStr}`)
                    .then(res => {
                        let sourse = [];
                        res.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                score: item.score,
                                author: item.author,
                                price: item.price,
                                person: item.person,
                                date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月',
                                publish: item.publish,
                                tag: item.tag,
                                introduction: item.introduction,
                                isbn: item.isbn
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
        axios.get(`book/SearchByQueryStr?queryStr=${this.state.tab.queryStr}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        score: item.score,
                        author: item.author,
                        price: item.price,
                        person: item.person,
                        date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月',
                        publish: item.publish,
                        tag: item.tag,
                        introduction: item.introduction,
                        isbn: item.isbn
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
            title: '出版方',
            dataIndex: 'publish',
            key: 'publish',
        }, {
            title: '类型',
            dataIndex: 'tag',
            key: 'tag',
        }, {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        }, {
            title: '出版时间',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: '评分',
            dataIndex: 'score',
            key: 'score',
        }, {
            title: '评分人数',
            dataIndex: 'person',
            key: 'person',
        }, {
            title: 'isbn',
            dataIndex: 'isbn',
            key: 'isbn',
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

export default BookSearch1 = Form.create()(BookSearch1)