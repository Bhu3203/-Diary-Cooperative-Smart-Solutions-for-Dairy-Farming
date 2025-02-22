package com.dairyfarm.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dairyfarm.dto.CattleDto;

public interface ICattleService {
CattleDto addCattle(CattleDto cattleDto, MultipartFile cattleImage) throws IOException;


List<CattleDto> allCattle();
}
