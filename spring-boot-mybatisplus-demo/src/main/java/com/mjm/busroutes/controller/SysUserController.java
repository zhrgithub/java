package com.mjm.busroutes.controller;

import com.mjm.busroutes.pojo.SysUser;
import com.mjm.busroutes.service.SysUserService;
import com.mjm.busroutes.util.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController("sysUserController")
@RequestMapping("sysUser/Management")
public class SysUserController {

    @Autowired
    private SysUserService sysUserService;

    @PostMapping("list")
    public R list(@RequestBody Map<String,Object> jsonObject){
        Integer currentPage = (Integer) jsonObject.get("current_page");
        Integer pageSize = (Integer) jsonObject.get("page_size");

        return sysUserService.findList(currentPage,pageSize);
    }
}
