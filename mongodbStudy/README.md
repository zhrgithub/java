# 工程简介
以springboot为基础创建mongoTemplate的增删改查demo
# 延伸阅读
接口文档：

根据名字获取用户信息： 

  URL：http://localhost:8080/user/get_user
  请求类型：GET
  请求参数：{"name":"zhangsan"}

根据名字更新用户信息：

    URL：http://localhost:8080/user/update_user
    请求类型：GET
    请求参数：{"name":"zhangsan"}


根据名字删除用户信息：

    URL：http://localhost:8080/user/del_user
    请求类型：GET
    请求参数：{"name":"zhangsan"}


#连接池设置使得性能调优：

#仓储模型实现增删改查:
定义接口并继承MongoDBRepository接口

#官方驱动：
mongo-starter

#存储什么数据：
 主要用来存储一些不确定性的数据对象、海量数据，例如：用户对象信息字段

#主从配置：
#索引类型:
#性能监控:
#GEO索引算法:
#映射机制:
#优缺点:

#存储引擎介绍:
Mongodb3.2版本之后采用了wiredTiger 引擎，是按照b-tree的形式来组织的，进行了扩展，叶子节点存储了key 和 数据，
本质上磁盘存储的数据文件的是一种B+tree 结构 , 此B+tree 不同于MySQL 的b+tree , 主要是mysql 叶子节点之间用链表进行链接。
支持文档级别锁，对于大多数读写操作，WiredTiger使用乐观并发控制。即WiredTiger只在全局、数据库和集合级别使用意向锁。

#数据复制过程:

#内置MapReduce：
数据分析功能



