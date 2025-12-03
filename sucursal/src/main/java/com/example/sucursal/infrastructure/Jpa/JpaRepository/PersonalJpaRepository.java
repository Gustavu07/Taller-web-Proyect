package com.example.sucursal.infrastructure.Jpa.JpaRepository;
import com.example.sucursal.infrastructure.entity.PersonalEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonalJpaRepository extends JpaRepository<PersonalEntity, Long> {

    List<PersonalEntity> findBySucursalId(Long sucursalId);
}
