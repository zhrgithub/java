package com.attributeAssignMent;

import java.util.Date;

/**
 * @author zhr_java@163.com
 * @date 2022/4/9 17:01
 */
public class Person {

    private String name;

    private String higher;

    private Integer age;

    private Date date;
    private Home home;

    @Override
    public String toString() {

        return "Person{" +
                "name='" + name + '\'' +
                ", higher='" + higher + '\'' +
                ", age=" + age +
                ", date=" + date +
                ", home=" + home +
                '}';
    }

    public Home getHome() {

        return home;
    }

    public void setHome(Home home) {

        this.home = home;
    }

    public Date getDate() {

        return date;
    }

    public void setDate(Date date) {

        this.date = date;
    }

    public Integer getAge() {

        return age;
    }

    public void setAge(Integer age) {

        this.age = age;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public String getHigher() {

        return higher;
    }

    public void setHigher(String higher) {

        this.higher = higher;
    }

}
