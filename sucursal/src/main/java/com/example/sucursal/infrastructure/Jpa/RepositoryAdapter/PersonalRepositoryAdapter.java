package com.example.sucursal.infrastructure.Jpa.RepositoryAdapter;

import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.application.port.out.PersonalRepositoryPort;
import com.example.sucursal.domain.model.Personal;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.PersonalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.SucursalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.Mapper.PersonalMapper;
import com.example.sucursal.infrastructure.entity.PersonalEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;

import java.util.List;

public class PersonalRepositoryAdapter implements PersonalRepositoryPort {

    private final PersonalJpaRepository personalRepository;
    private final PersonalMapper personalMapper;
    private final SucursalJpaRepository sucursalJpaRepository;

    public PersonalRepositoryAdapter(
            PersonalJpaRepository personalRepository,
            PersonalMapper personalMapper,
            SucursalJpaRepository sucursalJpaRepository
    ) {
        this.personalRepository = personalRepository;
        this.personalMapper = personalMapper;
        this.sucursalJpaRepository = sucursalJpaRepository;
    }

    @Override
    public List<PersonalDTO> getAll() {
        return personalMapper.ofEntityToDto(personalRepository.findAll());
    }

    @Override
    public PersonalDTO getById(Long id) {
        PersonalEntity entity = personalRepository.findById(id).orElse(null);
        return entity != null ? personalMapper.ofEntityToDto(entity) : null;
    }

    @Override
    public PersonalDTO save(Personal personal) {
        SucursalEntity sucursalEntity = null;
        if (personal.getSucursalId() != null) {
            sucursalEntity = sucursalJpaRepository.findById(personal.getSucursalId()).orElse(null);
        }

        // Si tiene ID > 0, es actualización
        if (personal.getId() > 0) {
            PersonalEntity existing = personalRepository.findById(personal.getId()).orElse(null);
            if (existing != null) {
                existing.setNombreCompleto(personal.getNombreCompleto());
                existing.setCorreoInstitucional(personal.getCorreoInstitucional());
                existing.setNumerosTelefono(personal.getNumerosTelefono());
                if (sucursalEntity != null) {
                    existing.setSucursal(sucursalEntity);
                }

                PersonalEntity saved = personalRepository.save(existing);
                return personalMapper.ofEntityToDto(saved);
            }
        }

        // Es creación
        PersonalEntity entityToSave = personalMapper.ofModelToEntity(personal, sucursalEntity);
        PersonalEntity saved = personalRepository.save(entityToSave);
        return personalMapper.ofEntityToDto(saved);
    }

    @Override
    public void deleteById(Long id) {
        personalRepository.deleteById(id);
    }

    @Override
    public List<PersonalDTO> getBySucursalId(Long sucursalId) {
        return personalMapper.ofEntityToDto(personalRepository.findBySucursalId(sucursalId));
    }

    @Override
    public PersonalDTO reasignarSucursal(Long personalId, Long nuevaSucursalId) {
        PersonalEntity personal = personalRepository.findById(personalId).orElse(null);
        SucursalEntity nuevaSucursal = sucursalJpaRepository.findById(nuevaSucursalId).orElse(null);

        if (personal != null && nuevaSucursal != null) {
            personal.setSucursal(nuevaSucursal);
            PersonalEntity saved = personalRepository.save(personal);
            return personalMapper.ofEntityToDto(saved);
        }

        return null;
    }
}
