package com.dairyfarm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.CustMilkRecord;

public interface CustomerMilkRecordRepository extends JpaRepository<CustMilkRecord, Integer> {

}
