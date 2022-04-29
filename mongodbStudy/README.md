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
由于MongoDB是C++写的，底层在处理映射逻辑的时候有一个映射的方法 Void *ptr = mmp();通过mmp()函数返回一个指针ptr，ptr首先指向逻辑空间中的一个地址，
然后通过内存单元MMU把逻辑地址转化成物理地址，如果物理地址存在那么返回数据，如果物理地址不存在，那么会在虚拟内存中产生一个缺页中断，缺页中断中的中断响应函数会
在swap中寻找对应的页面，如果找不到，则会通过mmp()建立映射关系，从硬盘上面将文件读取到物理内存，拷贝过程中如果物理内存不足，
则会通过虚拟内存机制（swap）将暂时不用的物理页面交换到硬盘上

#优缺点:

#存储引擎介绍:
Mongodb3.2版本之后采用了wiredTiger 引擎，是按照b-tree的形式来组织的，进行了扩展，叶子节点存储了key 和 数据，
本质上磁盘存储的数据文件的是一种B+tree 结构 , 此B+tree 不同于MySQL 的b+tree , 主要是mysql 叶子节点之间用链表进行链接。
支持文档级别锁，对于大多数读写操作，WiredTiger使用乐观并发控制。即WiredTiger只在全局、数据库和集合级别使用意向锁。

#数据复制过程:

#内置MapReduce：
数据分析功能



