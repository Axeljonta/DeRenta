package com.EnRenta_Back.service.implement;

import com.EnRenta_Back.dto.UserRequestDTO;
import com.EnRenta_Back.dto.UserResponseDTO;
import com.EnRenta_Back.entity.Role;
import com.EnRenta_Back.entity.User;
import com.EnRenta_Back.mapper.UserMapper;
import com.EnRenta_Back.repository.IUserRepository;
import com.EnRenta_Back.service.IAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;


    @Override
    public UserResponseDTO register(UserRequestDTO request) {

        //Verificamos que el mail no este registrado
        if(userRepository.existsByEmail(request.getEmail())) {
            throw new UsernameNotFoundException("El email existe en el sistema");
        }

        //Encriptamos contraseña
        User newUser = userMapper.toEntity(request);

        newUser.setEmail(request.getEmail().toLowerCase().trim());
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setRole(Role.USER);

        User savedUser = userRepository.save(newUser);

        return userMapper.toDTO(savedUser);

    }
}
