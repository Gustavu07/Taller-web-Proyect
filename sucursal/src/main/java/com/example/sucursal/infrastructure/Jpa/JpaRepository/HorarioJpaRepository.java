package com.example.sucursal.infrastructure.Jpa.JpaRepository;

import com.example.sucursal.infrastructure.entity.HorarioEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HorarioJpaRepository extends JpaRepository<HorarioEntity, Long> {

    List<HorarioEntity> findBySucursalId(Long sucursalId);
}
