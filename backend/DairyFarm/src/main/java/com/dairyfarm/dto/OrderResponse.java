package com.dairyfarm.dto;

import com.dairyfarm.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

	private Integer orderId;
	
	private Double amount;
	
	private OrderStatus status;
	
	private UserDto user;
}
