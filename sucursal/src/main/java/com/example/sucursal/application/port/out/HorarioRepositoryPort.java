package com.example.sucursal.application.port.out;

import com.example.sucursal.application.dto.HorarioDTO;
import com.example.sucursal.domain.model.Horario;

import java.util.List;

public interface HorarioRepositoryPort {
    List<HorarioDTO> getAll();
    HorarioDTO getById(Long id);
    HorarioDTO save(Horario horario);
    void deleteById(Long id);
    List<HorarioDTO> getBySucursalId(Long sucursalId); // Obtener horarios de una sucursal
}