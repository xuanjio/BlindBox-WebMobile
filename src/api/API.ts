export class APIResult {
    code: number
    msg: string
    data?: any

    constructor(code: number, msg: string, data?: any) {
        this.code = code
        this.msg = msg
        this.data = data
    }
}

type APIComplete = (result: APIResult) => void

import axios from "axios"
axios.defaults.baseURL = "/api"
axios.defaults.timeout = 10000

export class API {
    private static post(url: string, data?: any, complete?: APIComplete) {
        const token = sessionStorage.getItem("API_TOKEN")
        axios.defaults.headers["Authorization"] = token
        axios.post(url, data).then(function (response) {
            const result = new APIResult(response.status, response.statusText)
            if (response.data) {
                if (response.data.status == 203) {
                    sessionStorage.removeItem("API_TOKEN")
                    sessionStorage.removeItem("API_USERID")
                }
                result.code = response.data.status
                result.msg = response.data.message
                result.data = response.data.data
            }
            if (complete) {
                complete(result)
            }
        }).catch(function (error) {
            if (complete) {
                const result = new APIResult(-1001, error)
                complete(result)
            }
        })
    }

    // 获取通知消息
    static fetchHomeNotice(complete: APIComplete) {
        this.post("/index/getNotice", null, complete)
    }

    // 获取最近玩家开盒记录
    static fetchHomeHistoryList(size: number, complete: APIComplete) {
        this.post("/index/getBoxOpenRecord", { size }, complete)
    }

    // 获取首页banner图片列表
    static fetchHomeBannerList(complete: APIComplete) {
        this.post("/index/getListBannerMobile", null, complete)
    }

    // 获取首页盲盒列表
    static fetchHomeBoxList(complete: APIComplete) {
        this.post("/index/ListBoxZone", null, complete)
    }

    // 获取在线统计数据
    static fetchStatisticalData(complete: APIComplete) {
        this.post("/index/getNumTotal", null, complete)
    }

    // 注册
    static register(data: any, complete: APIComplete) {
        this.post("/login/register", data, complete)
    }

    // 账号密码登录
    static login(data: any, complete: APIComplete) {
        this.post("/login/doLogin", data, complete)
    }

    // 用户信息
    static fetchUserInfo(complete: APIComplete) {
        this.post("/user/getUserInfo", null, complete)
    }

    // 用户详情
    static fetchUserDetail(complete: APIComplete) {
        this.post("/user/getUser", null, complete)
    }

    // 盲盒详情
    static fetchBlindBoxDetail(id: number, complete: APIComplete) {
        this.post("/openBox/getBoxData", { id }, complete)
    }

    // 盲盒最近掉落
    static fetchBlindBoxHistory(id: number, size: number, complete: APIComplete) {
        this.post("/openBox/getDropList", { id, size }, complete)
    }

    // ROLL列表
    static fetchRollList(type: string, status: number, keyword: string, pageNum: number, pageSize: number, complete: APIComplete) {
        let data = { sign: type, status: status, name: keyword, pager: { pageNo: pageNum, pageSize } }
        this.post("/roll/listData", data, complete)
    }
}