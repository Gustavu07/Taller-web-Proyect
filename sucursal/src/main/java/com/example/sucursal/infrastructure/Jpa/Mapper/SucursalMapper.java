package com.example.sucursal.infrastructure.Jpa.Mapper;

import com.example.sucursal.application.dto.SucursalDTO;
import com.example.sucursal.domain.model.Sucursal;
import com.example.sucursal.infrastructure.entity.SucursalEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SucursalMapper {

    public SucursalEntity ofModelToEntity(Sucursal sucursal) {
        return new SucursalEntity(
                sucursal.getDireccion(),
                sucursal.getTelefono(),
                sucursal.getLatitud(),
                sucursal.getLongitud(),
                sucursal.getImagenUrl(),
                sucursal.isActiva(),
                sucursal.getNumerosContacto(),
                sucursal.getNumerosCorporativos()
        );
    }

    public SucursalDTO ofEntityToDto(SucursalEntity entity) {
        return new SucursalDTO(
                entity.getId(),
                entity.getDireccion(),
                entity.getTelefono(),
                entity.getLatitud(),
                entity.getLongitud(),
                entity.isActiva(),
                entity.getImagenUrl(),
                entity.getNumerosContacto(),
                entity.getNumerosCorporativos()
        );
    }
    public List<SucursalDTO> ofEntityToDto(List<SucursalEntity> list) {
        return list.stream().map(this::ofEntityToDto).toList();
    }

    public Sucursal ofEntityToModel(SucursalEntity entity) {
        return new Sucursal(
                entity.getId(),
                entity.getDireccion(),
                entity.getTelefono(),
                entity.getLatitud(),
                entity.getLongitud(),
                entity.getImagenUrl(),
                entity.isActiva(),
                entity.getNumerosContacto(),
                entity.getNumerosCorporativos(),
                null, // horariosIds (se manejan por separado)
                null  // personalIds (se manejan por separado)
        );
    }
}
