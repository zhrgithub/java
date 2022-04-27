package com.springstudy.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

/**
 * @author zhr_java@163.com
 * @date 2022/4/27 15:03
 */
@Aspect
@Component
public class UserAccessAop {

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
      return proceedingJoinPoint.proceed();
    }catch (Throwable e){
      e.printStackTrace();
      return null;
    }
  }
}
