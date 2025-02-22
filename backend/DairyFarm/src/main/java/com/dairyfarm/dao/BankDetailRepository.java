package com.dairyfarm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.BankDetails;

public interface BankDetailRepository extends JpaRepository<BankDetails, Integer> {

}
