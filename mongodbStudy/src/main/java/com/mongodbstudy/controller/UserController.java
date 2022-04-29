package com.mongodbstudy.controller;

import com.mongodbstudy.pojo.User;
import com.mongodbstudy.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zhr_java@163.com
 * @date 2022/4/29 10:54
 */
@RestController
@RequestMapping("user")
public class UserController {

  Logger logger = LoggerFactory.getLogger(getClass());

  @Autowired
  private UserService userService;

  @GetMapping("/get_user")
  public User getUser(String name) {
    return userService.getUserByName(name);
  }

  @GetMapping("/update_user")
  public Integer updateUser(String name) {
    try {
      userService.updateUser(name);
      return 1;
    } catch (Exception e) {
      return 0;
    }
  }
  @GetMapping("/del_user")
  public Integer deleteUser(String name) {
    try {
      userService.deleteUser(name);
      return 1;
    }catch (Exception e){
      return 0;
    }
  }




}
