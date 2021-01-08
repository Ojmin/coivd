import {
    jsonp
} from './jsonp.js'
import {
    setOption1,
    setOption2,
    setOption3,
    setOption4,
    setOption5,
    setOption6,
    setForeignData
} from './options.js'
//获取国外疫情数据
//通过return promise的形式,导出异步获得的数据
export function getForeinData(params = {
    name: 'disease_foreign'
}) {
    return new Promise((resolve, reject) => {
        jsonp({
            // url: 'https://view.inews.qq.com/g2/getOnsInfo',
            params: params,
            url: 'http://127.0.0.1:8000/coivd_info',
            success(res) {
                let foreinData;
                let chinaData;
                foreinData = JSON.parse(res.data);
                const option1 = setOption1(foreinData.countryAddConfirmRankList); //新增确诊
                const option2 = setOption2(foreinData.foreignList); //各国详情
                const option3 = setOption3(foreinData.continentStatis); //各大洲情况
                const option4 = setOption4(foreinData.globalDailyHistory); //全球历史患病死亡治愈情况
                const option5 = setOption5(foreinData.continentStatis[foreinData.continentStatis.length - 1]); //各大洲最新情况
                const option6 = setOption6(foreinData.importStatis); //境外输入到国内各省
                const centerTop = foreinData.globalStatis; //全球疫情情况,累计,新增,死亡,治愈
                resolve({
                    option1,
                    option2,
                    option3,
                    option4,
                    option5,
                    option6,
                    centerTop
                })
            }
        });
    })
}

//同时获取国外和国内疫情数据与，并进行一定处理
export function getMapData(params1 = {
    name: 'disease_foreign'
}, params2 = {
    name: 'disease_h5',
}) {
    return Promise.all([new Promise((resolve, reject) => {

        jsonp({
            // url: 'https://view.inews.qq.com/g2/getOnsInfo',
            params: params1,
            url: 'http://127.0.0.1:8000/coivd_info',
            success(res) {
                let foreinData;
                foreinData = JSON.parse(res.data);
                const foreignData = setForeignData(foreinData.foreignList);
                resolve(foreignData)
            }
        })
    }), new Promise((resolve, reject) => {
        jsonp({
            // url: 'https://view.inews.qq.com/g2/getOnsInfo',
            url: 'http://127.0.0.1:8000/coivd_info',
            params: params2,
            success(res1) { //注意不能和上面的重复
                let chinaData;
                chinaData = JSON.parse(res1.data);
                const chinaMapData = {
                    name: '中国',
                    confirm: chinaData.chinaTotal.confirm,
                    nowConfirm: chinaData.chinaTotal.nowConfirm
                }
                resolve(chinaMapData);
            }
        });
    })])
}

//添加echart图表
export function addChart(dom, option) {
    let myChart = echarts.init(dom);
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
    return myChart;
}