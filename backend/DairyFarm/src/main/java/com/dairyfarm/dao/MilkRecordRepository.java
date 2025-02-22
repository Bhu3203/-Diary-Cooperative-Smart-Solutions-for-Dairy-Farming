package com.dairyfarm.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.dto.MilkRecordsDto;
import com.dairyfarm.entity.MilkRecord;
import com.dairyfarm.entity.User;

public interface MilkRecordRepository extends JpaRepository<MilkRecord, Integer> {
	List<MilkRecord> findByUser(User user);
	
}
