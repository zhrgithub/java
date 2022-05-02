package com.redistransactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhr_java@163.com
 * @date 2022/5/2 10:16
 */
@RestController
@RequestMapping("redis")
public class RedisController {

    @Autowired
    private  RedisTemplate redisTemplate;


    @GetMapping("insertByTransactional")
    public void transactional(){
        SessionCallback sessionCallback = new SessionCallback() {
            @Override
            public Object execute(RedisOperations redisOperations) throws DataAccessException {
                redisOperations.multi();
                // TODO: 命令1
                redisTemplate.opsForValue().set("zhangsan",25);
                // TODO: 命令2
                redisTemplate.opsForValue().set("lisi",26);
                return redisOperations.exec();
            }
        };

        redisTemplate.execute(sessionCallback);

        Integer age = (Integer) redisTemplate.opsForValue().get("lisi");
    System.out.println(age);
    }




}
