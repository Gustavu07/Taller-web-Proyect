package com.example.sucursal.infrastructure.Jpa.RepositoryAdapter;

import com.example.sucursal.application.dto.AsignacionCorporativaDTO;
import com.example.sucursal.application.port.out.AsignacionCorporativaRepositoryPort;
import com.example.sucursal.domain.model.AsignacionCorporativa;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.AsignacionCorporativaJpaRepository;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.PersonalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.SucursalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.Mapper.AsignacionCorporativaMapper;
import com.example.sucursal.infrastructure.entity.AsignacionCorporativaEntity;
import com.example.sucursal.infrastructure.entity.PersonalEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;

import java.util.List;

public class AsignacionCorporativaRepositoryAdapter implements AsignacionCorporativaRepositoryPort {
    private final AsignacionCorporativaJpaRepository asignacionRepository;
    private final AsignacionCorporativaMapper asignacionMapper;
    private final PersonalJpaRepository personalJpaRepository;
    private final SucursalJpaRepository sucursalJpaRepository;

    public AsignacionCorporativaRepositoryAdapter(
            AsignacionCorporativaJpaRepository asignacionRepository,
            AsignacionCorporativaMapper asignacionMapper,
            PersonalJpaRepository personalJpaRepository,
            SucursalJpaRepository sucursalJpaRepository
    ) {
        this.asignacionRepository = asignacionRepository;
        this.asignacionMapper = asignacionMapper;
        this.personalJpaRepository = personalJpaRepository;
        this.sucursalJpaRepository = sucursalJpaRepository;
    }

    @Override
    public List<AsignacionCorporativaDTO> getAll() {
        return asignacionMapper.ofEntityToDto(asignacionRepository.findAll());
    }

    @Override
    public AsignacionCorporativaDTO getById(Long id) {
        AsignacionCorporativaEntity entity = asignacionRepository.findById(id).orElse(null);
        return entity != null ? asignacionMapper.ofEntityToDto(entity) : null;
    }

    @Override
    public AsignacionCorporativaDTO save(AsignacionCorporativa asignacion) {
        PersonalEntity personalEntity = null;
        SucursalEntity sucursalEntity = null;

        if (asignacion.getPersonalId() != null) {
            personalEntity = personalJpaRepository.findById(asignacion.getPersonalId()).orElse(null);
        }
        if (asignacion.getSucursalId() != null) {
            sucursalEntity = sucursalJpaRepository.findById(asignacion.getSucursalId()).orElse(null);
        }

        // Si tiene ID > 0, es actualización
        if (asignacion.getId() > 0) {
            AsignacionCorporativaEntity existing = asignacionRepository.findById(asignacion.getId()).orElse(null);
            if (existing != null) {
                if (personalEntity != null) {
                    existing.setPersonal(personalEntity);
                }
                if (sucursalEntity != null) {
                    existing.setSucursal(sucursalEntity);
                }
                existing.setNumeroCorporativo(asignacion.getNumeroCorporativo());
                existing.setActivo(asignacion.isActivo());

                AsignacionCorporativaEntity saved = asignacionRepository.save(existing);
                return asignacionMapper.ofEntityToDto(saved);
            }
        }

        // Es creación
        AsignacionCorporativaEntity entityToSave = asignacionMapper.ofModelToEntity(
                asignacion,
                personalEntity,
                sucursalEntity
        );
        AsignacionCorporativaEntity saved = asignacionRepository.save(entityToSave);
        return asignacionMapper.ofEntityToDto(saved);
    }

    @Override
    public void deleteById(Long id) {
        asignacionRepository.deleteById(id);
    }

    @Override
    public AsignacionCorporativaDTO getByPersonalIdAndActivo(Long personalId) {
        AsignacionCorporativaEntity entity = asignacionRepository
                .findByPersonalIdAndActivoTrue(personalId)
                .orElse(null);
        return entity != null ? asignacionMapper.ofEntityToDto(entity) : null;
    }

    @Override
    public List<AsignacionCorporativaDTO> getBySucursalId(Long sucursalId) {
        return asignacionMapper.ofEntityToDto(asignacionRepository.findBySucursalId(sucursalId));
    }

    @Override
    public void desactivarAsignacion(Long asignacionId) {
        AsignacionCorporativaEntity entity = asignacionRepository.findById(asignacionId).orElse(null);
        if (entity != null) {
            entity.setActivo(false);
            asignacionRepository.save(entity);
        }
    }
}
