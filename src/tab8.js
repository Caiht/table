import React, { Component } from 'react';
import axios from 'axios';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
//引入折线图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class EchartsTest4 extends Component {
    componentDidMount() {
        axios.get('article/cnki/agg/dateHistogram')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main4'));
                let sourse1 = [];
                let sourse2 = [];
                console.log(res);
                res.data.data.map(item => {
                    sourse1.push(item.commonId);
                    sourse2.push(item.count);
                });
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '文献月份发布折线图',
                        subtext: '数据来自网络'

                    },

                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                    },
                    xAxis: {
                        type: 'category',
                        data: sourse1,
                        boundaryGap: [0, 0.01]
                    },
                    series: [

                        {
                            name: '文献总数',
                            type: 'line',
                            data: sourse2,
                            itemStyle: {
                                normal: {
                                    color: '#0000CD'
                                }
                            }
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="main4" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}