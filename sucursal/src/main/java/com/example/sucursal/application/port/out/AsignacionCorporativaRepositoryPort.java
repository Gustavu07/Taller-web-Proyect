package com.example.sucursal.application.port.out;

import com.example.sucursal.application.dto.AsignacionCorporativaDTO;
import com.example.sucursal.domain.model.AsignacionCorporativa;

import java.util.List;

public interface AsignacionCorporativaRepositoryPort {
    List<AsignacionCorporativaDTO> getAll();
    AsignacionCorporativaDTO getById(Long id);
    AsignacionCorporativaDTO save(AsignacionCorporativa asignacion);
    void deleteById(Long id);
    AsignacionCorporativaDTO getByPersonalIdAndActivo(Long personalId); // Obtener asignación activa de un empleado
    List<AsignacionCorporativaDTO> getBySucursalId(Long sucursalId); // Obtener todas las asignaciones de una sucursal
    void desactivarAsignacion(Long asignacionId); // Liberar número corporativo
}
