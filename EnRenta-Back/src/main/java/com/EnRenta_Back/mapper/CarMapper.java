package com.EnRenta_Back.mapper;

import com.EnRenta_Back.dto.CarDTO;
import com.EnRenta_Back.dto.CarImageDTO;
import com.EnRenta_Back.entity.Car;
import com.EnRenta_Back.entity.CarImages;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CarMapper {
    //mapeo Entity DTO
     @Mapping(source = "carImages", target = "images")
     @Mapping(target = "mainImageUrl", expression = "java(getMainImageUrl(car))")
     CarDTO toDTO(Car car);

     //mapeo DTO Entity
     @Mapping(source = "images", target = "carImages")
     @Mapping(target = "id", ignore = true)
     Car toEntity(CarDTO carDTO);

    // Mapeo de imágenes
    CarImageDTO toImageDTO(CarImages carImages);

    List<CarImageDTO> toImageDTOList(List<CarImages> carImages);


    default String getMainImageUrl(Car car) {
        if (car.getCarImages() == null || car.getCarImages().isEmpty()) {
            return null;
        }

        return car.getCarImages().stream()
                .filter(img -> Boolean.TRUE.equals(img.getMainImage()))
                .map(CarImages::getImageUrl)
                .findFirst()
                .orElseGet(() -> car.getCarImages().get(0).getImageUrl());
    }
}

