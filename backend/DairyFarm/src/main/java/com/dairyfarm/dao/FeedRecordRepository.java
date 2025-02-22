package com.dairyfarm.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dairyfarm.entity.FeedRecord;

public interface FeedRecordRepository extends JpaRepository<FeedRecord, Integer> {

}
