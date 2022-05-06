package com.springsecurity.controller;

import com.springsecurity.pojo.SysUser;
import com.springsecurity.utils.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


/**
 * @author zhr_java@163.com
 * @date 2022/5/4 13:44
 */
@RestController
public class LoginController {

  @Autowired
  @Qualifier("jwtUserDetailsService")
  private UserDetailsService userDetailsService;

  @Autowired
  private JwtTokenUtil jwtTokenUtil;

  @PostMapping("/login")
  public String login(@RequestBody SysUser sysUser){
    final UserDetails userDetails = userDetailsService.loadUserByUsername(sysUser.getUsername());
    final String token = jwtTokenUtil.generateToken(userDetails);
    return token;
  }

  @PostMapping("haha")
  public String haha(){
    return "haha:";
  }
}


