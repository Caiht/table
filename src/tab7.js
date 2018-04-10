import React, { Component } from 'react';
import axios from 'axios';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class EchartsTest3 extends Component {
    componentDidMount() {
        axios.get('patent/agg/type')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('main3'));
                let sourse1 = [];
                let sourse2 = [];
                res.data.data.map(item => {
                    sourse1.push(item.commonId);
                    sourse2.push(item.count);
                });
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '专利贡献前十类别',

                    },
                    color: ['#7CFC00'],


                    title: {
                        text: '专利贡献前十类别',
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
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: [res.data.data[9].commonId,res.data.data[8].commonId,res.data.data[7].commonId,res.data.data[6].commonId,res.data.data[5].commonId,res.data.data[4].commonId,res.data.data[3].commonId,res.data.data[2].commonId,res.data.data[1].commonId,res.data.data[0].commonId],
                    },
                    series: [

                        {
                            name: '专利总数',
                            type: 'bar',
                            data: [res.data.data[9].count,res.data.data[8].count,res.data.data[7].count,res.data.data[6].count,res.data.data[5].count,res.data.data[4].count,res.data.data[3].count,res.data.data[2].count,res.data.data[1].count,res.data.data[0].count]
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="main3" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}