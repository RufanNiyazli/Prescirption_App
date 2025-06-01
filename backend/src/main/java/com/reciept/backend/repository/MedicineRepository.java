package com.reciept.backend.repository;

import com.reciept.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    @Query("SELECT m FROM Medicine m WHERE " +
            "LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Medicine> searchByNameOrCategory(@Param("keyword") String keyword);

}
