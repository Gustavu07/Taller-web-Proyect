package com.example.sucursal.application.service;

import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.port.out.PersonalRepositoryPort;
import com.example.sucursal.application.port.out.SucursalRepositoryPort;
import com.example.sucursal.domain.model.Personal;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class PersonalService {

    private final PersonalRepositoryPort personalRepository;
    private final SucursalRepositoryPort sucursalRepository;

    public PersonalService(PersonalRepositoryPort personalRepository, SucursalRepositoryPort sucursalRepository) {
        this.personalRepository = personalRepository;
        this.sucursalRepository = sucursalRepository;
    }

    public List<PersonalDTO> getAll() {
        return personalRepository.getAll();
    }

    public PersonalDTO getById(Long id) {
        PersonalDTO dto = personalRepository.getById(id);
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + id);
        }
        return dto;
    }

    public List<PersonalDTO> getBySucursalId(Long sucursalId) {
        SucursalDTO sucursal = sucursalRepository.getById(sucursalId);
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + sucursalId);
        }
        return personalRepository.getBySucursalId(sucursalId);
    }

    public PersonalDTO save(PersonalDTO dto) {
        // Validaciones
        if (dto.getNombreCompleto() == null || dto.getNombreCompleto().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nombreCompleto is required");
        }
        if (dto.getCorreoInstitucional() == null || dto.getCorreoInstitucional().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "correoInstitucional is required");
        }
        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getNumerosTelefono() == null || dto.getNumerosTelefono().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "at least one phone number is required");
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        // Crear modelo de dominio
        Personal personal = new Personal(
                dto.getId() != null ? dto.getId() : 0,
                dto.getNombreCompleto(),
                dto.getCorreoInstitucional(),
                dto.getNumerosTelefono(),
                dto.getSucursalId()
        );

        return personalRepository.save(personal);
    }

    public PersonalDTO update(Long id, PersonalDTO dto) {
        PersonalDTO existente = personalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + id);
        }

        if (dto.getNombreCompleto() == null || dto.getNombreCompleto().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "nombreCompleto is required");
        }
        if (dto.getCorreoInstitucional() == null || dto.getCorreoInstitucional().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "correoInstitucional is required");
        }
        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getNumerosTelefono() == null || dto.getNumerosTelefono().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "at least one phone number is required");
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        Personal personal = new Personal(
                id,
                dto.getNombreCompleto(),
                dto.getCorreoInstitucional(),
                dto.getNumerosTelefono(),
                dto.getSucursalId()
        );

        return personalRepository.save(personal);
    }

    public void delete(Long id) {
        PersonalDTO existente = personalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + id);
        }
        personalRepository.deleteById(id);
    }

    public PersonalDTO reasignarSucursal(Long personalId, Long nuevaSucursalId) {
        PersonalDTO personal = personalRepository.getById(personalId);
        if (personal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + personalId);
        }

        SucursalDTO nuevaSucursal = sucursalRepository.getById(nuevaSucursalId);
        if (nuevaSucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + nuevaSucursalId);
        }

        if (personal.getSucursalId().equals(nuevaSucursalId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Personal is already assigned to this sucursal");
        }

        return personalRepository.reasignarSucursal(personalId, nuevaSucursalId);
    }
}
