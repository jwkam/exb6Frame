package com.tomatosystem.app.tst.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.spring.JSONDataView;
import com.tomatosystem.app.tst.service.TstGridGridService;

	
@Controller
@RequestMapping("/TstGridGrid")
public class TstGridGridController {
	
	@Autowired
	private TstGridGridService tstGridGridService;
	
	
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
	
	@RequestMapping("/listMst.do")
	public View listMst(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		//요청 파라메터 셋팅
		return new JSONDataView();
	}
	
	@RequestMapping("/listDtl.do")
	public View listDtl(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		return new JSONDataView();
	}
	
	@RequestMapping("/saveMst.do")
	public View saveMst(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		
		
		return new JSONDataView();
	}
	
	@RequestMapping("/saveDtl.do")
	public View saveDtl(HttpServletRequest request, HttpServletResponse response, DataRequest dataRequest) throws Exception {
		
		return new JSONDataView();
	}
}
