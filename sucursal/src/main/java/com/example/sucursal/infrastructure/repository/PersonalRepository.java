package com.example.sucursal.infrastructure.repository;

import com.example.sucursal.domain.model.Personal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalRepository extends JpaRepository<Personal, Long> {
    // Ejemplo: List<Personal> findBySucursalId(Long sucursalId);
}
