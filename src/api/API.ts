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
axios.defaults.baseURL = "https://m.95skins.com/api"
axios.defaults.timeout = 10000

export class API {
    private static post(url: string, data?: any, complete?: APIComplete) {
        const token = sessionStorage.getItem("API_TOKEN")
        axios.defaults.headers["Authorization"] = token
        axios.post(url,data).then(function (response) {
            console.log(response)
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
        this.post("/index/getBoxOpenRecord", {size}, complete)
    }

    // 获取首页banner图片列表
    static fetchHomeBannerList(complete: APIComplete) {
        this.post("/index/getListBannerMobile", null, complete)
    }

    // 获取首页盲盒列表
    static fetchHomeBoxList(complete: APIComplete) {
        this.post("/index/ListBoxZone", null, complete)
    }
}