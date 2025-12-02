package com.example.sucursal.infrastructure.Jpa.Mapper;

import com.example.sucursal.application.dto.HorarioDTO;
import com.example.sucursal.domain.model.Horario;
import com.example.sucursal.infrastructure.entity.HorarioEntity;
import com.example.sucursal.infrastructure.entity.SucursalEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class HorarioMapper {
    public HorarioEntity ofModelToEntity(Horario horario, SucursalEntity sucursalEntity) {
        return new HorarioEntity(
                horario.getDiaSemana(),
                horario.getHoraApertura(),
                horario.getHoraCierre(),
                sucursalEntity
        );
    }

    public HorarioDTO ofEntityToDto(HorarioEntity entity) {
        return new HorarioDTO(
                entity.getId(),
                entity.getDiaSemana(),
                entity.getHoraApertura(),
                entity.getHoraCierre(),
                entity.getSucursal() != null ? entity.getSucursal().getId() : null
        );
    }

    public List<HorarioDTO> ofEntityToDto(List<HorarioEntity> list) {
        return list.stream().map(this::ofEntityToDto).toList();
    }

    public Horario ofEntityToModel(HorarioEntity entity) {
        return new Horario(
                entity.getId(),
                entity.getDiaSemana(),
                entity.getHoraApertura(),
                entity.getHoraCierre(),
                entity.getSucursal() != null ? entity.getSucursal().getId() : null
        );
    }

}
