package com.springsecurity.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhr_java@163.com
 * @date 2022/5/5 18:08
 */
@RestController
@RequestMapping("/sysUser")
public class SysUserController {

  @GetMapping(value = "/test")
  public String test() {
    return "Hello Spring Security";
  }

  @PreAuthorize("hasAnyRole('ADMIN')")
  @PostMapping(value = "/testNeed")
  public String testNeed() {
    return "testNeed";
  }
}
