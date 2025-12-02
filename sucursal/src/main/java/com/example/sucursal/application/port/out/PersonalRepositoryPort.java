package com.example.sucursal.application.port.out;

import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.domain.model.Personal;

import java.util.List;

public interface PersonalRepositoryPort {
    List<PersonalDTO> getAll();
    PersonalDTO getById(Long id);
    PersonalDTO save(Personal personal);
    void deleteById(Long id);
    List<PersonalDTO> getBySucursalId(Long sucursalId); // Obtener personal de una sucursal
    PersonalDTO reasignarSucursal(Long personalId, Long nuevaSucursalId); // Requerimiento: Reasignación
}
