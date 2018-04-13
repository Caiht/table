import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class BookSearch2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: {},
            dataSourse: [],
            total: null
        }
    }

    componentDidMount() {
        axios.get('book/SearchByParams')
            .then((res) => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        score: item.score,
                        author: item.author,
                        price: item.price,
                        person: item.person,
                        date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月' + new Date(item.date).getDate() + '日',
                        publish: item.publish,
                        tag: item.tag,
                        introduction: item.introduction,
                        isbn: item.isbn

                    })
                });
                this.setState({
                    dataSourse: sourse,
                    total: res.data.data.total
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
                axios.get(`book/SearchByParams?title=${value.title}&author=${value.author}
                &publish=${value.publish}&gtScore=${value.gtScore}&ltScore=${value.ltScore}
                &tag=${value.tag}&introduction=${value.introduction}&gtPrice=${value.gtPrice}
                &ltPrice=${value.ltPrice}&isbn=${value.isbn}`)
                    .then(res => {
                        let sourse = [];
                        res.data.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                score: item.score,
                                author: item.author,
                                price: item.price,
                                person: item.person,
                                date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月' + new Date(item.date).getDate() + '日',
                                publish: item.publish,
                                tag: item.tag,
                                introduction: item.introduction,
                                isbn: item.isbn
                            })
                        });
                        _this.setState({
                            dataSourse: sourse,
                            total: res.data.data.total
                        })
                    })
            }
        })
    };

    handleChangePage(page, pageSize) {
        console.log(page, pageSize);
        const _this = this;
        axios.get(`book/SearchByParams?title=${this.state.tab.title}&author=${this.state.tab.author}
                &publish=${this.state.tab.publish}&gtScore=${this.state.tab.gtScore}&ltScore=${this.state.tab.ltScore}
                &tag=${this.state.tab.tag}&introduction=${this.state.tab.introduction}&gtPrice=${this.state.tab.gtPrice}
                &ltPrice=${this.state.tab.ltPrice}&isbn=${this.state.tab.isbn}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        score: item.score,
                        author: item.author,
                        price: item.price,
                        person: item.person,
                        date: new Date(item.date).getFullYear() + '年' + (new Date(item.date).getMonth() + 1) + '月' + new Date(item.date).getDate() + '日',
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
                        {getFieldDecorator('tag')(
                            <Input  placeholder="请输入类型"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="isbn">
                        {getFieldDecorator('isbn')(
                            <Input  placeholder="请输入isbn"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="最低评分">
                        {getFieldDecorator('gtScore')(
                            <Input  placeholder="请输入最低评分"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="最高评分">
                        {getFieldDecorator('ltScore')(
                            <Input  placeholder="请输入最高评分"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="最低价格">
                        {getFieldDecorator('gtPrice')(
                            <Input  placeholder="请输入最低评分"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="最高价格">
                        {getFieldDecorator('ltPrice')(
                            <Input  placeholder="请输入最高评分"/>
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

export default BookSearch2 = Form.create()(BookSearch2)