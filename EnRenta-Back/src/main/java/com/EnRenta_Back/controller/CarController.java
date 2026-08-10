package com.EnRenta_Back.controller;

import com.EnRenta_Back.dto.CarDTO;
import com.EnRenta_Back.entity.Car;
import com.EnRenta_Back.exception.ResourceNotFoundException;
import com.EnRenta_Back.repository.ICarRepository;
import com.EnRenta_Back.service.ICarService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
@CrossOrigin(origins = "*")
public class CarController {

    final private ICarService carService;

    @Autowired
    public CarController(ICarService carService) {
        this.carService = carService;
    }

    //Endpoint GET random
    @GetMapping("/random")
    public ResponseEntity<List<CarDTO>> findRandomCars() {
        return ResponseEntity.ok(carService.findRandomCars());
    }

    //Endpoint GET all
    @GetMapping("/modelos")
    public ResponseEntity<List<CarDTO>> findAll() {
        return ResponseEntity.ok(carService.findAll());
    }

    //Endpoint GET name
    @GetMapping(params = "carName")
    public ResponseEntity<CarDTO> findByCarName(@RequestParam String carName) {
        Optional<CarDTO> carDTO = carService.findByCarName(carName);
        return carDTO.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //Endpoint GET por id
    @GetMapping("/{id}")
    public ResponseEntity<CarDTO> findById(@PathVariable Long id) {
        CarDTO carDTO = carService.findById(id);
        //IF lo encuantra devuelve el get ELSE devuelve notFound
        return ResponseEntity.ok(carDTO);
    }

    //Endpoint POST
    @PostMapping
    public ResponseEntity<CarDTO> save(@RequestBody CarDTO carDTO) {
        CarDTO saved = carService.save(carDTO);
        return ResponseEntity.status(201).body(saved);
    }

    //Endpoint PUT
    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> update(@RequestBody CarDTO carDTO, @PathVariable Long id) {
        carDTO.setId(id);
        CarDTO updatedCar = carService.update(carDTO);

        return ResponseEntity.ok(updatedCar);
    }

    //Endpoint DELETE
    @DeleteMapping("{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        carService.delete(id);
        return ResponseEntity.noContent().build();
    }





}
