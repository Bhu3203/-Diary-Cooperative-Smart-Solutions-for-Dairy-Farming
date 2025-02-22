package com.dairyfarm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dairyfarm.dto.OrderRequset;
import com.dairyfarm.dto.OrderResponse;
import com.dairyfarm.service.IOrderService;
import com.dairyfarm.service.OrderService;
import com.dairyfarm.service.PdfService;

@RestController
@RequestMapping("/api/order")
public class OrderController {

	@Autowired
	private IOrderService orderService;
	
	@Autowired
	private PdfService pdfService;
	
	@PostMapping("/create")
	public ResponseEntity<?> addOrder(@RequestBody OrderRequset orderDto){
		Boolean isCreated = orderService.createOrder(orderDto);
		if(isCreated) {
			return new ResponseEntity<>("Order Placed Successfully!!",HttpStatus.CREATED);
		}
		else {
			return new ResponseEntity<>("failed to placed Order..",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PutMapping("/update/{id}")
	 public ResponseEntity<?> updateOrder(@PathVariable Integer id, @RequestBody OrderRequset orderDto){
		 Boolean updated = orderService.updateOrderById(id, orderDto);
		 if (updated) {
             return new ResponseEntity<>("Order Updated Successfully!!",HttpStatus.CREATED); // 200 OK
         } else {
        	 return new ResponseEntity<>("failed to Update Order..",HttpStatus.INTERNAL_SERVER_ERROR);
         }
	}
	
	@GetMapping("/getall")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> getAllOrders(){
		List<OrderResponse> allOrders = orderService.getAllOrders();
		if(CollectionUtils.isEmpty(allOrders)) {
			return new ResponseEntity<>("Orders Not available",HttpStatus.NO_CONTENT);
		}else {
			return new ResponseEntity<>(allOrders,HttpStatus.OK);
		}
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
}
