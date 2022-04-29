package com.mongodbstudy.pojo;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author zhr_java@163.com
 * @date 2022/4/28 21:10
 */
@Data
@Document(collection = "user")
public class User {

  public User() {}

  public User(String name, String sex, String tall) {

    this.name = name;
    this.sex = sex;
    this.tall = tall;
  }

  private String name;
  private String sex;
  private String tall;
}
