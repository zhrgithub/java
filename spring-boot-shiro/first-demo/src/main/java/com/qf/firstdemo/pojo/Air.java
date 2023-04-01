package com.qf.firstdemo.pojo;

import lombok.Data;

@Data
public class Air {

  private long id;
  private long districtId;
  private java.sql.Date monitorTime;
  private long pm10;
  private long pm25;
  private String moniteringStation;
  private java.sql.Date lastModifyTime;



}
