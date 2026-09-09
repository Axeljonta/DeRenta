package com.EnRenta_Back.service;

import com.EnRenta_Back.dto.UserRequestDTO;
import com.EnRenta_Back.dto.UserResponseDTO;

public interface IAuthService {

    UserResponseDTO register(UserRequestDTO request);

}
