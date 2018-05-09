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
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';


export default class BookTagAggDetail extends Component {
    componentDidMount() {
        axios.get('http://localhost:8081/api/book/agg/tag')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bookTagAggDetail'));
                let sourse1 = [];
                let sourse2 = [];
                let sourse3 = [];
                let sourse4 = [];
                console.log(res);
                res.data.map(item => {
                    sourse1.push(item.title);
                    sourse2.push(item.count);
                    sourse3.push(item.priceSum);
                    sourse4.push(item.scoreAvg)
                });
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                // 绘制图表
                myChart.setOption({
                    tooltip : {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            label: {
                                show: true
                            }
                        }
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    legend: {
                        data:['书籍数量', '书籍总价','平均评分'],
                        itemGap: 5
                    },
                    grid: {
                        top: '12%',
                        left: '1%',
                        right: '10%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type : 'category',
                            data : sourse1
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '书籍总价',
                            min: 0,
                            max: 10000,
                            position: 'right',
                            offset: 80,
                            axisLine: {
                                lineStyle: {
                                    color: colors[1]
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 元'
                            }
                        },
                        {
                            type: 'value',
                            name: '书籍数量',
                            min: 0,
                            max: 100,
                            position: 'right',
                            axisLine: {
                                lineStyle: {
                                    color: colors[0]
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 本'
                            }
                        },
                        {
                            type: 'value',
                            name: '平均评分',
                            min: 0,
                            max: 10,
                            position: 'left',
                            axisLine: {
                                lineStyle: {
                                    color: colors[2]
                                }
                            },
                            axisLabel: {
                                formatter: '{value} 分'
                            }
                        }
                    ],
                    dataZoom: [
                        {
                            show: true,
                            start: 94,
                            end: 100
                        },
                        {
                            type: 'inside',
                            start: 94,
                            end: 100
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            width: 30,
                            height: '80%',
                            showDataShadow: false,
                            left: '93%'
                        }
                    ],
                    series : [
                        {
                            name: '书籍数量',
                            type: 'bar',
                            data: sourse2
                        },
                        {
                            name: '书籍总价',
                            type: 'bar',
                            data: sourse3
                        },
                        {
                            name: '平均评分',
                            type: 'line',
                            data: sourse4
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="bookTagAggDetail" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}