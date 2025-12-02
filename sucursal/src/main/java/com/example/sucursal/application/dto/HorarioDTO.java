package com.example.sucursal.application.dto;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class HorarioDTO {
    private Long id;
    private DayOfWeek diaSemana;
    private LocalTime horaApertura;
    private LocalTime horaCierre;
    private Long sucursalId;

    public HorarioDTO(
            Long id,
            DayOfWeek diaSemana,
            LocalTime horaApertura,
            LocalTime horaCierre,
            Long sucursalId
    ) {
        this.id = id;
        this.diaSemana = diaSemana;
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
        this.sucursalId = sucursalId;
    }

    // getters / setters
    public Long getId() { return id; }

    public DayOfWeek getDiaSemana() { return diaSemana; }

    public LocalTime getHoraApertura() { return horaApertura; }

    public LocalTime getHoraCierre() { return horaCierre; }

    public Long getSucursalId() { return sucursalId; }

}
