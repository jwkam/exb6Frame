package com.tomatosystem.exbuilder.web;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cleopatra.export.CSVExporter;
import com.cleopatra.export.Exporter;
import com.cleopatra.export.ExporterFactory;
import com.cleopatra.export.ExporterFactory.EXPORTTYPE;
import com.cleopatra.export.source.DataSource;
import com.cleopatra.export.source.JSONDataSourceBuilder;
import com.cleopatra.export.target.HttpResponseOutputTarget;
import com.cleopatra.export.target.OutputTarget;
import com.tomatosystem.core.constants.Alert;
import com.tomatosystem.core.exception.AppWorksException;


@Controller
public class CleopatraFileExportController {
	@RequestMapping("/export/{fileName}.csv")
	public void exportCSV(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".csv";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		//사용자 세션이 없으면.. 엑셀 다운로드 불가토록...
		HttpSession session = request.getSession(false);
		if(session == null) {
			//사용자 세션이 존재 하지 않습니다.
			throw new AppWorksException("CMN003.CMN@CMN003", Alert.ERROR);
		}
				
		response.setContentType("text/csv;charset=utf-8");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, fileName, EXPORTTYPE.CSV);
	}
	
	@RequestMapping("/export/{fileName}.xls")
	public void exportXLS(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".xls";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		//사용자 세션이 없으면.. 엑셀 다운로드 불가토록...
		HttpSession session = request.getSession(false);
		if(session == null) {
			//사용자 세션이 존재 하지 않습니다.
//			throw new AppWorksException("CMN003.CMN@CMN003", Alert.ERROR);
		}
				
		response.setContentType("application/vnd.ms-excel");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		this.export(request, response, fileName, EXPORTTYPE.XLS);
	}
	
	@RequestMapping("/export/{fileName}.xlsx")
	public void exportXLSX(HttpServletRequest request, HttpServletResponse response, @PathVariable("fileName") String fileName) throws IOException {
		String downloadFileName = fileName + ".xlsx";
		downloadFileName = this.encodingDownloadFileName(request, downloadFileName);
		
		response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
		response.addHeader("Content-Disposition", "attachment;filename=\"" + downloadFileName + "\"");
		
		HttpSession session = request.getSession(false);
		//사용자 세션이 없으면.. 엑셀 다운로드 불가토록...
		if(session == null) {
			//사용자 세션이 존재 하지 않습니다.
//			throw new AppWorksException("CMN003.CMN@CMN003", Alert.ERROR);
		}
		
		this.export(request, response, fileName, EXPORTTYPE.SXLSX);
		
	}
	
	private void export(HttpServletRequest request, HttpServletResponse response, String fileName, EXPORTTYPE type) throws IOException {
		response.setCharacterEncoding("utf-8");
		String newFileName = URLDecoder.decode(fileName, "utf-8");
		DataSource dataSource = JSONDataSourceBuilder.build(request, newFileName);
		OutputTarget outputTarget = new HttpResponseOutputTarget(response);
		
		ExporterFactory exporterFactory = ExporterFactory.getInstance();
		Exporter exporter = exporterFactory.getExporter(type);
		
		if(type == EXPORTTYPE.CSV){
			((CSVExporter)exporter).setAutoWrap(false);
		}
		
		exporter.export(dataSource, outputTarget);
		
		response.flushBuffer();
	}
	
	private String encodingDownloadFileName(HttpServletRequest request, String downloadFileName) throws UnsupportedEncodingException {
		String userAgent = request.getHeader("User-Agent");
		
		if(userAgent.contains("MSIE") || userAgent.contains("Chrome") || (userAgent.contains("Windows") && userAgent.contains("Trident"))){
			downloadFileName = URLEncoder.encode(downloadFileName, "utf-8");
			downloadFileName = downloadFileName.replaceAll("\\+","%20");
        }
		
		return downloadFileName;
	}
}
