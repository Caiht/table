import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs, Divider, Modal} from 'antd';


const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;

class ArticleSearchParams extends Component {
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
        axios.get('http://localhost:8081/api/article/cnki/search/params')
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
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                _this.setState({
                    tab: value
                });
                axios.get(`http://localhost:8081/api/article/cnki/search/params?title=${value.title}&author=${value.author}&introduction=${value.introduction}&teacher=${value.teacher}&university=${value.university}&type=${value.type}`)
                    .then(res => {
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
        axios.get(`http://localhost:8081/api/article/cnki/search/params?title=${this.state.title}&author=${this.state.author}&introduction=${this.state.introduction}&teacher=${this.state.teacher}&university=${this.state.university}&type=${this.state.type}&pageNum=${page}`)
            .then(res => {
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
                _this.setState({
                    dataSourse: sourse,
                    total: res.data.total
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
                    <FormItem style={{width: '30%'}} label="标题">
                        {getFieldDecorator('title')(
                            <Input placeholder="请输入标题"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="作者">
                        {getFieldDecorator('author')(
                            <Input placeholder="请输入作者"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="老师">
                        {getFieldDecorator('teacher')(
                            <Input placeholder="请输入老师"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="学校">
                        {getFieldDecorator('university')(
                            <Input placeholder="请输入学校"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="专业类型">
                        {getFieldDecorator('type')(
                            <Input placeholder="请输入专业类型"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="摘要">
                        {getFieldDecorator('introduction')(
                            <TextArea placeholder="请输入摘要"/>
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

export default ArticleSearchParams = Form.create()(ArticleSearchParams)