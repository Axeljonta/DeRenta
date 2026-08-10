package com.EnRenta_Back.repository;

import com.EnRenta_Back.dto.CarDTO;
import com.EnRenta_Back.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ICarRepository extends JpaRepository<Car,Long> {

    Optional<Car> findByCarName(String carName);

    @Query(value = "SELECT * FROM cars ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<Car> findRandomCars();

}
