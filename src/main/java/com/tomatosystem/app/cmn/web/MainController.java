package com.tomatosystem.app.cmn.web;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;


@Controller
@RequestMapping("/Main")
public class MainController {
	
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@RequestMapping("/onLoad.do")
	public View onLoad(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		
		
      ServletContext context = request.getServletContext();
      InputStream in = null;
      in = context.getResourceAsStream("menuTemplate.json");
      
      JSONParser jsonParser = new JSONParser();
      JSONObject jsonObject = (JSONObject)jsonParser.parse(
      	      new InputStreamReader(in, "UTF-8"));
      
      Map userinfo = (HashMap) jsonObject.get("dmUserInfo");
      List<Map<String, Object>> authorities = (List) jsonObject.get("dsAllMenu");
      
      Map globalConfig = (HashMap) jsonObject.get("dmGlobalConfig");
      
      dataRequest.setResponse("dmUserInfo", userinfo);
      dataRequest.setResponse("dsAllMenu", authorities);
      dataRequest.setResponse("dmGlobalConfig", globalConfig);
	
      return new JSONDataView();
	}
	
}
