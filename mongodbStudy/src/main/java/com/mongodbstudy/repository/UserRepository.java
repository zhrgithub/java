package com.mongodbstudy.repository;

import com.mongodbstudy.pojo.User;
import org.springframework.data.mongodb.repository.MongoRepository;


/**
 * @author zhr_java@163.com
 * @date 2022/4/29 12:54
 * @Description("通过仓储模型来实现数据的持久化")
 */
public interface UserRepository extends MongoRepository<User, Integer> {

    //todo
}
