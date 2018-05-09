import React, { Component } from 'react';
import axios from 'axios';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class EchartsTest extends Component {
    componentDidMount() {
        axios.get('http://localhost:8081/api/article/cnki/agg/university')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main'));
                let sourse1 = [];
                let sourse2 = [];
                res.data.map(item => {
                    sourse1.push(item.commonId);
                    sourse2.push(item.count);
                });
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '硕士论文贡献前十高校',

                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data: [res.data[1].commonId,res.data[2].commonId,res.data[3].commonId,res.data[4].commonId,res.data[5].commonId,res.data[6].commonId,res.data[7].commonId,res.data[8].commonId,res.data[9].commonId,res.data[10].commonId],
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel:{
                                interval:0,//横轴信息全部显示
                                rotate:-30,//-30度角倾斜显示
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'论文总数',
                            type:'bar',
                            barWidth: '60%',
                            data: [res.data[1].count,res.data[2].count,res.data[3].count,res.data[4].count,res.data[5].count,res.data[6].count,res.data[7].count,res.data[8].count,res.data[9].count,res.data[10].count]
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="main" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}