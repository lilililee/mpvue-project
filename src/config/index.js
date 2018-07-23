const domain = {
    school: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/',
        test: 'https://rrj.bestwang.cn/mp/school/',
        production: ''
    },
    company: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/',
        test: 'https://rrj.bestwang.cn/mp/company/',
        production: ''
    },
    shop: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/shop/',
        test: 'https://rrj.bestwang.cn/mp/company/',
        production: ''
    }
}

const system = 'company'
const env = 'develop'

const config = {
    // 环境配置
    system,
    env,
    domain: domain[system][env]
}

export default config