 package com.tomatosystem.app.cmn.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.tomatosystem.core.constants.Alert;
import com.tomatosystem.core.exception.AppWorksException;
import com.tomatosystem.core.service.AbstractService;
import com.tomatosystem.core.util.StringUtil;

@Service
public class CmnCodeService extends AbstractService {	
	
	public List<Map<String, Object>> selectCmnCodeList(String strCdCls, String strLocale) throws Exception {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		mapParam.put("strLocale", strLocale);
		mapParam.put("CD_CLS", strCdCls);
		
		return selectCmnCodeList(mapParam, strLocale);
	}
	
	
	public List<Map<String, Object>> selectCmnCodeList(String strCdCls, String strUseYn, String strLocale) throws Exception {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		mapParam.put("strLocale", strLocale);
		mapParam.put("CD_CLS", strCdCls);
		if(strUseYn != null && !"".equals(StringUtil.fixNull(strUseYn))){
			mapParam.put("USE_YN", "Y");
		}
		
		return selectCmnCodeList(mapParam, strLocale);
	}
	
	
	public List<Map<String, Object>> selectCmnCodeList(Map<String, Object> mapParam, String strLocale) throws Exception {
		mapParam.put("strLocale", strLocale);
		
		return dao.selectList("cmn-base01.selectTstComCdForCombo", mapParam);
	}
	
	public List<Map<String, Object>> selectCmnCodeClsList(String[] arrCdCls, String strLocale) throws Exception {
		Map<String, Object> mapParam = new HashMap<String, Object>();
		mapParam.put("strLocale", strLocale);
		mapParam.put("USE_YN", "Y");
		
		List<String> listCdCls = new ArrayList<String>();
		for(int i=0, len=arrCdCls.length; i<len; i++){
			listCdCls.add(arrCdCls[i]);
		}
		mapParam.put("listCdCls", listCdCls);
		
		return dao.selectList("cmn-base01.selectCmnCodeClsList", mapParam);
	}
	
	
	
	public List<Map<String, Object>> selectCmnCodeListForManage(Map<String, String> mapParam) throws Exception {
		return dao.selectList("cmn-base01.selectTstComCdMainList", mapParam);
	}
	
	
	public List<Map<String, Object>> selectCmnCodeListForSearch(Map<String, String> mapParam) throws Exception {
		return dao.selectList("cmn-base01.selectCmnCodeListForSearch", mapParam);
	}

	
	public Map<String, Object> selectCmnCode(Map<String, Object> mapParam) throws Exception {
		if("".equals(StringUtil.fixNull(mapParam.get("USE_YN")))){
			mapParam.put("USE_YN", "Y");
		}
		
		return dao.selectOne("cmn-base01.selectCmnCodeList", mapParam);
	}

	
	public int insertCmnCode(Map<String, String> mapIns) throws Exception {
		//return dao.insert("cmn-tables01.insertCmn0101", mapIns);
		return dao.insert("cmn-base01.insertTstComCd", mapIns);
	}

	
	public int updateCmnCode(Map<String, String> mapUpd) throws Exception {
		if("".equals(mapUpd.get("PRT_ORD"))){
			mapUpd.put("PRT_ORD", null);
		}
		
		//return dao.update("cmn-tables01.updateCmn0101", mapUpd);
		return dao.update("cmn-base01.updateTstComCd", mapUpd);
	}

	
	public int deleteCmnCode(Map<String, String> mapDel) throws Exception {
		//return dao.delete("cmn-tables01.deleteCmn0101", mapDel);
		return dao.delete("cmn-base01.deleteTstComCd", mapDel);
	}

	public void saveCmnCodeMst(DataRequest DataRequest) throws Exception {
		ParameterGroup dsMst = DataRequest.getParameterGroup("dsMst");
		Iterator<ParameterRow> insertedRowsMst = dsMst.getInsertedRows();
		Iterator<ParameterRow> updatedRowsMst = dsMst.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsMst = dsMst.getDeletedRows();
	
		Map<String, String> delMap = null;
		Map<String, String> insMap = null;
		Map<String, String> updMap = null;
		
		
		Map<String, String> mapParam = new HashMap<String, String>();
		List result = null;
		//1. 마스터 DELETE
		while(deletedRowsMst.hasNext()){
			delMap = deletedRowsMst.next().toMap();

			//디테일 데이터 전체 삭제
			mapParam.clear();
			mapParam.put("CD_CLS", StringUtil.fixNull(delMap.get("CD")));
			result = this.selectCmnCodeListForManage(mapParam);
			if(result != null && result.size() > 0){
				//하위에 상세코드 내역이 존재하여 삭제가 불가합니다.
				throw new AppWorksException("CMN003.CMN@CMN053", delMap.get("CD_NM"));
			}
			
			this.deleteCmnCode(delMap);
		}
		//2. 마스터 INSERT
		while(insertedRowsMst.hasNext()){
			insMap = insertedRowsMst.next().toMap();
			
			this.insertCmnCode(insMap);
		}
		//3. 마스터 UPDATE
		while(updatedRowsMst.hasNext()){
			this.updateCmnCode(updatedRowsMst.next().toMap());
		}		
	}

	public void saveCmnCodeDtl(DataRequest DataRequest) throws Exception {
		ParameterGroup dsMst = DataRequest.getParameterGroup("dsDtl");
		Iterator<ParameterRow> insertedRowsDtl = dsMst.getInsertedRows();
		Iterator<ParameterRow> updatedRowsDtl = dsMst.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsDtl = dsMst.getDeletedRows();
	
		Map<String, String> delMap = null;
		Map<String, String> insMap = null;
		Map<String, String> updMap = null;
		
		//1. 디테일 DELETE
		while(deletedRowsDtl.hasNext()){
			this.deleteCmnCode(deletedRowsDtl.next().toMap());
		}
		//2. 디테일 INSERT
		Map<String, String> mstRow = null;
		while(insertedRowsDtl.hasNext()){
			insMap = insertedRowsDtl.next().toMap();
			this.insertCmnCode(insMap);
		}
		//3. 디테일 UPDATE
		while(updatedRowsDtl.hasNext()){
			this.updateCmnCode(updatedRowsDtl.next().toMap());
		}
	}
	
	public void saveCmnCode(DataRequest DataRequest) throws Exception {
		//마스터 데이터셋
		ParameterGroup dsMst = DataRequest.getParameterGroup("dsMst");
		Iterator<ParameterRow> insertedRowsMst = dsMst.getInsertedRows();
		Iterator<ParameterRow> updatedRowsMst = dsMst.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsMst = dsMst.getDeletedRows();
		
		//디테일 데이터셋
		ParameterGroup dsDtl = DataRequest.getParameterGroup("dsDtl");
		Iterator<ParameterRow> insertedRowsDtl = dsDtl.getInsertedRows();
		Iterator<ParameterRow> updatedRowsDtl = dsDtl.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsDtl = dsDtl.getDeletedRows();
		
		Map<String, String> delMap = null;
		Map<String, String> insMap = null;
		Map<String, String> updMap = null;
		//1. 디테일 데이터 삭제
		while(deletedRowsDtl.hasNext()){
			this.deleteCmnCode(deletedRowsDtl.next().toMap());
		}
		
		//2. 마스터 데이터 삭제
		Map<String, String> mapParam = new HashMap<String, String>();
		List result = null;
		while(deletedRowsMst.hasNext()){
			delMap = deletedRowsMst.next().toMap();

			//디테일 데이터 전체 삭제
			mapParam.clear();
			mapParam.put("CD_CLS", StringUtil.fixNull(delMap.get("CD")));
			result = this.selectCmnCodeListForManage(mapParam);
			if(result != null && result.size() > 0){
				//하위에 상세코드 내역이 존재하여 삭제가 불가합니다.
				throw new AppWorksException("CMN003.CMN@CMN053", delMap.get("CD_NM"));
			}
			
			this.deleteCmnCode(delMap);
		}
		
		//3. 마스터 INSERT
		while(insertedRowsMst.hasNext()){
			insMap = insertedRowsMst.next().toMap();
			
			this.insertCmnCode(insMap);
		}
		//4. 마스터 UPDATE
		while(updatedRowsMst.hasNext()){
			this.updateCmnCode(updatedRowsMst.next().toMap());
		}
		
		//5. 디테일 INSERT
		Map<String, String> mstRow = null;
		while(insertedRowsDtl.hasNext()){
			insMap = insertedRowsDtl.next().toMap();
			this.insertCmnCode(insMap);
		}
		//6. 디테일 UPDATE
		while(updatedRowsDtl.hasNext()){
			this.updateCmnCode(updatedRowsDtl.next().toMap());
		}
	}
	
	
	public void saveCmnCodeTest(DataRequest DataRequest) throws Exception {
		//마스터 데이터셋
		ParameterGroup dsMst = DataRequest.getParameterGroup("dsMst");
		Iterator<ParameterRow> insertedRowsMst = dsMst.getInsertedRows();
		Iterator<ParameterRow> updatedRowsMst = dsMst.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsMst = dsMst.getDeletedRows();
		
		//디테일 데이터셋
		ParameterGroup dsDtl = DataRequest.getParameterGroup("dsDtl");
		Iterator<ParameterRow> insertedRowsDtl = dsDtl.getInsertedRows();
		Iterator<ParameterRow> updatedRowsDtl = dsDtl.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsDtl = dsDtl.getDeletedRows();

		//1. 디테일 데이터 삭제
		while(deletedRowsDtl.hasNext()){
			this.deleteCmnCode(deletedRowsDtl.next().toMap());
		}
		//2. 마스터 데이터 삭제
		while(deletedRowsMst.hasNext()){
			this.deleteCmnCode(deletedRowsMst.next().toMap());
		}
		
		//3. 마스터 INSERT
		while(insertedRowsMst.hasNext()){
			this.insertCmnCode(insertedRowsMst.next().toMap());
		}
		//4. 마스터 UPDATE
		while(updatedRowsMst.hasNext()){
			this.updateCmnCode(updatedRowsMst.next().toMap());
		}
		
		//5. 디테일 INSERT
		while(insertedRowsDtl.hasNext()){
			this.insertCmnCode(insertedRowsDtl.next().toMap());
		}
		//6. 디테일 UPDATE
		while(updatedRowsDtl.hasNext()){
			this.updateCmnCode(updatedRowsDtl.next().toMap());
		}
	}
	
	
	public void saveCmnCodeDetail(DataRequest DataRequest) throws Exception {
		
		//디테일 데이터셋
		ParameterGroup dsDtl = DataRequest.getParameterGroup("dsDtl");
		Iterator<ParameterRow> insertedRowsDtl = dsDtl.getInsertedRows();
		Iterator<ParameterRow> updatedRowsDtl = dsDtl.getUpdatedRows();
		Iterator<ParameterRow> deletedRowsDtl = dsDtl.getDeletedRows();

		//1. 디테일 데이터 삭제
		while(deletedRowsDtl.hasNext()){
			Map<String, String> mapDel = new HashMap<String, String>();
			mapDel = deletedRowsDtl.next().toMap();
			// 1.교직 체크 
			// 2.테이블에 표시과목코드[UTE001],자격종별코드[UTE002] 존재여부 체크
			// (UTE0101,UTE2101,UTE2303,UTE3101,UTE3102,UTE3103,UTE3104,UTE3301)
			String strUnitSysRcd = mapDel.get("UNIT_SYS_RCD");
			String strCdCls = mapDel.get("CD_CLS");
			if("CMN003.UTE".equals(strUnitSysRcd)){// 교직
				
				if("UTE001".equals(strCdCls)){ 			//표시과목
					mapDel.put("TYPL_SUBJ_RCD", mapDel.get("CD"));
				}else if("UTE002".equals(strCdCls)){	//자격종별코드
					mapDel.put("QCC_RCD", mapDel.get("CD"));	
				}
				
				Map<String,Object> mapElecMst = dao.selectOne("ute-base01.chkCodeYn" , mapDel);
				if("UTE001".equals(strCdCls)){	//표시과목
					if(!"0".equals(mapElecMst.get("A_COUNT")) || !"0".equals(mapElecMst.get("B_COUNT")) || !"0".equals(mapElecMst.get("C_COUNT")) || !"0".equals(mapElecMst.get("F_COUNT")) ||!"0".equals(mapElecMst.get("G_COUNT"))
					  ){
						throw new AppWorksException("CMN003.UTE@UTE022", Alert.WARN);
					}
				}else if("UTE002".equals(strCdCls)){	//자격종별코드
					if(!"0".equals(mapElecMst.get("A_COUNT")) || !"0".equals(mapElecMst.get("B_COUNT")) || !"0".equals(mapElecMst.get("D_COUNT")) || !"0".equals(mapElecMst.get("E_COUNT")) || !"0".equals(mapElecMst.get("F_COUNT")) || !"0".equals(mapElecMst.get("G_COUNT"))
					  ){
						throw new AppWorksException("CMN003.UTE@UTE022", Alert.WARN);
					}
				}
			}
			
			this.deleteCmnCode(mapDel);
		}
		//5. 디테일 INSERT
		while(insertedRowsDtl.hasNext()){
			this.insertCmnCode(insertedRowsDtl.next().toMap());
		}
		//6. 디테일 UPDATE
		while(updatedRowsDtl.hasNext()){
			this.updateCmnCode(updatedRowsDtl.next().toMap());
		}
	}

	
	public void deleteCmnCodeDtl(Map<String, String> mapDel) throws Exception {
		dao.delete("cmn-base01.deleteCmnCodeDtl", mapDel);
	}

	
	public String selectCmnCodeNm(String strCd) throws Exception {
		Map<String, String> mapParam = new HashMap<String, String>();
		mapParam.put("CD", strCd);
		
		return dao.selectOne("cmn-base01.selectCmnCodeNm", mapParam);
	}

	
	public List<Map<String, Object>> selectCmnCodeBizList(Map<String, String> param) throws Exception {
		return dao.selectList("cmn-base01.selectCmnCodeBizList", param);
	}

	
	public String selectCmnCodeInfo(String strCd, String strType) throws Exception {
		Map<String, String> mapParam = new HashMap<String, String>();
		mapParam.put("CD", strCd);
		mapParam.put("TYPE", strType);
		return dao.selectOne("cmn-base01.selectCmnCodeInfo", mapParam);
	}

	
	public List<Map<String, Object>> selectCmnCodeAllList(Map<String, Object> mapParam, String strLocale) throws Exception {
		mapParam.put("strLocale", strLocale);
		
		return dao.selectList("cmn-base01.selectCmnCodeAllList", mapParam);
	}
	
	
	/*
	 * 강석민
	 * 이력사항
	 * 2020. 2. 14. 최초작성
	 */
	@Deprecated public  List<Map<String, Object>> selCmnCodeList2(Map mapParam) throws Exception {
		if(mapParam != null && !mapParam.containsKey("ORDER_BY")){
			mapParam.put("ORDER_BY", "TO_NUMBER(PRT_ORD), CD");
		}
		return dao.selectList("cmn-base01.selCmnCodeList", mapParam);
	}
	/*
	 * 강석민
	 * 이력사항
	 * 2020. 2. 14. 최초작성
	 */	
	public List<Map<String, Object>> selCmnCodeList(Map mapParam) throws Exception {
		
		if(mapParam != null && !mapParam.containsKey("ORDER_BY")){
			mapParam.put("ORDER_BY", "TO_NUMBER(PRT_ORD), CD");
		}
		
		mapParam.put("USE_YN", "Y");
		
		return dao.selectList("cmn-base01.selCmnCodeListForCombo", mapParam);
	}
	
}