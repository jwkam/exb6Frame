package com.tomatosystem.core.context;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class StaticSpringApplicationContext implements ApplicationContextAware {
	private static ApplicationContext CONTEXT;

	public void setApplicationContext(ApplicationContext context) throws BeansException {
		CONTEXT = context;
	}

	public static Object getBean(String name) {
		return CONTEXT.getBean(name);
	}

	public static Object getBean(String name, Class clazz) {
		return CONTEXT.getBean(name, clazz);
	}

	public static <T> T getBean(Class<T> requiredType) {
		return CONTEXT.getBean(requiredType);
	}
}