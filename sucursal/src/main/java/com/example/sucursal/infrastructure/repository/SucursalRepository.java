package com.example.sucursal.infrastructure.repository;

import com.example.sucursal.domain.model.Sucursal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SucursalRepository extends JpaRepository<Sucursal, Long> {
    // Aquí puedes agregar métodos personalizados si lo necesitas más adelante.
}
