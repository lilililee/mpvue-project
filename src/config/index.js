const config = {
    // 环境配置
    env: 'develop',
    developDomain: 'http://yapi.demo.qunar.com/mock/11228/',
    productionDomain: 'ss',

}

export default {
    ...config,
    domain: config.env == 'develop' ? config.developDomain : config.productionDomain
}