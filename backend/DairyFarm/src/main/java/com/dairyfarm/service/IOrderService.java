package com.dairyfarm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.dairyfarm.dto.OrderRequset;
import com.dairyfarm.dto.OrderResponse;

public interface IOrderService {

	
	Boolean createOrder(OrderRequset orderDto);
	List<OrderResponse> getAllOrders();

	
	Boolean updateOrderById(Integer id, OrderRequset orderDto);
}
