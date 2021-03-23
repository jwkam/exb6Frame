 package com.tomatosystem.app.tst.service;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cleopatra.protocol.data.DataRequest;
import com.cleopatra.protocol.data.ParameterGroup;
import com.cleopatra.protocol.data.ParameterRow;
import com.tomatosystem.core.service.AbstractService;

@Service
public class TstGridGridService extends AbstractService  {
	
	public List<Map<String, Object>> selectCmnTmpRegList(Map<String, String> mapParam) throws Exception {
		return dao.selectList("tst-tmp01.selectCmnTmpRegList", mapParam);
	}

	
	public void saveCmnTmpReg(DataRequest DataRequest) throws Exception {
		ParameterGroup dsMessage = DataRequest.getParameterGroup("dsMst");
		Iterator<ParameterRow> insertedRows = dsMessage.getInsertedRows();
		Iterator<ParameterRow> updatedRows = dsMessage.getUpdatedRows();
		Iterator<ParameterRow> deletedRows = dsMessage.getDeletedRows();
		
		while(deletedRows.hasNext()){
			dao.delete("tst-tmp01.deleteCmnTmpReg", deletedRows.next().toMap());
		}
		
		while(insertedRows.hasNext()){
			dao.insert("tst-tmp01.insertCmnTmpReg", insertedRows.next().toMap());
		}
		
		while(updatedRows.hasNext()){
			dao.update("tst-tmp01.updateCmnTmpReg", updatedRows.next().toMap());
		}
	}
	
	public List<Map<String, Object>> selectCmnTmpRegFeeList(Map<String, String> mapParam) throws Exception {
		return dao.selectList("tst-tmp01.selectCmnTmpRegFeeList", mapParam);
	}
	
	public void saveCmnTmpRegFee(DataRequest dataRequest) throws Exception {
		ParameterGroup dsMessage = dataRequest.getParameterGroup("dsDetail");
		Iterator<ParameterRow> insertedRows = dsMessage.getInsertedRows();
		Iterator<ParameterRow> updatedRows = dsMessage.getUpdatedRows();
		Iterator<ParameterRow> deletedRows = dsMessage.getDeletedRows();
		
		while(deletedRows.hasNext()){
			dao.delete("tst-tmp01.deleteCmnTmpRegFee", deletedRows.next().toMap());
		}
		
		while(insertedRows.hasNext()){
			dao.insert("tst-tmp01.insertCmnTmpRegFee", insertedRows.next().toMap());
		}
		
		while(updatedRows.hasNext()){
			dao.update("tst-tmp01.updateCmnTmpRegFee", updatedRows.next().toMap());
		}
	}
}