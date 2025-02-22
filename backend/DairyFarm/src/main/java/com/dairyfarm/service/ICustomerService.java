package com.dairyfarm.service;

import java.io.IOException;
import java.util.List;

import com.dairyfarm.dto.CustomerMilkRecordDto;

import jakarta.mail.MessagingException;

public interface ICustomerService {

	Boolean addMilkRecord(CustomerMilkRecordDto custMilkRecordDto ) throws IOException, MessagingException;
	
	List<CustomerMilkRecordDto> getAllMilkRecord();
	
	String getCustomerNameById(Integer customerId);
}
