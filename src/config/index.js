const domain = {
    school: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/',
        test: 'https://rrj.bestwang.cn/mp/school/',
        production: 'https://cms.gzrrj.com/mp/school/'
    },
    company: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/',
        test: 'https://rrj.bestwang.cn/mp/company/',
        production: 'https://cms.gzrrj.com/mp/company/'
    },
    shop: {
        develop: 'http://yapi.demo.qunar.com/mock/11228/shop/',
        test: 'https://rrj.bestwang.cn/mp/shop/',
        production: 'https://cms.gzrrj.com/mp/shop/'
    }
}

const system = 'school'       // 使用商城系统时 ../src/main.js  pages参数需要修改为商城首页入口
const env = 'production'

const config = {
    // 环境配置
    system,
    env,
    domain: domain[system][env]
}

export default config