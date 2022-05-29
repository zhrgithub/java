package com.springstudy.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:03
 */
@Aspect
@Component
public class UserAccessAop {

  @Autowired
  private RedisTemplate redisTemplate;

  @Pointcut("@annotation(com.springstudy.aop.UserAccess)")
  public void access() {}

  @Before("access()")
  public void doBefore(JoinPoint joinPoint) {
    System.out.println("second before");
  }

  @Around("@annotation(userAccess)")
  public Object accessAround(ProceedingJoinPoint proceedingJoinPoint, UserAccess userAccess){
    try {
      System.out.println("方法设置注解的值："+userAccess.desc());
      ServletRequestAttributes requestAttributes =
              (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
      String ip = requestAttributes.getRequest().getRemoteHost();

      //判断用户的ip是否是属于国内
      //TODO
      //可以将用户的ip和每秒请求的次数放入Redis中，如果当前用户每秒请求次数超过5次，请求频繁，请稍后重试！！；
      if(redisTemplate.hasKey(ip)){
        redisTemplate.opsForValue().set(ip,(int)redisTemplate.boundValueOps(ip).get()+1,1, TimeUnit.SECONDS);
      }else {
        redisTemplate.opsForValue().set(ip,1,1, TimeUnit.SECONDS);
      }
      if ((int)redisTemplate.boundValueOps(ip).get()>3){
        String str = "请求频繁，请稍后重试！！";
        proceedingJoinPoint =  new MyProceedingJoinPoint(str);
        return proceedingJoinPoint.proceed();
      }
      return proceedingJoinPoint.proceed();
    }catch (Throwable e){
      e.printStackTrace();
      return null;
    }
  }
}
