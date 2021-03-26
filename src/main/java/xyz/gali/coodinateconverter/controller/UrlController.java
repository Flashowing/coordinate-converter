package xyz.gali.coodinateconverter.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class UrlController {

    @RequestMapping("pick")
    public String pickPositionMap(){
        return "./example/pickPositionOnMap.html";
    }
}
