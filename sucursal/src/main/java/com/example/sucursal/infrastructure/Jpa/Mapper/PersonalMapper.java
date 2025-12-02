package com.example.sucursal.infrastructure.Jpa.Mapper;

import com.example.sucursal.application.dto.PersonalDTO;
import com.example.sucursal.domain.model.Personal;
import com.example.sucursal.infrastructure.entity.PersonalEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PersonalMapper {
    public PersonalEntity ofModelToEntity(Personal personal, SucursalEntity sucursalEntity) {
        return new PersonalEntity(
                personal.getNombreCompleto(),
                personal.getCorreoInstitucional(),
                personal.getNumerosTelefono(),
                sucursalEntity
        );
    }

    public PersonalDTO ofEntityToDto(PersonalEntity entity) {
        return new PersonalDTO(
                entity.getId(),
                entity.getNombreCompleto(),
                entity.getCorreoInstitucional(),
                entity.getNumerosTelefono(),
                entity.getSucursal() != null ? entity.getSucursal().getId() : null
        );
    }

    public List<PersonalDTO> ofEntityToDto(List<PersonalEntity> list) {
        return list.stream().map(this::ofEntityToDto).toList();
    }
    public Personal ofEntityToModel(PersonalEntity entity) {
        return new Personal(
                entity.getId(),
                entity.getNombreCompleto(),
                entity.getCorreoInstitucional(),
                entity.getNumerosTelefono(),
                entity.getSucursal() != null ? entity.getSucursal().getId() : null
        );
    }
}
