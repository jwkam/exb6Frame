package com.tomatosystem.app.tst.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.spring.JSONDataView;
import com.tomatosystem.app.tst.service.TstGridService;

	
@Controller
@RequestMapping("/TstGrid")
public class TstGridController {
	
	
	@Autowired
	private TstGridService tstGridService;
	
	
	/**
	 * 메소드명	: onLoad
	 * 설	 명	: 공통코드 및 화면초기화에 필요한 데이터 반환
	 *
	 * 이력사항
	 * 2018. 8. 16. 
	 *
	 * @param request
	 * @param response
	 * @param DataRequest
	 * @param authentication
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/onLoad.do")
	public View onLoad(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		
		return new JSONDataView();
	}
	
	@RequestMapping("/list.do")
	public View list(HttpServletRequest request, HttpServletResponse response, DataRequest requestData) throws Exception {
		//요청 파라메터 셋팅
		ParameterGroup param = requestData.getParameterGroup("dmParam");
		Map<String, Object> mapParam = new HashMap<String, Object>();
		mapParam.put("JOB", param.getValue("JOB"));
		mapParam.put("ENAME", param.getValue("ENAME"));
		List<Map<String, Object>> listCmnTmpReg = tstGridService.selectCmnTmpRegList(mapParam);
		requestData.setResponse("dsCmnTmpReg", listCmnTmpReg);
		return new JSONDataView();
	}
	
	@RequestMapping("/save.do")
	public View save(HttpServletRequest request, HttpServletResponse response, DataRequest requestData) throws Exception {
		
		tstGridService.saveCmnTmpReg(requestData);
		
		return new JSONDataView();
	}
}
