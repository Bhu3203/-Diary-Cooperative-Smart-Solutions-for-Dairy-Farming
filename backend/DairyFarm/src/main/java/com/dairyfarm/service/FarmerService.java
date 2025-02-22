package com.dairyfarm.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.catalina.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.dairyfarm.dao.BankDetailRepository;
import com.dairyfarm.dao.FeedRecordRepository;
import com.dairyfarm.dao.MilkRecordRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.BankDetailDto;
import com.dairyfarm.dto.EmailRequest;
import com.dairyfarm.dto.FeedRecordDto;
import com.dairyfarm.dto.MilkRecordsDto;
import com.dairyfarm.dto.UserDto;
import com.dairyfarm.entity.BankDetails;
import com.dairyfarm.entity.FeedRecord;
import com.dairyfarm.entity.MilkRecord;
import com.dairyfarm.entity.User;
import com.dairyfarm.exception.ResourceNotFoundException;
import com.dairyfarm.util.LoggedUsersId;

import jakarta.mail.MessagingException;

@Service
public class FarmerService implements IFarmerService{

	@Autowired
	private UserRepository userRepo;
	@Autowired
	private MilkRecordRepository milkRecordRepo;
	@Autowired
	private FeedRecordRepository feedRecordRepo;
	@Autowired
	private BankDetailRepository bankDetailRepo;
	@Autowired
	private ModelMapper mapper;
	
	@Autowired
	private EmailService emailService;
	
private MilkRecord savedRecord;
	
	//TO ADD MILK RECORD	
@Override
public Boolean addMilkRecord(MilkRecordsDto milkRecordsDto) throws IOException, MessagingException {
	Integer farmerId = milkRecordsDto.getFarmerId();
	User user = userRepo.findById(farmerId).orElseThrow(()-> new ResourceNotFoundException(null));
	
    MilkRecord milkRecord = mapper.map(milkRecordsDto, MilkRecord.class);
    
    milkRecord.setUser(user);
     savedRecord = milkRecordRepo.save(milkRecord);
    
    if (!ObjectUtils.isEmpty(savedRecord)) {
        mail(savedRecord);
        return true;
    }

    return false;  
}
	private void mail(MilkRecord savedRecord) throws UnsupportedEncodingException, MessagingException {
	    
	    String msg = "<html>"
	            + "<body>"
	            + "<h2>Hello, [[fname]]!</h2>"
	            + "<p>We have successfully recorded your milk entry. Here are the details:</p>"
	            + "<table border='1' style='border-collapse: collapse; width: 100%;'>"
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>Cattle</th><td style='padding: 8px;'>[[cattle]]</td></tr>"
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>Fat Content</th><td style='padding: 8px;'>[[fat]]</td></tr>"
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>Milk Quantity</th><td style='padding: 8px;'>[[litre]] Litres</td></tr>"
	            + "    <tr><th style='padding: 8px; background-color: #f2f2f2;'>SNF</th><td style='padding: 8px;'>[[snf]]</td></tr>"
	            + "</table>"
	            + "<br>"
	            + "<p>Thank you for your contribution. Keep providing quality milk!</p>"
	            + "<p>Best Regards,<br>Dairy Farm Team</p>"
	            + "</body>"
	            + "</html>";

	    msg = msg.replace("[[fname]]", savedRecord.getUser().getFirstName());
	    msg = msg.replace("[[cattle]]", savedRecord.getCattle());
	    msg = msg.replace("[[fat]]", savedRecord.getFat().toString());
	    msg = msg.replace("[[litre]]", savedRecord.getLitre().toString());
	    msg = msg.replace("[[snf]]", savedRecord.getSnf().toString());

	    EmailRequest emailRequest = EmailRequest.builder()
	            .to(savedRecord.getUser().getEmail())
	            .subject("Sadguru Dairy Farming") 
	            .title("Milk Record Details") 
	            .message(msg)
	            .build();

	    emailService.sendMail(emailRequest);
	}
//  GET FARMER NAME BY ID
	@Override
	public String getFarmerNameById(Integer farmerId) {
	    Optional<User> userId = userRepo.findById(farmerId);

	    if (userId.isPresent()) {
	        User farmer = userId.get();
	        boolean isFarmer = farmer.getRoles().stream()
	                .anyMatch(role -> role.getName().equalsIgnoreCase("Farmer"));
	        if (isFarmer) {
	            return farmer.getFirstName();
	        } else {
	            return "Not a Farmer"; 
	        }
	    }
	    return "Invalid Id"; 
	}
	
	private MilkRecordsDto convertMilkRecordToMilkRedordDto(MilkRecord milkRecord) {
		Optional<User> userId = userRepo.findById(milkRecord.getUser().getId());
		User user=userId.get();
//		UserDto userDto = mapper.map(user, UserDto.class);
		return MilkRecordsDto.builder()
				.id(milkRecord.getId())
				.farmerId(user.getId())
				.farmerName(user.getFirstName())
				.time(milkRecord.getTime())
				.cattle(milkRecord.getCattle())
				.litre(milkRecord.getLitre())
				.fat(milkRecord.getFat())
				.snf(milkRecord.getSnf())
				.date(milkRecord.getDate())
				
				.build();
	}
	//TO GET ALL MILK RECORDS
	@Override
	public List<MilkRecordsDto> getAllMilkRecord() {
		List<MilkRecord> allMilkRecord = milkRecordRepo.findAll();
		return allMilkRecord.stream().map(milkRecord -> convertMilkRecordToMilkRedordDto(milkRecord)).toList();
	}
	
	@Override
	public List<MilkRecordsDto> getMilkRecordsByFarmerId(Integer id) {
	    User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found!!"));

	    if (user.getRoles().stream().anyMatch(role -> role.getName().equalsIgnoreCase("Farmer"))) {
	        List<MilkRecord> milkRecords = milkRecordRepo.findByUser(user); // Use the correct method

	        return milkRecords.stream()
	                .map(this::convertMilkRecordToMilkRedordDto)
	                .collect(Collectors.toList());
	    } else {
	        throw new ResourceNotFoundException("Farmer Not Exists");
	    }
	}
//	@Override
//	public List<MilkRecordsDto> getMilkRecordsByFarmerId(Integer id) {
////		Optional<User> userId = userRepo.findById(id);
////		User farmer = userId.get();
////		farmer.
//		
//		 List<MilkRecord> byFarmerId = milkRecordRepo.findByFarmerId(id);
//		 return byFarmerId.stream().map(milkRecord -> convertMilkRecordToMilkRedordDto(milkRecord)).toList();
////	    User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User Not Found!!"));
////
////	    if (user.getRoles().stream().anyMatch(role -> role.getName().equalsIgnoreCase("Farmer"))) { 
////	        List<MilkRecord> milkRecords = milkRecordRepo.findAll(); 
////
////	        return milkRecords.stream().map(milkRecord -> convertMilkRecordToMilkRedordDto(milkRecord)).toList();
////	    } else {
////	        throw new ResourceNotFoundException("Farmer Not Exists");
////	    }
//	}
//private List<MilkRecordsDto> convertMilkRecordToMilkRedordDto(List<MilkRecord> byFarmerId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
////	@Override
//	public List<MilkRecordsDto> getMilkRecordsByFarmerId(Integer id) {
//		
//		User user = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User Not Found!!"));
////		LoggedUsersId loggedUsersId = new LoggedUsersId();
////			Integer userId = loggedUsersId.getLoggedInUserId();
//			
//			if(user.getRoles().getFirst().getId().equals(2)){
//				List<MilkRecord> allMilkRecord = milkRecordRepo.findAll();
//	    		return allMilkRecord.stream().map(milkRecord -> convertMilkRecordToMilkRedordDto(milkRecord)).toList();
//			}
//			else {
//				throw  new ResourceNotFoundException("Farmer Not Exists");
//			}			
//		
//	}

	
	//TO ADD FEED RECORD
	@Override
	public Boolean addFeedRecord(FeedRecordDto feedRecordDto) {
		Integer farmerId = feedRecordDto.getFarmerId();
		User user = userRepo.findById(farmerId).orElseThrow(()-> new ResourceNotFoundException(null));
		
	
			FeedRecord feedRecord= mapper.map(feedRecordDto, FeedRecord.class);
			feedRecord.setUser(user);
			feedRecordRepo.save(feedRecord);
			return true;	
	}
	
	private FeedRecordDto convertFeedRecordToFeedRedordDto(FeedRecord feedRecord) {
		Optional<User> userId = userRepo.findById(feedRecord.getUser().getId());
		User user=userId.get();
		return FeedRecordDto.builder()
				.id(feedRecord.getId())
				.farmerId(user.getId())
				.farmerName(user.getFirstName())
				.feedName(feedRecord.getFeedName())
				.quantity(feedRecord.getQuantity())
				.supplierName(feedRecord.getSupplierName())
				.date(feedRecord.getDate())
				.build();
	}
	//TO GET ALL FEED RECORDS
	@Override
	public List<FeedRecordDto> getAllFeedRecord() {
		 List<FeedRecord> allFeedRecord = feedRecordRepo.findAll();
		return allFeedRecord.stream().map(feedRecord -> convertFeedRecordToFeedRedordDto(feedRecord)).toList();
	}
	
	//TO ADD BANK RECORD
	@Override
	public Boolean addBankDetail(BankDetailDto bankDetailDto) {
		Optional<User> farmerId = userRepo.findById(bankDetailDto.getUser().getId());
		if(farmerId.isPresent()) {
			User farmer=farmerId.get();			
			if(farmer.getRoles().getFirst().getId()==2) {
				BankDetails bankDetails= BankDetails.builder()
						.user(farmer)
						.accountHolderName(bankDetailDto.getAccountHolderName())
						.bankName(bankDetailDto.getBankName())
						.branchName(bankDetailDto.getBranchName())
						.accountNo(bankDetailDto.getAccountNo())
						.ifscNo(bankDetailDto.getIfscNo())
						.build();
				bankDetailRepo.save(bankDetails);
				return true;
			}
		}
		return false;
	}
	@Override
	public String deleteMilkRecordById(Integer id) {
		 MilkRecord record = milkRecordRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Record Not found for id : "+ id));
		record.setIsDeleted(true);
		milkRecordRepo.save(record);
	
		//		 Optional<User> userId = userRepo.findById(farmerId);
//		 User farmer= userId.get();
//		 farmer.setIsDeleted(true);
//		 farmer.setEmail(null);
//		 userRepo.save(farmer);
		return "User Deleted Successfully!!";
	}
	
//	@Override
//	public String deleteUserById(Integer id) {
//		User foundUser = userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("User Not found for id : "+ id));
//		//userRepo.delete(foundUser);
//		foundUser.setIsDeleted(true);
//		foundUser.setEmail(null);
//		userRepo.save(foundUser);
//		return "User deleted Succefully";
//	}


}









	


