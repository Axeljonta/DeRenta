package com.EnRenta_Back.service.implement;

import com.EnRenta_Back.dto.CarDTO;
import com.EnRenta_Back.dto.CarImageDTO;
import com.EnRenta_Back.entity.Car;
import com.EnRenta_Back.entity.CarImages;
import com.EnRenta_Back.mapper.CarMapper;
import com.EnRenta_Back.repository.ICarRepository;
import com.EnRenta_Back.service.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class CarServiceImpl implements ICarService {

    @Autowired
    private final ICarRepository carRepository;
    private final CarMapper carMapper;

    public CarServiceImpl(ICarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }




    @Override
    public CarDTO findById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        return carMapper.toDTO(car);
    }

    @Override
    public Optional<CarDTO> findByCarName(String carName) {
        return carRepository.findByCarName(carName)
                .map(car -> carMapper.toDTO(car));
    }

    @Override
    public List<CarDTO> findRandomCars() {
        List<Car> cars = carRepository.findRandomCars();
        return cars.stream()
                .map(carMapper::toDTO)
                .toList();
    }

    @Override
    public List<CarDTO> findAll() {
        List<Car> cars = carRepository.findAll();
        return cars.stream()
                .map(carMapper::toDTO)
                .toList();
    }


    @Override
    public CarDTO save(@RequestBody CarDTO carDTO) {

        // 1. Convertimos DTO → Entity
        Car car = carMapper.toEntity(carDTO);

        // 2.Establecer la relación bidireccional con las imágenes
        if (car.getCarImages() != null) {
            car.getCarImages().forEach(image -> image.setCar(car));
        }

        // 3. Guardamos en la base de datos
        Car savedCar = carRepository.save(car);

        // 4. Devolvemos el DTO con los datos guardados (incluyendo ID generado)
        return carMapper.toDTO(savedCar);
    }


    @Override
    public CarDTO update(CarDTO carDTO) {
        return null;
    }

    @Override
    public void delete(Long id) {
        carRepository.deleteById(id);
    }




}
