package com.example.sucursal.infrastructure.repository;

import com.example.sucursal.domain.model.Horario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HorarioRepository extends JpaRepository<Horario, Long> {
    // Ejemplo: List<Horario> findBySucursalId(Long sucursalId);
}
