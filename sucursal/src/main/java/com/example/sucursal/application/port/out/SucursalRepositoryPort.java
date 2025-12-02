package com.example.sucursal.application.port.out;

import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.domain.model.Sucursal;

import java.util.List;

public interface SucursalRepositoryPort {
    List<SucursalDTO> getAll();
    SucursalDTO getById(Long id);
    SucursalDTO save(Sucursal sucursal);
    void deleteById(Long id);
    SucursalDTO activar(Long id);      // Requerimiento: Activar sucursal
    SucursalDTO desactivar(Long id);   // Requerimiento: Desactivar sucursal
}
