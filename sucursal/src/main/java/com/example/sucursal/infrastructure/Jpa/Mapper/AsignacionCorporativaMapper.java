package com.example.sucursal.infrastructure.Jpa.Mapper;

import com.example.sucursal.application.dto.AsignacionCorporativaDTO;
import com.example.sucursal.domain.model.AsignacionCorporativa;
import com.example.sucursal.infrastructure.entity.AsignacionCorporativaEntity;
import com.example.sucursal.infrastructure.entity.PersonalEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AsignacionCorporativaMapper {
    public AsignacionCorporativaEntity ofModelToEntity(
            AsignacionCorporativa asignacion,
            PersonalEntity personalEntity,
            SucursalEntity sucursalEntity
    ) {
        return new AsignacionCorporativaEntity(
                personalEntity,
                sucursalEntity,
                asignacion.getNumeroCorporativo(),
                asignacion.isActivo()
        );
    }

    public AsignacionCorporativaDTO ofEntityToDto(AsignacionCorporativaEntity entity) {
        return new AsignacionCorporativaDTO(
                entity.getId(),
                entity.getPersonal() != null ? entity.getPersonal().getId() : null,
                entity.getSucursal() != null ? entity.getSucursal().getId() : null,
                entity.getNumeroCorporativo(),
                entity.isActivo()
        );
    }

    public List<AsignacionCorporativaDTO> ofEntityToDto(List<AsignacionCorporativaEntity> list) {
        return list.stream().map(this::ofEntityToDto).toList();
    }

    public AsignacionCorporativa ofEntityToModel(AsignacionCorporativaEntity entity) {
        return new AsignacionCorporativa(
                entity.getId(),
                entity.getPersonal() != null ? entity.getPersonal().getId() : null,
                entity.getSucursal() != null ? entity.getSucursal().getId() : null,
                entity.getNumeroCorporativo(),
                entity.isActivo()
        );
    }
}
