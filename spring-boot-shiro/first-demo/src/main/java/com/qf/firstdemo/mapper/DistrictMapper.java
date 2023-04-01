package com.qf.firstdemo.mapper;

import com.qf.firstdemo.pojo.District;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 采用注解的形式使用mybatis只需要在yml文件中配置驼峰方式即可
 */
public interface DistrictMapper {

    @Select("select * from district")
    List<District> findAll();


    @Select("select * from district where id=#{id}")
    District findById(@Param("id") Integer id);

    @Delete("delete district where id = #{id}")
    District deleteById(@Param("id") Integer id);


    @Insert("insert district set name values #{name}")
    District insert(District district);

    @Update("update district set id,name values #{id},#{name}")
    District updateById(District district);
}
