package com.dairyfarm.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dairyfarm.dto.CustomerMilkRecordDto;

import com.dairyfarm.service.CustomerService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin("*")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/add")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> addMilkRecord(@RequestBody CustomerMilkRecordDto custMilkRecordDto) throws IOException, MessagingException{
		Boolean milkRecord = customerService.addMilkRecord(custMilkRecordDto);
		return new ResponseEntity<>("Record Added Successfully",HttpStatus.CREATED);
	}
	
	@GetMapping("/allRecord")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?>allMilkRecord(){
		List<CustomerMilkRecordDto> allMilkRecord = customerService.getAllMilkRecord();
		if(CollectionUtils.isEmpty(allMilkRecord)) {
			return new ResponseEntity<>("Record Not Available",HttpStatus.NO_CONTENT);
		}
		return ResponseEntity.ok(allMilkRecord);
	}
	

	@GetMapping("/getCustomerName/{customerId}")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<String> getCustomerNameById(@PathVariable Integer customerId){
		String customerName = customerService.getCustomerNameById(customerId);
		
		if(customerName.equals("Invalid Id")) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer ID not found");
		}else if (customerName.equals("Not a Farmer")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The given ID does not belong to a customer");
		}
		return ResponseEntity.ok(customerName); 
	}
}
