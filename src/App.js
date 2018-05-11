import React, {Component} from 'react';
import {Form, Icon, Input, Menu, Tabs, Switch, Layout} from 'antd';
import {Link} from "react-router-dom";
import 'antd/dist/antd.css';
import logo from './logo.svg';
import './Navi.css'

const {Header, Content, Footer, Sider} = Layout;

const FormItem = Form.Item;
const {TextArea} = Input;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class App extends Component {

    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // submenu keys of first level
    rootSubmenuKeys = ['article-search', 'patent-search', 'book-search',
        'periodical-search', 'article-agg', 'patent-agg',
        'book-agg', 'periodical-agg'];
    state = {
        openKeys: ['article-search'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({openKeys});
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        const {children} = this.props;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="logo"/><span
                            className="nav-text">文献检索系统</span></Link>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['article-search']}
                          openKeys={this.state.openKeys} onOpenChange={this.onOpenChange}>
                        <SubMenu key="article-search" title={<span><Icon type="copy"/><span>论文检索</span></span>}>
                            <MenuItem key="article-all">
                                <Link to="/article/search/all">论文全文搜索</Link>
                            </MenuItem>
                            <MenuItem key="article-params">
                                <Link to="/article/search/params">论文精准搜索</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="patent-search" title={<span><Icon type="code-o"/><span>专利检索</span></span>}>
                            <MenuItem key="patent-all">
                                <Link to="/patent/search/all">专利全文搜索</Link>
                            </MenuItem>
                            <MenuItem key="patent-params">
                                <Link to="/patent/search/params">专利精准搜索</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="book-search" title={<span><Icon type="book"/><span>图书检索</span></span>}>
                            <MenuItem key="book-all">
                                <Link to="/book/search/all">图书全文搜索</Link>
                            </MenuItem>
                            <MenuItem key="book-params">
                                <Link to="/book/search/params">图书精准搜索</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="periodical-search" title={<span><Icon type="file"/><span>期刊检索</span></span>}>
                            <MenuItem key="periodical-all">
                                <Link to="/periodical/search/all">期刊全文搜索</Link>
                            </MenuItem>
                            <MenuItem key="periodical-params">
                                <Link to="/periodical/search/params">期刊精准搜索</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="article-agg" title={<span><Icon type="bar-chart"/><span>论文图表</span></span>}>
                            <MenuItem key="article-type">
                                <Link to="/article/agg/type">硕士论文贡献前十专业</Link>
                            </MenuItem>
                            <MenuItem key="article-university">
                                <Link to="/article/agg/university">硕士论文贡献前十高校</Link>
                            </MenuItem>
                            <MenuItem key="article-month">
                                <Link to="/article/agg/month">文献月份发布折线图</Link>
                            </MenuItem>
                            <MenuItem key="article-year">
                                <Link to="/article/agg/year">文献年份发布折线图</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="patent-agg" title={<span><Icon type="area-chart"/><span>专利图表</span></span>}>
                            <MenuItem key="patent-type">
                                <Link to="/patent/agg/type">专利贡献前十类别</Link>
                            </MenuItem>
                            <MenuItem key="patent-month">
                                <Link to="/patent/agg/month">专利月份发布折线图</Link>
                            </MenuItem>
                            <MenuItem key="patent-year">
                                <Link to="/patent/agg/year">专利申请年份折线条状图</Link>
                            </MenuItem>
                            <MenuItem key="patent-pubyear">
                                <Link to="/patent/agg/pubyear">专利公开年份折线条状图</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="book-agg" title={<span><Icon type="pie-chart"/><span>图书图表</span></span>}>
                            <MenuItem key="book-tag">
                                <Link to="/book/agg/tag">同标签书籍数量统计</Link>
                            </MenuItem>
                            <MenuItem key="book-publish">
                                <Link to="/book/agg/publish">同出版社书籍数量统计</Link>
                            </MenuItem>
                            <MenuItem key="book-date">
                                <Link to="/book/agg/date">图书出版年份折线条状图</Link>
                            </MenuItem>
                            <MenuItem key="book-tag-detail">
                                <Link to="/book/agg/tagDetail">标签书籍详情</Link>
                            </MenuItem>
                            <MenuItem key="book-publish-detail">
                                <Link to="/book/agg/publishDetail">出版社书籍详情</Link>
                            </MenuItem>
                        </SubMenu>

                        <SubMenu key="periodical-agg" title={<span><Icon type="dot-chart"/><span>期刊图表</span></span>}>
                            <MenuItem key="periodical-type">
                                <Link to="/periodical/agg/type">同标签期刊数量统计</Link>
                            </MenuItem>
                            <MenuItem key="periodical-dateHistogram">
                                <Link to="/periodical/agg/dateHistogram">期刊出版月份折线条状图</Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#000', padding: 0}}>
                        <span style={{color: '#fff', paddingLeft: '2%', fontSize: '1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color: '#fff', paddingLeft: '2%', fontSize: '1.4em'}}>Article Search System</span>
                        <span style={{color: '#fff', float: 'right', paddingRight: '1%'}}>
                            <img src={logo} className="App-logo" alt="logo"/>
                        </span>
                    </Header>
                    <Content style={{margin: '0'}}>
                        <div id="cavansName" style={{padding: 0, background: 'white', minHeight: 780}}>
                            {children}
                        </div>
                    </Content>
                    <Footer style={{background: 'black',textAlign: 'center',color:"white"}}>
                        Article Search ©2018 Created by Cai Huatao
                    </Footer>
                </Layout>
            </Layout>

        );
    }
}

export default App = Form.create()(App);
