package com.dairyfarm.controller;

import java.io.IOException;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dairyfarm.dto.BankDetailDto;
import com.dairyfarm.dto.FeedRecordDto;
import com.dairyfarm.dto.MilkRecordsDto;
import com.dairyfarm.entity.MilkRecord;
import com.dairyfarm.exception.ResourceNotFoundException;
import com.dairyfarm.service.FarmerService;
import com.dairyfarm.service.PdfService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/api/farmer")
@CrossOrigin("*")
public class FarmerController {
	
	@Autowired
	private FarmerService farmerService;
	@Autowired
	private PdfService pdfService;
	
	// ADD MILK RECORD
	@PostMapping("/addRecord")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> addMilkRecord(@RequestBody MilkRecordsDto milkRecordsDto) throws IOException, MessagingException{
		Boolean milkRecord = farmerService.addMilkRecord(milkRecordsDto);
		return new ResponseEntity<>("Record Added Successfully",HttpStatus.CREATED);
	}
	
	
	//GET ALL MILK RECORD
	@GetMapping("/allRecord")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> allMilkRecord(){
		List<MilkRecordsDto> allMilkRecord = farmerService.getAllMilkRecord();
		if(CollectionUtils.isEmpty(allMilkRecord)) {
//			return ResponseEntity.noContent().build();
			return new ResponseEntity<>("Records Not Available",HttpStatus.NO_CONTENT);
		}
		return ResponseEntity.ok(allMilkRecord);
	}
	//GET MILK RECORD BY ID

	 @GetMapping("/{farmerId}")
	 @PreAuthorize("hasRole('Admin')")
	    public ResponseEntity<?> getMilkRecordsByFarmerId(@PathVariable Integer farmerId) {
		 List<MilkRecordsDto> milkRecordsByFarmerId = farmerService.getMilkRecordsByFarmerId(farmerId);
		 if(CollectionUtils.isEmpty(milkRecordsByFarmerId)) {
			 return new ResponseEntity<>("Records Not Available",HttpStatus.NO_CONTENT);
		 }
		 return ResponseEntity.ok(milkRecordsByFarmerId);
	    }
	
	//ADD FEED RECORD
	@PostMapping("/addFeed")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> addFeedRecord(@RequestBody FeedRecordDto feedRecordDto){
		Boolean feedRecord = farmerService.addFeedRecord(feedRecordDto);
		return new ResponseEntity<>("Record Added Successfully",HttpStatus.CREATED);
	}
	
	
	//GET ALL FEED RECORD
	@GetMapping("/allFeedRecord")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> allFeedRecord(){
		List<FeedRecordDto> allFeedRecord = farmerService.getAllFeedRecord();
		if(CollectionUtils.isEmpty(allFeedRecord)) {
//			return ResponseEntity.noContent().build();
			return new ResponseEntity<>("Records Not Available",HttpStatus.NO_CONTENT);
		}
		return ResponseEntity.ok(allFeedRecord);
	}

	@PostMapping("/addBankDetail")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> addBankDetail(@RequestBody BankDetailDto bankDetailDto){
		Boolean bankDetail = farmerService.addBankDetail(bankDetailDto);
		return new ResponseEntity<>("Record Added Successfully",HttpStatus.CREATED);
	}
	
	//GET FARMER NAME BY ID
	@GetMapping("/getFarmerName/{farmerId}")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<String> getFarmerNameById(@PathVariable Integer farmerId){
		String farmerName = farmerService.getFarmerNameById(farmerId);

        if (farmerName.equals("Invalid Id")) {
        	
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Farmer ID not found");
        } else if (farmerName.equals("Not a Farmer")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The given ID does not belong to a farmer");
        } 

        return ResponseEntity.ok(farmerName); 
	}
	
	
	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> deleteUserById(@PathVariable Integer id){
		return ResponseEntity.ok(farmerService.deleteMilkRecordById(id));
	}

	
//	@GetMapping("/report")
//	@PreAuthorize("hasAnyRole('Admin','Farmer')")
//	public ResponseEntity<?> downloadOrderReport(){
//		byte[] orderReport = pdfService.generateOrderReport();
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=order_report.pdf")
//				.contentType(MediaType.APPLICATION_PDF)
//				.body(orderReport);
//	}
	
//	@GetMapping("/record/report")
//	@PreAuthorize("hasRole('Admin')")
//	public ResponseEntity<?> downloadReport() throws IOException{
//		byte[] report = pdfService.generateReport();
//		return ResponseEntity.ok()
//				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=milk_report.pdf")
//				.contentType(MediaType.APPLICATION_PDF)
//				.body(report);
//	}
	
	@GetMapping("/report/{farmerId}")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<byte[]> generatePdfReport(@PathVariable Integer farmerId) throws IOException {
	    byte[] pdfBytes = pdfService.generateReport(farmerId);

	    if (pdfBytes != null) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_PDF);
	        headers.setContentDispositionFormData("attachment", "report_farmer_" + farmerId + ".pdf"); // Suggest filename
	        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // Or appropriate error handling
	    }
	}
}
