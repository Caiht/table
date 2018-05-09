import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs, Divider, Modal} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class BookSearch1 extends Component {
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
        axios.get('http://localhost:8081/api/book/search/all')
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
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
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
                axios.get(`http://localhost:8081/api/book/search/all?queryStr=${value.queryStr}`)
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
                                date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
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
        this.setState({
            page,
            pageSize
        });
        const _this = this;
        axios.get(`book/search/all?queryStr=${this.state.tab.queryStr}&pageNum=${page}`)
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
                        date: new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-'+ new Date(item.date).getDate(),
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
    };

    handleAdd = () => {
        this.setState({
            addModal: true,
            editData: []
        })
    };

    handleEdit = (text, record) => {
        this.setState({
            editModal: true,
            id: record.key,
            editData: record
        })
    };

    handleDelete = (record) => {
        console.log(record);
        axios.get(`http://localhost:8081/api/book/delete?id=${record.key}`);
        this.handleChangePage(this.state.page, this.state.pageSize);
    };

    handleAddForm = (e) => {
        e.preventDefault();
        const {form} = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                axios.get(`http://localhost:8081/api/book/save?title=${values.title}&author=${values.author}&publish=${values.publish}&score=${values.score}&person=${values.person}&tag=${values.tag}&introduction=${values.introduction}&price=${values.price}&date=${values.date}&isbn=${values.isbn}`);
                form.resetFields();
                this.handleChangePage(this.state.page, this.state.pageSize);
                this.setState({
                    addModal: false
                })
            }
        })
    };

    editOk = (e) => {
        e.preventDefault();
        const {form} = this.props;
        const {id} = this.state;
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                axios.get(`http://localhost:8081/api/book/save?id=${id}&title=${values.title}&author=${values.author}&publish=${values.publish}&score=${values.score}&person=${values.person}&tag=${values.tag}&introduction=${values.introduction}&price=${values.price}&date=${values.date}&isbn=${values.isbn}`);
                form.resetFields();
                this.handleChangePage(this.state.page, this.state.pageSize);
                this.setState({
                    editModal: false
                })
            }
        })
    };

    render() {
        console.log(this.state.editData);
        const {editData} = this.state;
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
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a href="javascript:;" onClick={this.handleAdd}>Add</a>
                <Divider type="vertical"/>
                    <a href="javascript:;" onClick={this.handleEdit.bind(this, text, record)}>Edit</a>
                <Divider type="vertical"/>
                    <a href="javascript:;" onClick={this.handleDelete.bind(this, record)}>Delete</a>
                </span>
            ),
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

                <Modal
                    title='增加'
                    visible={this.state.addModal}
                    onCancel={() => this.setState({addModal: false, editData: []})}
                    onOk={this.handleAddForm}
                >
                    <Form layout="inline">
                        <FormItem label="标题">{getFieldDecorator('title')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="评分">{getFieldDecorator('score')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="作者">{getFieldDecorator('author')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="价格">{getFieldDecorator('price')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="评分人数">{getFieldDecorator('person')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="日期">{getFieldDecorator('date')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="出版社">{getFieldDecorator('publish')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="标签">{getFieldDecorator('tag')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="摘要">{getFieldDecorator('introduction')(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="isbn">{getFieldDecorator('isbn')(
                            <Input/>
                        )}</FormItem>
                    </Form>
                </Modal>
                <Modal
                    title="编辑"
                    onCancel={() => this.setState({editModal: false, editData: []})}
                    visible={this.state.editModal}
                    onOk={this.editOk}
                >
                    <Form layout="inline">
                        <FormItem label="标题">{getFieldDecorator('title', {
                            initialValue: editData.title,
                            rules: [{require: true, message: '请输入标题'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="评分">{getFieldDecorator('score', {
                            initialValue: editData.score,
                            rules: [{require: true, message: '请输入评分'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="作者">{getFieldDecorator('author', {
                            initialValue: editData.author,
                            rules: [{require: true, message: '请输入作者'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="价格">{getFieldDecorator('price', {
                            initialValue: editData.price,
                            rules: [{require: true, message: '请输入价格'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="评分人数">{getFieldDecorator('person',{
                            initialValue: editData.person,
                            rules: [{require: true, message: '请输入评分人数'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="日期">{getFieldDecorator('date',{
                            initialValue: editData.date,
                            rules: [{require: true, message: '请输入日期'}]
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="出版社">{getFieldDecorator('publish',{
                            initialValue: editData.publish
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="标签">{getFieldDecorator('tag',{
                            initialValue: editData.tag
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="摘要">{getFieldDecorator('introduction',{
                            initialValue: editData.introduction
                        })(
                            <Input/>
                        )}</FormItem>
                        <FormItem label="isbn">{getFieldDecorator('isbn',{
                            initialValue: editData.isbn,
                            rules: [{require: true, message: '请输入isbn'}]
                        })(
                            <Input/>
                        )}</FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default BookSearch1 = Form.create()(BookSearch1)