package com.redisreactive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.core.ReactiveHashOperations;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import reactor.core.publisher.Mono;

/**
 * @author zhr
 */
@SpringBootApplication
public class RedisReactiveApplication implements ApplicationRunner{
    @Autowired
    private ReactiveRedisTemplate reactiveRedisTemplate;

    public static void main(String[] args) {

        SpringApplication.run(RedisReactiveApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        ReactiveHashOperations<String, String, String> hashOps = reactiveRedisTemplate.opsForHash();

        Mono mono1 = hashOps.put("apple","x","8000");
        mono1.subscribe(System.out::println);

        Mono mono2 = hashOps.put("apple","xr","9000");
        mono2.subscribe(System.out::println);

        Mono mono3  = hashOps.put("apple","xm","10000");
        mono3.subscribe(System.out::println);

    }

}
