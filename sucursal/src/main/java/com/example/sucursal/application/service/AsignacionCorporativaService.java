package com.example.sucursal.application.service;

import com.example.sucursal.application.dto.AsignacionCorporativaDTO;
import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.port.out.AsignacionCorporativaRepositoryPort;
import com.example.sucursal.application.port.out.PersonalRepositoryPort;
import com.example.sucursal.application.port.out.SucursalRepositoryPort;
import com.example.sucursal.domain.model.AsignacionCorporativa;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

public class AsignacionCorporativaService {
    private final AsignacionCorporativaRepositoryPort asignacionRepository;
    private final PersonalRepositoryPort personalRepository;
    private final SucursalRepositoryPort sucursalRepository;

    public AsignacionCorporativaService(
            AsignacionCorporativaRepositoryPort asignacionRepository,
            PersonalRepositoryPort personalRepository,
            SucursalRepositoryPort sucursalRepository
    ) {
        this.asignacionRepository = asignacionRepository;
        this.personalRepository = personalRepository;
        this.sucursalRepository = sucursalRepository;
    }

    public List<AsignacionCorporativaDTO> getAll() {
        return asignacionRepository.getAll();
    }

    public AsignacionCorporativaDTO getById(Long id) {
        AsignacionCorporativaDTO dto = asignacionRepository.getById(id);
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AsignacionCorporativa not found with id=" + id);
        }
        return dto;
    }
    public AsignacionCorporativaDTO getByPersonalIdAndActivo(Long personalId) {
        PersonalDTO personal = personalRepository.getById(personalId);
        if (personal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + personalId);
        }

        return asignacionRepository.getByPersonalIdAndActivo(personalId);
    }

    public List<AsignacionCorporativaDTO> getBySucursalId(Long sucursalId) {
        SucursalDTO sucursal = sucursalRepository.getById(sucursalId);
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + sucursalId);
        }

        return asignacionRepository.getBySucursalId(sucursalId);
    }

    public AsignacionCorporativaDTO save(AsignacionCorporativaDTO dto) {
        if (dto.getPersonalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "personalId is required");
        }
        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getNumeroCorporativo() == null || dto.getNumeroCorporativo().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "numeroCorporativo is required");
        }

        PersonalDTO personal = personalRepository.getById(dto.getPersonalId());
        if (personal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + dto.getPersonalId());
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        if (!personal.getSucursalId().equals(dto.getSucursalId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Personal is not assigned to this sucursal. Personal's sucursalId=" + personal.getSucursalId());
        }

        if (!sucursal.getNumerosCorporativos().contains(dto.getNumeroCorporativo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "numeroCorporativo does not belong to this sucursal");
        }

        AsignacionCorporativaDTO asignacionActiva = asignacionRepository.getByPersonalIdAndActivo(dto.getPersonalId());
        if (asignacionActiva != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Personal already has an active corporate number assignment. Deactivate it first.");
        }

        AsignacionCorporativa asignacion = new AsignacionCorporativa(
                dto.getId() != null ? dto.getId() : 0,
                dto.getPersonalId(),
                dto.getSucursalId(),
                dto.getNumeroCorporativo(),
                true
        );

        return asignacionRepository.save(asignacion);
    }

    public AsignacionCorporativaDTO update(Long id, AsignacionCorporativaDTO dto) {
        AsignacionCorporativaDTO existente = asignacionRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AsignacionCorporativa not found with id=" + id);
        }

        if (dto.getPersonalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "personalId is required");
        }
        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getNumeroCorporativo() == null || dto.getNumeroCorporativo().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "numeroCorporativo is required");
        }

        PersonalDTO personal = personalRepository.getById(dto.getPersonalId());
        if (personal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Personal not found with id=" + dto.getPersonalId());
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        if (!sucursal.getNumerosCorporativos().contains(dto.getNumeroCorporativo())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "numeroCorporativo does not belong to this sucursal");
        }

        AsignacionCorporativa asignacion = new AsignacionCorporativa(
                id,
                dto.getPersonalId(),
                dto.getSucursalId(),
                dto.getNumeroCorporativo(),
                dto.isActivo()
        );

        return asignacionRepository.save(asignacion);
    }

    public void delete(Long id) {
        AsignacionCorporativaDTO existente = asignacionRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AsignacionCorporativa not found with id=" + id);
        }
        asignacionRepository.deleteById(id);
    }

    public void desactivarAsignacion(Long asignacionId) {
        AsignacionCorporativaDTO existente = asignacionRepository.getById(asignacionId);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "AsignacionCorporativa not found with id=" + asignacionId);
        }

        if (!existente.isActivo()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "AsignacionCorporativa is already inactive");
        }

        asignacionRepository.desactivarAsignacion(asignacionId);
    }
}
