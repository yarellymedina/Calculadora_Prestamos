function validarNumero(input) {
    input.value = input.value.replace(/[^\d]/g, '');
}

function validarTasa(input) {
    input.value = input.value.replace(/[^\d.]/g, ''); 
    input.value = input.value.replace(/(\.\d\d)\d+/, '$1'); 
}

function calcularCuota() {
    var monto = document.getElementById("monto").value;
    var tasa = document.getElementById("tasa").value;
    var plazo = document.getElementById("plazo").value;

    if (monto === "" || tasa === "" || plazo === "") {
        var mensaje = "<div class='alert alert-warning custom-result-box' role='alert'>" +
            "Por favor, ingrese valores válidos para todos los campos." +
            "</div>";
    
        document.getElementById("result").innerHTML = mensaje;
        var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
        modal.show();
    
        return;
    }
    

    monto = parseFloat(monto);
    tasa = parseFloat(tasa);
    plazo = parseInt(plazo);

    // Validación del plazo máximo de 30 años (360 meses)
    if (plazo > 360) {
        var mensaje = "<div class='alert alert-warning custom-result-box' role='alert'>" +
            "El plazo máximo permitido es de 30 años (360 meses)." +
            "</div>";
    
        document.getElementById("result").innerHTML = mensaje;
        var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
        modal.show();
    
        return;
    }
    

    var tasa_mensual = (tasa / 12) / 100;
    var cuota_mensual = (monto * tasa_mensual * Math.pow((1 + tasa_mensual), plazo)) / (Math.pow((1 + tasa_mensual), plazo) - 1);
    var monto_formateado = monto.toLocaleString('es-ES');
    var cuota_mensual_formateada = cuota_mensual.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    //MENSAJE FINAL
    var mensaje = "<div class='alert alert-success custom-result-box' role='alert'>" +
    "Para un préstamo de L. " + monto_formateado + " a una tasa del " + tasa + "% a pagar en " + plazo + " meses," +
    " la cuota mensual es de L. " + cuota_mensual_formateada +
    "</div>";


    document.getElementById("result").innerHTML = mensaje;
    var modal = new bootstrap.Modal(document.getElementById('resultadoModal'));
    modal.show();

}
