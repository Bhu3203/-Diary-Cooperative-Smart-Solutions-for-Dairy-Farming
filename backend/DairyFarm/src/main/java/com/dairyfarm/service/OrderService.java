package com.dairyfarm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.dairyfarm.dao.OrderRepository;
import com.dairyfarm.dao.UserRepository;
import com.dairyfarm.dto.OrderRequset;
import com.dairyfarm.dto.OrderResponse;
import com.dairyfarm.dto.UserDto;
import com.dairyfarm.entity.Order;
import com.dairyfarm.entity.OrderStatus;
import com.dairyfarm.entity.User;
import com.dairyfarm.exception.ResourceNotFoundException;
import com.dairyfarm.util.LoggedUsersId;
@Service
public class OrderService implements IOrderService {
	@Autowired
	private ModelMapper  mapper;
	@Autowired
	private OrderRepository orderRepo;
	@Autowired
	private LoggedUsersId loggedUsers;
	@Autowired
	private UserRepository userRepo;

	@Override
	public Boolean createOrder(OrderRequset orderDto) {
		Order newOrder = mapper.map(orderDto, Order.class);
		newOrder.setStatus(OrderStatus.PLACED);
//		newOrder.setUserId(loggedUsers.getLoggedInUser());
		Order savedOrder=orderRepo.save(newOrder);
		if(!ObjectUtils.isEmpty(savedOrder)) {
			return true;
		}else {
			
			return false;
		}
	}

	@Override
	public List<OrderResponse> getAllOrders() {
		List<Order> orders = orderRepo.findAll();
		List<OrderResponse> orderResponses=new ArrayList<>();
		for(Order order: orders) {
			 User user = userRepo.findById(order.getCreatedBy()).orElseThrow(()-> new ResourceNotFoundException(null));
			 UserDto userDto=mapper.map(user, UserDto.class);
			 orderResponses.add(
					 OrderResponse.builder()
					 .orderId(order.getId())
					 .amount(order.getAmount())
					 .status(order.getStatus())
					 .user(userDto)
					 .build()
					 );
			 
		}
		return orderResponses;
	}

	@Override
	public Boolean updateOrderById(Integer id, OrderRequset updatedOrderDto) {
		Order foundOrder = orderRepo.findById(id).orElseThrow(()-> new ResourceNotFoundException("Order not found of id: "+id));
		Double amount =foundOrder.getAmount();
		foundOrder.setStatus(updatedOrderDto.getStatus());
		foundOrder.setAmount(amount);
		Order updateOrder= orderRepo.save(foundOrder);
		if(!ObjectUtils.isEmpty(updateOrder)) {
			return true;
		}else {
			
			return false;
		}
	}

}
