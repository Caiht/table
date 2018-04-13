import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, Form, Input, Table, Tabs} from 'antd';

import Tab3 from './tab3';
import Tab4 from './tab4';
import EchartsTest from "./tab5";
import EchartsTest2 from "./tab6";
import EchartsTest3 from "./tab7";
import EchartsTest4 from "./tab8";
import EchartsTest5 from "./tab9";
import EchartsTest6 from "./tab10";
import EchartsTest7 from "./tab11";
import EchartsTest8 from "./tab12";
import BookSearch1 from "./tab13";
import BookSearch2 from "./tab14";
import PeriodicalSearch1 from "./tab15";
import PeriodicalSearch2 from "./tab16";
import BookTagAgg from "./tab17";
import BookPublishAgg from "./tab18";
import PeriodicalPublishAgg from "./tab19";
import BookDateAgg from "./tab20";
import PeriodicalDateAgg from "./tab21";
import BookTagAggDetail from "./tab22";
import BookPublishAggDetail from "./tab23";

const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;


class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            tab1: {},
            tab2: {},
            dataSourse: [],
            dataSourse2: [],
            total2: null,
            total: null
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount() {
        axios.get('article/cnki/SearchByQueryStr')
            .then((res) => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
                    })
                });
                this.setState({
                    dataSourse: sourse,
                    total: res.data.data.total
                })
            });
        axios.get('article/cnki/SearchByParams')
            .then((res) => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
                    })
                });
                this.setState({
                    dataSourse2: sourse,
                    total2: res.data.data.total
                })
            })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                _this.setState({
                    tab1: value
                });
                axios.get(`article/cnki/SearchByQueryStr?queryStr=${value.queryStr}`)
                    .then(res => {
                        let sourse = [];
                        res.data.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                author: item.author,
                                introduction: item.introduction,
                                teacher: item.teacher,
                                university: item.university,
                                type: item.type,
                                date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
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

    handleSubmit2 = (e) => {
        e.preventDefault();
        const _this = this;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                _this.setState({
                    tab2: value
                });
                axios.get(`article/cnki/SearchByParams?title=${value.title}&author=${value.author}&introduction=${value.introduction}&teacher=${value.teacher}&university=${value.university}&type=${value.type}`)
                    .then(res => {
                        let sourse = [];
                        res.data.data.list.map(item => {
                            sourse.push({
                                key: item.id,
                                title: item.title,
                                author: item.author,
                                introduction: item.introduction,
                                teacher: item.teacher,
                                university: item.university,
                                type: item.type,
                                date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
                            })
                        });
                        _this.setState({
                            dataSourse2: sourse,
                            total2: res.data.data.total
                        })
                    })
            }
        })
    };

    handleChangePage(page, pageSize) {
        console.log(page, pageSize);
        const _this = this;
        axios.get(`article/cnki/SearchByQueryStr?queryStr=${this.state.tab1.queryStr}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
                    })
                });
                _this.setState({
                    dataSourse: sourse
                })
            })
    };

    handleChangePage2(page, pageSize) {
        console.log(page, pageSize);
        const _this = this;
        axios.get(`article/cnki/SearchByParams?title=${this.state.tab2.title}&author=${this.state.tab2.author}&introduction=${this.state.tab2.introduction}&teacher=${this.state.tab2.teacher}&university=${this.state.tab2.university}&type=${this.state.tab2.type}&pageNum=${page}`)
            .then(res => {
                let sourse = [];
                res.data.data.list.map(item => {
                    sourse.push({
                        key: item.id,
                        title: item.title,
                        author: item.author,
                        introduction: item.introduction,
                        teacher: item.teacher,
                        university: item.university,
                        type: item.type,
                        date: new Date(item.date).getFullYear()+'年'+(new Date(item.date).getMonth()+1)+'月'
                    })
                });
                _this.setState({
                    dataSourse2: sourse
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


        const extraSearch1 = () => (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem >
                        {getFieldDecorator('queryStr')(
                            <Input style={{width:'900px' }} placeholder="请输入搜索内容"/>
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

        const extraSearch2 = () => (
            <div>
                <Form layout="inline" onSubmit={this.handleSubmit2}>
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
                    <FormItem style={{width: '30%'}} label="老师">
                        {getFieldDecorator('teacher')(
                            <Input placeholder="请输入老师"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="学校">
                        {getFieldDecorator('university')(
                            <Input  placeholder="请输入学校"/>
                        )}
                    </FormItem>
                    <FormItem style={{width: '30%'}} label="专业类型">
                        {getFieldDecorator('type')(
                            <Input  placeholder="请输入专业类型"/>
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

        const pagination1 = {
            total: this.state.total,
            pageSize: 20,
            showTotal: total => `共${total}条`,
            onChange: (page, pageSize) => {
                this.handleChangePage(page, pageSize)
            }
        };
        const pagination2 = {
            total: this.state.total2,
            pageSize: 20,
            showTotal: total => `共${total}条`,
            onChange: (page, pageSize) => {
                this.handleChangePage2(page, pageSize)
            }
        };


        return (
            <div >

                <Tabs defaultActiveKey="1" tabPosition="left" style={{color:'#00CC00'}} >
                    <TabPane tab="文献全文搜索" key="1">
                        <Card extra={extraSearch1()}>
                            <Table dataSource={this.state.dataSourse}
                                   expandedRowRender={record => <p style={{ margin: 0 }}>{record.introduction}</p>} columns={columns} pagination={pagination1}/>
                        </Card>
                    </TabPane>
                    <TabPane tab="文献精准搜索" key="2">
                        <Card extra={extraSearch2()}>
                            <Table dataSource={this.state.dataSourse2} expandedRowRender={record => <p style={{ margin: 0 }}>{record.introduction}</p>} columns={columns} pagination={pagination2}/>
                        </Card>
                    </TabPane>
                    <TabPane tab="专利全文搜索" key="3">
                        <Tab3/>
                    </TabPane>
                    <TabPane tab="专利精准搜索" key="4">
                        <Tab4/>
                    </TabPane>
                    <TabPane tab="图书全文搜索" key="13">
                        <BookSearch1/>
                    </TabPane>
                    <TabPane tab="图书精准搜索" key="14">
                        <BookSearch2/>
                    </TabPane>
                    <TabPane tab="期刊全文搜索" key="15">
                        <PeriodicalSearch1/>
                    </TabPane>
                    <TabPane tab="期刊精准搜索" key="16">
                        <PeriodicalSearch2/>
                    </TabPane>
                    <TabPane tab="硕士论文贡献前十高校" key="5">
                        <EchartsTest/>
                    </TabPane>
                    <TabPane tab="硕士论文贡献前十专业" key="6">
                        <EchartsTest2/>
                    </TabPane>
                    <TabPane tab="专利贡献前十类别" key="7">
                        <EchartsTest3/>
                    </TabPane>
                    <TabPane tab="文献月份发布折线图" key="8">
                        <EchartsTest4/>
                    </TabPane>
                    <TabPane tab="专利月份发布折线图" key="9">
                        <EchartsTest5/>
                    </TabPane>
                    <TabPane tab="文献年份发布折线条状图" key="10">
                        <EchartsTest6/>
                    </TabPane>
                    <TabPane tab="专利申请年份折线条状图" key="11">
                        <EchartsTest7/>
                    </TabPane>
                    <TabPane tab="专利公开年份折线条状图" key="12">
                        <EchartsTest8/>
                    </TabPane>
                    <TabPane tab="同标签书籍数量统计" key="17">
                        <BookTagAgg/>
                    </TabPane>
                    <TabPane tab="同出版社书籍数量统计" key="18">
                        <BookPublishAgg/>
                    </TabPane>
                    <TabPane tab="同提供方期刊数量统计" key="19">
                        <PeriodicalPublishAgg/>
                    </TabPane>
                    <TabPane tab="图书出版年份折线条状图" key="20">
                        <BookDateAgg/>
                    </TabPane>
                    <TabPane tab="期刊出版月份折线条状图" key="21">
                        <PeriodicalDateAgg/>
                    </TabPane>
                    <TabPane tab="标签书籍详情" key="22">
                        <BookTagAggDetail/>
                    </TabPane>
                    <TabPane tab="出版社书籍详情" key="23">
                        <BookPublishAggDetail/>
                    </TabPane>

                </Tabs>
            </div>
        );
    }
}
export default App = Form.create()(App);
