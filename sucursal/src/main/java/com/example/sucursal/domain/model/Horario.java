package com.example.sucursal.domain.model;

import java.time.DayOfWeek;
import java.time.LocalTime;

public class Horario {

    private Long id;
    private DayOfWeek diaSemana;
    private LocalTime horaApertura;
    private LocalTime horaCierre;
    private Long sucursalId;

    public Horario() {
    }

    public Horario(
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

    public Long getId() {
        return id;
    }

    public DayOfWeek getDiaSemana() {
        return diaSemana;
    }

    public LocalTime getHoraApertura() {
        return horaApertura;
    }

    public LocalTime getHoraCierre() {
        return horaCierre;
    }

    public Long getSucursalId() {
        return sucursalId;
    }
}