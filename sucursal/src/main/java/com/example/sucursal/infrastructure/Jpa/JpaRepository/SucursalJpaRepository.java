package com.example.sucursal.infrastructure.Jpa.JpaRepository;

import com.example.sucursal.infrastructure.entity.SucursalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SucursalJpaRepository extends JpaRepository<SucursalEntity, Long> {
}
