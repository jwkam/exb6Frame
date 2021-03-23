package com.tomatosystem.core.util;

import java.io.UnsupportedEncodingException;

public class StringUtil {
	/**
	 * 값이 Null인 경우 공백('') 문자열을 반환하고, Null이 아니면 해당 값을 반환한다.
	 * @param value
	 * @return
	 */
	public static String fixNull(Object value){
		if(value == null) return "";
		
		return value.toString().trim();
	}
	
	/**
	 * 해당 문자열이 Null이거나 공백('')인지 여부를 반환한다.
	 * @param value
	 * @return
	 */
	public static boolean isEmpty(Object value){
		return (value == null) ? true : ((String)value).length()==0;
	}
	
	private static final String EMPTY_STRING = "";

	public static String nullToEmpty(Object o) {
		return o == null ? "" : (String) o;
	}

	public static boolean isInteger(char c) {
		return c >= 48 && c <= 57;
	}

	public static boolean isNotNull(Object o) {
		return o != null;
	}

	public static boolean isNotNullEmpty(String s) {
		return s != null && s.length() > 0;
	}


	public static String doubleDigit(int number) {
		StringBuffer sb = new StringBuffer();
		if (number < 10) {
			sb.append('0');
			sb.append(number);
		} else {
			sb.append(number);
		}

		return sb.toString();
	}
	
	/**
	 * 문자열의 좌측(Left)을 특정 문자로 패딩한 값을 반환한다.
	 * @param str - 문자열
	 * @param size - 패딩 사이즈(Length)
	 * @param padChar - 패딩 문자
	 * @return
	 */
	public static String lPad(String str, int size, String padChar){
		byte[] b = str.getBytes();
		int len = b.length;
		int tmp = size - len;
		
		for (int i=0; i < tmp ; i++){
			str = padChar + str;
		}
		return str;
	}
	
	/**
	 * 문자열의 우측(Right)을 특정 문자로 패딩한 값을 반환한다.
	 * @param str - 문자열
	 * @param size - 패딩 사이즈(Length)
	 * @param padChar - 패딩 문자
	 * @return
	 */
	public static String rPad(String str, int size, String padChar){
		byte[] b = str.getBytes();
		int len = b.length;
		int tmp = size - len;
		
		for (int i=0; i < tmp ; i++){
			str += padChar;
		}
		return str;
	}
	
	/**
	 * 해당 인코딩의 문자열을 바이트 단위로 자른다.
	 * @param strTxt - 대상 문자열
	 * @param startIndex - 시작 인덱스
	 * @param endIndex - 끝 인덱스
	 * @param encoding - 문자열 인코딩
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public static String splitByteString(String strTxt, int startIndex, int endIndex, String encoding) throws UnsupportedEncodingException{
		StringBuffer buf = new StringBuffer();
		int len = 0;
		for(char ch : strTxt.toCharArray()){
			if(len >= startIndex && len<endIndex){
				buf.append(ch);
			}
			
			len += String.valueOf(ch).getBytes(encoding).length;
		}
		
		return buf.toString();
	}
}
