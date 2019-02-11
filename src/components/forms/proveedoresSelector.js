import React from 'react';
import AutoComplete from './autoComplete';
import deburr from 'lodash/deburr';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import MenuItem from '@material-ui/core/MenuItem';

const suggestions = [
  {idProveedor:1,empresa:"Confecciones Colombia",contacto:"Dayana Cartagena",domicilio:"Justo Sierra #60. Col. Jorhentpiri 60074. Uruapan, Michoacán.",telefono:"452 201 8336",email:"contacto@confeccionescolombia.com",comentarios:null,activo:true},
  {idProveedor:2,empresa:"Peletería \"El Puente\"",contacto:"Salvador Pérez",domicilio:"Héroes de la Independencia #126. Col. El Coecillo C.P. 37260 León Guanajuato.",telefono:"01 477 714 7406 / 01 477 716 6602 / 01 477 713 3590",email:"delpuente91@gmail.com / delpuente91@yahoo.com.mx / delpuente91@hotmail.com",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:3,empresa:"Parisina",contacto:"Parisina",domicilio:"Portal Mercado 3, Centro, 60000 Uruapan, Mich.",telefono:"01 452 524 1709",email:"NO EMAIL",comentarios:"9:00 am a 8:30 pm, de lunes a domingo.",activo:true},
  {idProveedor:4,empresa:"PROVECAL",contacto:"Abdias Morales Ramírez",domicilio:"La Luz #525 casi esquina con Mérida Col. Coecillo, León Guanajuato. ",telefono:"(477) 713 3560 / (476) 743 2297 / 743 2589",email:"a.morales@provecal.net",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:5,empresa:"Grupo Cyprus",contacto:"Daniel",domicilio:"La Luz #418-B Coecillo",telefono:"713 1178 / 716 65 69/ 477 254 9705",email:"www.cyprus.com.mx",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:6,empresa:"Moda Telas",contacto:"Moda Telas",domicilio:"Cupatitzio 40-B, Col. Centro, entre Madero y Libertad. C.P. 60000 Uruapan, Mich",telefono:"452 519 0000 / 01 800 700 MODA (6032)",email:"comentarios@modatelas.com.mx",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:7,empresa:"Peletería San Crispin",contacto:"Estela Sánchez Gallegos",domicilio:"La Luz No. 415 Col. Coecillo C.P. 37260 León, Gto.",telefono:"01 (477) 713 00 44",email:"peleteria_san_crispin@hotmail.com",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:8,empresa:"SPRADLING",contacto:"Wilson Andrés Zambrano Valencia",domicilio:"Homero No. 123, Piso 1. Oficina 101. Colonia Chapultepec Morales. Delegacion Miguel Hidalgo. C.P. 11570",telefono:"55 5250 0137 / 55 5250 9015 Ext. 107 / 044 55 1412 7330",email:"wilson.zambrano@spradlingintl.com",comentarios:"www.spradlingvinyl.com, www.spradling.eu",activo:true},
  {idProveedor:9,empresa:"LAFAYETTE (Punto de venta México)",contacto:"Sado Chaparro",domicilio:"Calle 20 de noviembre. No. 175 Local 3. Delegación Cuahutemoc. Col. Centro D.F. ",telefono:"5709 0274 / 5709 0528 / (52) 1 55 3883 7342",email:"pdvmexico@lafayette.com",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:10,empresa:"LAFAYETTE (DECO)",contacto:"Juan Pablo Gutierrez B",domicilio:"Presidentes No. 177, Col. Portales. C.P. 03300, Delg. Benito Juárez. México D.F.",telefono:"52 (55) 56040669 Ext. 2706 / 52 (55) 3672 1251",email:"jpgutierrez@lafayette.com",comentarios:"www.lafayette.com",activo:true},
  {idProveedor:11,empresa:"NATZIPP (Cierres Automáticos National S.A. de C.V.)",contacto:"NATZIPP",domicilio:"Paraíso 1681, Col. del Fresno, C.P. 44900. Guadalajara, Jalisco, México.",telefono:"(33)3812 0704 / 01 800 3638 200",email:"",comentarios:"www.natzipp.com",activo:true},
  {idProveedor:12,empresa:"El Venadito",contacto:"Julio Pérez",domicilio:"República de Uruguay #120. Local interior 5, planta baja. Col. Centro del Cuahutemoc. México D.F.",telefono:"5522-0088",email:"julio5230@yahoo.com",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:13,empresa:"EDMA",contacto:"Jorge E Martínez Zamora",domicilio:"San Florencio No. 11. Col. Piscina. León Gto.",telefono:"(477) 329 81 34",email:"zamora512@yahoo.com.mx",comentarios:"NO COMENTARIOS",activo:true},
  {idProveedor:14,empresa:"Importación y distribución de todo tipo de material para mochileros",contacto:"Luis Alberto Caballera Herrera",domicilio:"Republica del Salvador 127-C Col. Centreo Deleg. Cuahutemoc. México D.F. C.P. 06060",telefono:"5542 1049",email:"plasticos.atzin@hotmail.com",comentarios:"NO COMENTARIOS",activo:true}
];

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.empresa, query);
  const parts = parse(suggestion.empresa, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}


function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.empresa.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.empresa;
}

export default () => {

  return (
    <div>
      <AutoComplete label="Proveedor" placeholder="Escriba el nombre"
      getSuggestions={getSuggestions}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion} />
    </div>
  );
}
