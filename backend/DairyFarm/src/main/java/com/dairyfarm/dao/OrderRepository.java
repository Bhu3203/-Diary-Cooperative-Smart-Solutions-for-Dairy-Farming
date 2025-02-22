package com.dairyfarm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

}
