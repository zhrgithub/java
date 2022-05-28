package com.atguigu.gmall.controller;

import com.alibaba.dubbo.config.ApplicationConfig;
import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.config.RegistryConfig;
import com.alibaba.dubbo.rpc.RpcContext;
import com.atguigu.gmall.service.UserService;

import java.util.List;

/**
 * @author zhr_java@163.com
 * @date 2022/5/28 15:52
 */
public class TestMain {

  public static void main(String[] args) {
    // 当前应用配置
    ApplicationConfig application = new ApplicationConfig();
    application.setName("dongshidaddy-consumer");
    application.setOwner("dongshidaddy");

    // 绕过 注册中心配置
    RegistryConfig registry = new RegistryConfig();
    //registry.setAddress("zookeeper://192.168.10.119:2181");
    registry.setAddress("N/A");
    //RpcContext.getContext().setAttachment("token","123456789");

    // 注意：ReferenceConfig为重对象，内部封装了与注册中心的连接，以及与服务提供方的连接

    // 引用远程服务
    ReferenceConfig<UserService> reference =
        new ReferenceConfig<UserService>(); // 此实例很重，封装了与注册中心的连接以及与提供者的连接，请自行缓存，否则可能造成内存和连接泄漏
    reference.setApplication(application);
    reference.setRegistry(registry); // 多个注册中心可以用setRegistries()
    reference.setInterface(UserService.class);
    reference.setUrl("dubbo://127.0.0.1:20880");

    // 和本地bean一样使用xxxService
    UserService myProviderTokenService = reference.get(); // 注意：此代理对象内部封装了所有通讯细节，对象较重，请缓存复用
    List s = myProviderTokenService.getUserAddressList("001");
    System.out.println(s);
  }
}
