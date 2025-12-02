package com.example.sucursal.application.service;

import com.example.sucursal.application.dto.HorarioDTO;
import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.port.out.HorarioRepositoryPort;
import com.example.sucursal.application.port.out.SucursalRepositoryPort;
import com.example.sucursal.domain.model.Horario;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class HorarioService {

    private final HorarioRepositoryPort horarioRepository;
    private final SucursalRepositoryPort sucursalRepository;

    public HorarioService(HorarioRepositoryPort horarioRepository, SucursalRepositoryPort sucursalRepository) {
        this.horarioRepository = horarioRepository;
        this.sucursalRepository = sucursalRepository;
    }

    public List<HorarioDTO> getAll() {
        return horarioRepository.getAll();
    }

    public HorarioDTO getById(Long id) {
        HorarioDTO dto = horarioRepository.getById(id);
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Horario not found with id=" + id);
        }
        return dto;
    }

    public List<HorarioDTO> getBySucursalId(Long sucursalId) {
        // Verificar que la sucursal existe
        SucursalDTO sucursal = sucursalRepository.getById(sucursalId);
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + sucursalId);
        }
        return horarioRepository.getBySucursalId(sucursalId);
    }

    public HorarioDTO save(HorarioDTO dto) {
        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getDiaSemana() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "diaSemana is required");
        }
        if (dto.getHoraApertura() == null || dto.getHoraCierre() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "horaApertura and horaCierre are required");
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        if (dto.getHoraApertura().isAfter(dto.getHoraCierre())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "horaApertura must be before horaCierre");
        }

        // Crear modelo de dominio
        Horario horario = new Horario(
                dto.getId() != null ? dto.getId() : null,
                dto.getDiaSemana(),
                dto.getHoraApertura(),
                dto.getHoraCierre(),
                dto.getSucursalId()
        );

        return horarioRepository.save(horario);
    }

    public HorarioDTO update(Long id, HorarioDTO dto) {
        HorarioDTO existente = horarioRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Horario not found with id=" + id);
        }

        if (dto.getSucursalId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "sucursalId is required");
        }
        if (dto.getDiaSemana() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "diaSemana is required");
        }
        if (dto.getHoraApertura() == null || dto.getHoraCierre() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "horaApertura and horaCierre are required");
        }

        SucursalDTO sucursal = sucursalRepository.getById(dto.getSucursalId());
        if (sucursal == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sucursal not found with id=" + dto.getSucursalId());
        }

        if (dto.getHoraApertura().isAfter(dto.getHoraCierre())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "horaApertura must be before horaCierre");
        }

        // Actualizar modelo de dominio
        Horario horario = new Horario(
                id,
                dto.getDiaSemana(),
                dto.getHoraApertura(),
                dto.getHoraCierre(),
                dto.getSucursalId()
        );

        return horarioRepository.save(horario);
    }

    public void delete(Long id) {
        HorarioDTO existente = horarioRepository.getById(id);
        if (existente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Horario not found with id=" + id);
        }
        horarioRepository.deleteById(id);
    }
}
