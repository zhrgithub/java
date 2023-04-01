package com.example.rongyunserver.controller;

import com.example.rongyunserver.dto.NewInfo;
import com.example.rongyunserver.service.NewInfoService;
import com.example.rongyunserver.utils.R;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController("newInfoController")
@RequestMapping("/newinfo")
@CrossOrigin
public class NewInfoController {


    @Autowired
    private NewInfoService newInfoService;


    /**
     * 新增、修改
     *
     * @param requestObject
     * @return
     * @throws Exception
     */
    @PostMapping("addOrUpdate")
    public R addOrUpdateOrDel(@RequestBody Map<String, Object> requestObject) throws Exception {


        //0表示新增，1表示修改
        Object obj = requestObject.get("newInfo");
        ObjectMapper objectMapper = new ObjectMapper();
        NewInfo newInfo = objectMapper.convertValue(obj, NewInfo.class);

        if (ObjectUtils.isEmpty(newInfo)) {
            return R.error();
        }
        NewInfo newInfoByData = newInfoService.getInfoById(newInfo.getClientId());
        if (ObjectUtils.isEmpty(newInfoByData)) {
            return R.success().setData("status", newInfoService.add(newInfo));
        } else {
            return R.success().setData("status", newInfoService.modify(newInfo));
        }
    }

    //查询列表
    @PostMapping("findList")
    public R findList() {
        return R.success().setData("newInfoList", newInfoService.getNewInfoList());
    }


}
