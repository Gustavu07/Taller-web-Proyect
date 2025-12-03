package com.example.sucursal.infrastructure.Jpa.RepositoryAdapter;

import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.application.port.out.SucursalRepositoryPort;
import com.example.sucursal.domain.model.Sucursal;
import com.example.sucursal.infrastructure.Jpa.JpaRepository.SucursalJpaRepository;
import com.example.sucursal.infrastructure.Jpa.Mapper.SucursalMapper;
import com.example.sucursal.infrastructure.entity.SucursalEntity;

import java.util.List;

public class SucursalRepositoryAdapter implements SucursalRepositoryPort {
    private final SucursalJpaRepository sucursalRepository;
    private final SucursalMapper sucursalMapper;

    public SucursalRepositoryAdapter(
            SucursalJpaRepository sucursalRepository,
            SucursalMapper sucursalMapper
    ) {
        this.sucursalRepository = sucursalRepository;
        this.sucursalMapper = sucursalMapper;
    }

    @Override
    public List<SucursalDTO> getAll() {
        return sucursalMapper.ofEntityToDto(sucursalRepository.findAll());
    }

    @Override
    public SucursalDTO getById(Long id) {
        SucursalEntity entity = sucursalRepository.findById(id).orElse(null);
        return entity != null ? sucursalMapper.ofEntityToDto(entity) : null;
    }

    @Override
    public SucursalDTO save(Sucursal sucursal) {
        if (sucursal.getId() > 0) {
            SucursalEntity existing = sucursalRepository.findById(sucursal.getId()).orElse(null);
            if (existing != null) {
                existing.setDireccion(sucursal.getDireccion());
                existing.setTelefono(sucursal.getTelefono());
                existing.setLatitud(sucursal.getLatitud());
                existing.setLongitud(sucursal.getLongitud());
                existing.setImagenUrl(sucursal.getImagenUrl());
                existing.setActiva(sucursal.isActiva());
                existing.setNumerosContacto(sucursal.getNumerosContacto());
                existing.setNumerosCorporativos(sucursal.getNumerosCorporativos());

                SucursalEntity saved = sucursalRepository.save(existing);
                return sucursalMapper.ofEntityToDto(saved);
            }
        }
        SucursalEntity entityToSave = sucursalMapper.ofModelToEntity(sucursal);
        SucursalEntity saved = sucursalRepository.save(entityToSave);
        return sucursalMapper.ofEntityToDto(saved);
    }

    @Override
    public void deleteById(Long id) {
        sucursalRepository.deleteById(id);

    }

    @Override
    public SucursalDTO activar(Long id) {
        SucursalEntity entity = sucursalRepository.findById(id).orElse(null);
        if (entity != null) {
            entity.setActiva(true);
            SucursalEntity saved = sucursalRepository.save(entity);
            return sucursalMapper.ofEntityToDto(saved);
        }
        return null;
    }

    @Override
    public SucursalDTO desactivar(Long id) {
        SucursalEntity entity = sucursalRepository.findById(id).orElse(null);
        if (entity != null) {
            entity.setActiva(false);
            SucursalEntity saved = sucursalRepository.save(entity);
            return sucursalMapper.ofEntityToDto(saved);
        }
        return null;
    }
}
