package com.mongodbstudy.service;

import com.mongodbstudy.pojo.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

/**
 * @author zhr_java@163.com
 * @date 2022/4/29 10:56
 */
@Service
public class UserService {

  @Autowired
  private MongoTemplate mongoTemple;

  Logger logger = LoggerFactory.getLogger(UserService.class);

  /**
   * 条件获取集合内容
   * @param name
   * @return
   */
  public User getUserByName(String name) {
    // 查询数据先从MongoDB中查询
    Query query = new Query(Criteria.where("name").is(name));
    User user = mongoTemple.findOne(query, User.class);
    // 缓存中没该条记录
    if (user == null) {
      logger.info("从数据库查询数据");
      // 假设news1从数据库中查询
      user = new User(name,  "男", "180");
      mongoTemple.insert(user, "user");
      logger.info("数据插入到MongoDB成功");
    } else {
      logger.info("数据从缓存访问成功");
    }
    return user;
  }

  /**
   * 条件删除
   */
  public void deleteUser(String name) {
    Query query = new Query(Criteria.where("name").is(name));
    mongoTemple.remove(query,"user");
    logger.info("数据从缓存删除成功");
  }



  /**
   * 条件更新
   */
  public void updateUser(String name) {
    Query query = new Query(Criteria.where("name").is(name));
    Update update = new Update();
    update.set("name",name);
    update.set("sex","女");
    update.set("tall","170");
    mongoTemple.upsert(query,update,"user");
  }


}
