package com.example.sucursal.infrastructure.Jpa.JpaRepository;

import com.example.sucursal.infrastructure.entity.AsignacionCorporativaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AsignacionCorporativaJpaRepository extends JpaRepository<AsignacionCorporativaEntity, Long> {
    Optional<AsignacionCorporativaEntity> findByPersonalIdAndActivoTrue(Long personalId);

    List<AsignacionCorporativaEntity> findBySucursalId(Long sucursalId);
}
