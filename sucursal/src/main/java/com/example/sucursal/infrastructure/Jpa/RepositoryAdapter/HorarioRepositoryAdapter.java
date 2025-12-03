package com.example.sucursal.infrastructure.Jpa.RepositoryAdapter;

import com.example.sucursal.application.dto.HorarioDTO;
import com.example.sucursal.application.port.out.HorarioRepositoryPort;
import com.example.sucursal.domain.model.Horario;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.HorarioJpaRepository;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.SucursalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.Mapper.HorarioMapper;
import com.example.sucursal.infrastructure.entity.HorarioEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;

import java.util.List;

public class HorarioRepositoryAdapter implements HorarioRepositoryPort {

    private final HorarioJpaRepository horarioRepository;
    private final HorarioMapper horarioMapper;
    private final SucursalJpaRepository sucursalJpaRepository;

    public HorarioRepositoryAdapter(
            HorarioJpaRepository horarioRepository,
            HorarioMapper horarioMapper,
            SucursalJpaRepository sucursalJpaRepository
    ) {
        this.horarioRepository = horarioRepository;
        this.horarioMapper = horarioMapper;
        this.sucursalJpaRepository = sucursalJpaRepository;
    }
    @Override
    public List<HorarioDTO> getAll() {
        return horarioMapper.ofEntityToDto(horarioRepository.findAll());
    }

    @Override
    public HorarioDTO getById(Long id) {
        HorarioEntity entity = horarioRepository.findById(id).orElse(null);
        return entity != null ? horarioMapper.ofEntityToDto(entity) : null;
    }

    @Override
    public HorarioDTO save(Horario horario) {
        SucursalEntity sucursalEntity = null;
        if (horario.getSucursalId() != null) {
            sucursalEntity = sucursalJpaRepository.findById(horario.getSucursalId()).orElse(null);
        }

        // Si tiene ID, es actualización
        if (horario.getId() != null && horario.getId() > 0) {
            HorarioEntity existing = horarioRepository.findById(horario.getId()).orElse(null);
            if (existing != null) {
                existing.setDiaSemana(horario.getDiaSemana());
                existing.setHoraApertura(horario.getHoraApertura());
                existing.setHoraCierre(horario.getHoraCierre());
                if (sucursalEntity != null) {
                    existing.setSucursal(sucursalEntity);
                }

                HorarioEntity saved = horarioRepository.save(existing);
                return horarioMapper.ofEntityToDto(saved);
            }
        }

        // Es creación
        HorarioEntity entityToSave = horarioMapper.ofModelToEntity(horario, sucursalEntity);
        HorarioEntity saved = horarioRepository.save(entityToSave);
        return horarioMapper.ofEntityToDto(saved);
    }

    @Override
    public void deleteById(Long id) {
        horarioRepository.deleteById(id);
    }

    @Override
    public List<HorarioDTO> getBySucursalId(Long sucursalId) {
        return horarioMapper.ofEntityToDto(horarioRepository.findBySucursalId(sucursalId));
    }
}
