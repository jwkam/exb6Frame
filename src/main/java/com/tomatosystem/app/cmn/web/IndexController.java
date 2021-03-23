package com.tomatosystem.app.cmn.web;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.XBConfig;
import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.UIView;
import com.tomatosystem.core.resource.AppProperties;


@Controller
public class IndexController {
	@RequestMapping("/index.do")
	public View index(HttpServletRequest request, HttpServletResponse response, 
			DataRequest reqData, 
			Authentication authentication) throws IOException {
		//디바이스 정보
		//Device device = DeviceUtils.getCurrentDevice(request); 
		List<String> pathList = XBConfig.getInstance().getDeployPath(); //eXbuilder6 deploy path
		String deployPath = pathList.get(0);
		
		String loginPageUrl = deployPath+"/"; //로그인 페이지 URL
		String mainPageUrl = deployPath+"/";   //메인 페이지 URL
		
		loginPageUrl += AppProperties.getProperty("login.page.appid")+".clx";
		mainPageUrl += AppProperties.getProperty("main.page.appid")+".clx";
		
		if(authentication == null) {
			return new UIView(mainPageUrl);
		}else{
			return new UIView(mainPageUrl);
		}
	}

}
