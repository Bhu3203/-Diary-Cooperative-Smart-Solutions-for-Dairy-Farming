package com.dairyfarm.service;

import java.io.IOException;
import java.util.List;

import com.dairyfarm.dto.BankDetailDto;
import com.dairyfarm.dto.FeedRecordDto;
import com.dairyfarm.dto.MilkRecordsDto;
import com.dairyfarm.entity.MilkRecord;
import com.dairyfarm.entity.User;

import jakarta.mail.MessagingException;

public interface IFarmerService {
Boolean addMilkRecord(MilkRecordsDto milkRecordsDto) throws IOException, MessagingException;

List<MilkRecordsDto> getAllMilkRecord();

List<MilkRecordsDto> getMilkRecordsByFarmerId(Integer farmerId);

Boolean addFeedRecord(FeedRecordDto feedRecordDto);

List<FeedRecordDto> getAllFeedRecord();

Boolean addBankDetail(BankDetailDto bankDetailDto);

String getFarmerNameById(Integer farmemerId);

String deleteMilkRecordById(Integer id);
}
