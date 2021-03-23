package com.tomatosystem.exbuilder.web;

import java.io.IOException;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.View;

import com.cleopatra.spring.UIView;
import com.cleopatra.ui.PageGenerator;

/**
 * 
 * CleopatraUIController.java
 * 
 * @Description   clx 초기화
 *                        - clx 파일을 호출했을 때 실행되는 서블릿 또는 컨트롤러에서 RuntimeLibFilter 및 RuntimeCSSFilter 를 이용하여 
 *                          선택적으로 초기 라이브러리를 전달할수있음.
 * @author tomatosystem
 * @since 2020. 10. 7.
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *   
 *   수정일             수정자             수정내용
 *    -------        ---------------       --------------
 *   2020. 10. 7.        tomatosystem       최초 생성
 *
 * </pre>
 */
@Controller
public class CleopatraUIController {

	@PostConstruct
	private void initPageGenerator() {
		PageGenerator instance = PageGenerator.getInstance();
		instance.setURLSuffix(".clx");
	}

	@RequestMapping("/**/*.clx")
	public View index(HttpServletRequest request, HttpServletResponse response) throws IOException {
		return new UIView();
	}
}
