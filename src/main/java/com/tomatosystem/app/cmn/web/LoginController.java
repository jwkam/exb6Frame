package com.tomatosystem.app.cmn.web;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.tomatosystem.core.exception.AppWorksException;
import com.tomatosystem.core.resource.AppProperties;

@Controller
@RequestMapping("/Login")
public class LoginController {
	
	/**
	 * <pre>
	 * 메소드명	: login
	 * 설	 명	: 시스템 로그인 처리
	 * </pre>
	 *
	 * @author	: 
	 *
	 * 이력사항
	 * 
	 *
	 * @param request
	 * @param response
	 * @param reqData - 요청 파라메터
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/login.do")
	public View login(HttpServletRequest request, HttpServletResponse resp, DataRequest dataRequest) throws Exception {
		
		Map<String, Object> message = new HashMap<String, Object>();
		message.put("uri", AppProperties.getProperty("main.page.appid")); //로그인 AppId
		dataRequest.setMetadata(true, message);
		
		return new JSONDataView();
	}
	
	
	/**
	 * 
	 * <pre>
	 * 메소드명	: logout
	 * 설	 명	: 로그아웃을 한다.
	 * </pre>
	 *
	 * @param req
	 * @param resp
	 * @param dataView
	 * @param sqlClientAssists
	 * @param reqData
	 * @return
	 * @throws IOException
	 * @throws SQLException
	 * @throws StdServiceException
	 * @throws AppWorksException
	 */
	@RequestMapping("/logout.do")
	public View logout(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		Map<String, Object> message = new HashMap<String, Object>();
		HttpSession session = request.getSession(false);
		if(session != null) {
			session.invalidate();
		}
		message.put("uri", AppProperties.getProperty("login.page.appid")); //로그인 AppId
		
		dataRequest.setMetadata(true, message);
		
		return new JSONDataView();
	}
}
