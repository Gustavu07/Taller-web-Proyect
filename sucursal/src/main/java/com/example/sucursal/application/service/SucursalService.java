package com.example.sucursal.application.service;

import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.port.out.SucursalRepositoryPort;
import com.example.sucursal.domain.model.Sucursal;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SucursalService {

    private final SucursalRepositoryPort sucursalRepository;

    public SucursalService(SucursalRepositoryPort sucursalRepository) {
        this.sucursalRepository = sucursalRepository;
    }

    public List<SucursalDTO> getAll() {
        return sucursalRepository.getAll();
    }

    public SucursalDTO getById(Long id) {
        SucursalDTO dto = sucursalRepository.getById(id);
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + id);
        }
        return dto;
    }

    public SucursalDTO save(SucursalDTO dto) {
        // Validaciones
        if (dto.getDireccion() == null || dto.getDireccion().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "direccion is required");
        }
        if (dto.getTelefono() == null || dto.getTelefono().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "telefono is required");
        }
        if (dto.getLatitud() == null || dto.getLongitud() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "latitud y longitud are required");
        }
        Sucursal sucursal = new Sucursal(
                dto.getId() != null ? dto.getId() : 0,
                dto.getDireccion(),
                dto.getTelefono(),
                dto.getLatitud(),
                dto.getLongitud(),
                dto.getImagenUrl(),
                dto.isActiva(),
                dto.getNumerosContacto(),
                dto.getNumerosCorporativos(),
                null, // horariosIds (se manejan por separado)
                null  // personalIds (se manejan por separado)
        );

        return sucursalRepository.save(sucursal);
    }

    public SucursalDTO update(Long id, SucursalDTO dto) {
        SucursalDTO existente = sucursalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + id);
        }

        if (dto.getDireccion() == null || dto.getDireccion().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "direccion is required");
        }
        if (dto.getTelefono() == null || dto.getTelefono().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "telefono is required");
        }
        if (dto.getLatitud() == null || dto.getLongitud() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "latitud y longitud are required");
        }

        // Actualizar modelo de dominio
        Sucursal sucursal = new Sucursal(
                id,
                dto.getDireccion(),
                dto.getTelefono(),
                dto.getLatitud(),
                dto.getLongitud(),
                dto.getImagenUrl(),
                dto.isActiva(),
                dto.getNumerosContacto(),
                dto.getNumerosCorporativos(),
                null,
                null
        );

        return sucursalRepository.save(sucursal);
    }

    public void delete(Long id) {
        SucursalDTO existente = sucursalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + id);
        }
        sucursalRepository.deleteById(id);
    }

    // Requerimiento 2: Activar/Desactivar sucursales
    public SucursalDTO activar(Long id) {
        SucursalDTO existente = sucursalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + id);
        }
        return sucursalRepository.activar(id);
    }

    public SucursalDTO desactivar(Long id) {
        SucursalDTO existente = sucursalRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + id);
        }
        return sucursalRepository.desactivar(id);
    }
}
