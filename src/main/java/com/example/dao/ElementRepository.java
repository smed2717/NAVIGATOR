package com.example.dao;

import java.util.List;


import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.entities.Element;





public interface ElementRepository  extends JpaRepository<Element,Long> {
	List<Element> findAll();

	
	 @Query("SELECT r FROM Element r where r.assetassocie = :assetassocie") 
	 List<Element> findByAssetassocie(@Param("assetassocie") String assetassocie);
	 
	 @Query("SELECT r FROM Element r where r.asset = :asset") 
	 Element findByAsset(@Param("asset") String asset);

	  @Query("DELETE  FROM Element r where r.asset = :asset")
	  boolean deleteByasset(String asset);
	  
	  @Query("SELECT r.id_asset FROM Element r where r.asset = ?1") 
	  Long findByID(String asset);
/*
	  @Query("UPDATE  Element r SET assetassocie=? where r.asset = :asset")
	  void update(long asset);
*/
/*
	    @Modifying
	    @Query("UPDATE Company c SET c.address = :address WHERE c.id = :companyId")
	    int updateAddress(@Param("companyId") int companyId, @Param("address") String address);
*/
	@Transactional
	  @Modifying
	  @Query("UPDATE Element e SET e.assetassocie =:assetassocie, e.asset= :asset WHERE e.id_asset = :id_asset")
	  int  update(@Param("id_asset") Long id_asset, @Param("asset") String asset,@Param("assetassocie") String assetassocie);

	  @Query("SELECT id_asset,asset,files FROM Element where (assetassocie = null) order by id_asset desc ")
	  List<Element> findLimited(Pageable pageable);


	

	

}
