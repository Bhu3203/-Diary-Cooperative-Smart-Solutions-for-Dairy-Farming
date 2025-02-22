//package com.dairyfarm.dao;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import com.dairyfarm.entity.Product;
//
//public interface ProductRepository extends JpaRepository<Product, Integer>{
//	List<Product> findByCategoryId(Integer categoryId);
//	List<Product> findAllByIsDeletedFalse(); 
//}
