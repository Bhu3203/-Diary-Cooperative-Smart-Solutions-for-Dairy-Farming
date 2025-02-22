package com.dairyfarm.dto;

import com.dairyfarm.entity.OrderStatus;
import com.dairyfarm.entity.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderRequset {

	
private Integer id;
	
	
//	private User userId;
	private Double amount;
	
	private OrderStatus status;
}
