package com.dairyfarm.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.dairyfarm.entity.Cattle;

public interface CattleRepository extends JpaRepository<Cattle, Integer> {
    List<Cattle> findAllByIsDeletedFalse();
}