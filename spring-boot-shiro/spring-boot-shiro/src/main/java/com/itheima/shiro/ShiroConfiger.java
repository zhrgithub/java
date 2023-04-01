package com.itheima.shiro;

import at.pollux.thymeleaf.shiro.dialect.ShiroDialect;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfiger {
    /**
     * 创建ShiroFilterFactoryBean
     * 相当于用户主体，和SecurityManager关联
     * Qualifier用于引入当前类中的Bean
     */
      @Bean
      public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("securityManager")DefaultWebSecurityManager defaultWebSecurityManager){
         System.out.println("进入用户主体");
          ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
          /**
           * 设置安全管理
           */
          shiroFilterFactoryBean.setSecurityManager(defaultWebSecurityManager);
          /**
           * 添加shiro内置过滤
           *    常用的过滤器：
           *       anon:无需认证（登录）即可访问
           *       authc:必须认证才可以访问
           *       user:如果使用rememberMe的功能才可以访问
           *       perms:该资源必须得到资源权限才可以访问
           *       role:该资源必须得到角色权限才可以访问
           */
          Map<String,String> filterMap = new LinkedHashMap<String,String>();

//          filterMap.put("/add","authc");
//          filterMap.put("/edit","authc");

          filterMap.put("/testThymeleaf","anon");//必须放在authc前面过滤
          filterMap.put("/login","anon");//必须放在authc前面过滤
          //filterMap.put("/findByName","anon");//必须放在authc前面过滤

          //授权过滤器
          //注意：当前授权拦截后，shiro会自动跳转到未授权页面
          filterMap.put("/add","perms[user:add]");//必须放在authc前面过滤
          filterMap.put("/edit","perms[user:edit]");//必须放在authc前面过滤
          filterMap.put("/*","authc");


          shiroFilterFactoryBean.setFilterChainDefinitionMap(filterMap);


          /**
           * 如果没有认证那么修改跳转的路径
           */
          shiroFilterFactoryBean.setLoginUrl("/toLogin");

          //设置未授权登录页面
          shiroFilterFactoryBean.setUnauthorizedUrl("/unAuth");
          return shiroFilterFactoryBean;
      }
    /**
     * 创建DefaultWebSecurityManager
     * 相当于数据授权
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("userRealm")UserRealm userRealm){
        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
        /**
         * 关联Realm
          */
        securityManager.setRealm(userRealm);
        return securityManager;
    }

    /**
     * 创建Realm
     * 映射认证和授权
     */
    @Bean(name = "userRealm")
    public UserRealm getUserRealm(){
        return new UserRealm();
    }


    /**
     * 配置ShiroDialect,用于thymeleaf和shiro的标签配合使用
     */
    @Bean
    public ShiroDialect getShiroDialect(){
        return new ShiroDialect();
    }

}
