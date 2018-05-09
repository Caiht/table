import React, { Component } from 'react';
import axios from 'axios';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
//引入扇形图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/legendScroll';


export default class BookTagAgg extends Component {
    componentDidMount() {
        axios.get('http://localhost:8081/api/book/agg/tag')
            .then((res) => {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('bookTagAgg'));
                let sourse1 = [];
                let sourse2 = [];
                console.log(res);
                res.data.map(item => {
                    sourse1.push(item.title);
                    sourse2.push({name:item.title,value:item.count});
                });
                let sourse3={};
                for (var i = 0; i < 145; i++) {
                    sourse3[res.data[i].title]=i<6;
                }
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '同标签书籍数量统计',
                        subtext: '来源网络',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data: sourse1,
                        selected: sourse3
                    },
                    series : [
                        {
                            name: '标签',
                            type: 'pie',
                            radius : '55%',
                            center: ['40%', '50%'],
                            data: sourse2,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            });

    }
    render() {
        return (
            <div id="bookTagAgg" style={{ width: 1000, height: 1000 }}></div>
        );
    }
}