# 工程简介
通过netty搭建千万级别并发量的websocket服务器
# 延伸阅读

接口文档，通过postman测试的即时通信

单发：
`URL：ws://127.0.0.1:8088/ws
请求参数：
        {
        "fromUser":10,
        "toUser":"20",
        "content":"hello world!"
        }`

群发：
`URL：ws://127.0.0.1:8088/ws
请求参数：
        {
        "fromUser":20,
        "content":"hi world!"
        }`