package com.dairyfarm.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.dairyfarm.dao.CustomerMilkRecordRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.CustomerMilkRecordDto;
import com.dairyfarm.dto.EmailRequest;

import com.dairyfarm.dto.UserDto;
import com.dairyfarm.entity.CustMilkRecord;

import com.dairyfarm.entity.User;
import com.dairyfarm.exception.ResourceNotFoundException;

import jakarta.mail.MessagingException;
@Service
public class CustomerService implements ICustomerService {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CustomerMilkRecordRepository custMilkRecordRepo;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private EmailService emailService;

	@Override
	public Boolean addMilkRecord(CustomerMilkRecordDto custMilkRecordDto) throws IOException, MessagingException {
		Integer customerId=custMilkRecordDto.getCustomerId();
		User user = userRepo.findById(customerId).orElseThrow(()-> new ResourceNotFoundException(null));
		CustMilkRecord milkRecord= mapper.map(custMilkRecordDto, CustMilkRecord.class);
		milkRecord.setUser(user);
		CustMilkRecord save = custMilkRecordRepo.save(milkRecord);
		if(!ObjectUtils.isEmpty(save)) {
			mail(save);
			return true;
		}
		return false;
	}
private void mail(CustMilkRecord savedRecord) throws UnsupportedEncodingException, MessagingException {
	    
	    String msg = "<html>"
	            + "<body>"
	            + "<h2>Hello, [[fname]]!</h2>"
	            + "<p>We have successfully recorded your milk entry. Here are the details:</p>"
	            + "<table border='1' style='border-collapse: collapse; width: 100%;'>"
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>Cattle</th><td style='padding: 8px;'>[[cattle]]</td></tr>"
	            
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>Milk Quantity</th><td style='padding: 8px;'>[[litre]] Litres</td></tr>"

	            + "</table>"
	            + "<br>"
	            + "<p>Thank you. Keep Buying quality milk!</p>"
	            + "<p>Best Regards,<br>Dairy Farm Team</p>"
	            + "</body>"
	            + "</html>";

	    msg = msg.replace("[[fname]]", savedRecord.getUser().getFirstName());
	    msg = msg.replace("[[cattle]]", savedRecord.getCattle());
	    msg = msg.replace("[[litre]]", savedRecord.getLitre().toString());


	    EmailRequest emailRequest = EmailRequest.builder()
	            .to(savedRecord.getUser().getEmail())
	            .subject("Sadguru Dairy Farming") 
	            .title("Milk Details") 
	            .message(msg)
	            .build();

	    emailService.sendMail(emailRequest);
	}
	@Override
	public String getCustomerNameById(Integer customerId) {
		Optional<User> userId = userRepo.findById(customerId);
		if(userId.isPresent()) {
			User customer=userId.get();
			boolean isCustomer= customer.getRoles().stream()
					.anyMatch(role->role.getName().equalsIgnoreCase("Customer"));
			if(isCustomer) {
				return customer.getFirstName();
			}
		}
		return "Invalid Id";
	}
	
	
	private CustomerMilkRecordDto convertCustMilkRecordToMilkRedordDto(CustMilkRecord milkRecord) {
		Optional<User> userId = userRepo.findById(milkRecord.getUser().getId());
		User user = userId.get();
		UserDto userDto= mapper.map(user, UserDto.class);
		return  CustomerMilkRecordDto.builder()
				.id(milkRecord.getId())
				.CustomerId(user.getId())
				.CustomerName(user.getFirstName())
				.time(milkRecord.getTime())
				.cattle(milkRecord.getCattle())
				.litre(milkRecord.getLitre())
				.date(milkRecord.getDate())
				.build();
	}
	@Override
	public List<CustomerMilkRecordDto> getAllMilkRecord() {
		List<CustMilkRecord> allMilkRecord = custMilkRecordRepo.findAll();
		return allMilkRecord.stream().map(milkRecord -> convertCustMilkRecordToMilkRedordDto(milkRecord)).toList();
	}
	

}
