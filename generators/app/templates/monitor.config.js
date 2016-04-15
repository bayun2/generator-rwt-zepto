module.exports = {
    port: 80, //监听80端口
    proxy_pass: [ //代理转发规则
        {
            server_name: 'dev.forexmaster.cn test.forexmaster.cn prod.forexmaster.cn',
            rewrite: [
                {
                    rule: /assets\/fdt\/discover\/.*\/(.*).js/,
                    target: 'http://127.0.0.1:8000/dist/$1.js' //转发到静态服务所在的8000端口
                },
                {
                    rule: /assets\/fdt\/discover\/.*\/(.*).css/,
                    target: 'http://127.0.0.1:8000/dist/$1.css' //转发到静态服务所在的8000端口
                }
            ]
        }
    ]
}
