/*Punto a
Para nivel de Segmentacion de clientes 
Se otorgan beneficios especiales para aquellos clientes que superen los 60 años para arriba
o si la sumatoria total de compra(monto operacion de bolsa de puntos) supera los 1.000.000

Obs: Se tiene en cuenta la operacion actual para realizar la sumatoria

Pasos
 Se carga el cliente con sus respectivos datos
 
 Se carga los puntos en la bolsa de puntos teniendo en cuenta la regla de asignacion
 
 Ej: Se carga en la bolsa de puntos sobre un cliente mayor a 60 años el monto de 150000,
 siguiendo el ejemplo de lq esta en el ejercicio
 - 0 a 199.999 Gs.: 1 punto cada 50.000
 
 Corresponde a sumarlo 3 puntos de acuerdo a su operacion y a eso se le suma 10 puntos adicionales por cumplir la
 condicion de tener mas de 60 años, entonces en total tendria 13 puntos
 
 Otro punto
 1-  Se carga en la bolsa de puntos sobre un cliente el monto 150000,
 siguiendo el ejemplo de lq esta en el ejercicio
 - 0 a 199.999 Gs.: 1 punto cada 50.000
 
  La primera compra se le otorga 3 puntos, y por lo tanto la sumatoria actual seria de 150000
  
 2-  Se carga en la bolsa de puntos sobre un cliente el monto 150000,
 siguiendo el ejemplo de lq esta en el ejercicio
 - 0 a 199.999 Gs.: 1 punto cada 50.000
 
 La segunda compra se le otorga 3 puntos(en otro registro dif al primero), y por lo tanto la sumatoria actual seria de 300000
 
 3-  Se carga en la bolsa de puntos sobre un cliente el monto 150000,
 siguiendo el ejemplo de lq esta en el ejercicio
 - 0 a 199.999 Gs.: 1 punto cada 50.000
 
 La tercera compra se le otorga 3 puntos(en otro registro dif al primero), y por lo tanto la sumatoria actual seria de 450000
 
 4-  Se carga en la bolsa de puntos sobre un cliente el monto 150000,
 siguiendo el ejemplo de lq esta en el ejercicio
 - 0 a 199.999 Gs.: 1 punto cada 50.000
 
 La cuarta compra se le otorga 3 puntos(en otro registro dif al primero), y por lo tanto la sumatoria actual seria de 600000
 
y asi sucesivamente hasta que la sumatoria alcance los 1millon o mas
 
 
 Se carga una ultima compra
 
 y si la sumatoria supera los 1000000 adicionalmente se le suma 10 puntos mas

 
POR LO TANTO EL BENEFICIO PERSONALIZADO SERIA DE OTORGAR PUNTOS ADICIONALES A LA BOLSA

*/



/*Punto b
Para nivel de fidelizacion 
Se tendrá el crud donde se podra insertar, modificar y eliminar los niveles

Ej: 
      Nombre  	Puntos Minimo   Puntos Maximo 
	  Nivel 1          0             5
	  Nivel 2          6             10
	  Nivel 3          11            15
	  
	  
Se carga en la bolsa de puntos y de acuerdo al punto asignado se inserta en la tabla cliente_nivel_fidelizacion
donde figurará el cliente con el nivel de acuerdo al ejemplo

Ej: Se carga una bolsa de puntos y en total se le asigna 3 puntos, por lo tanto en el cliente_nivel_fidelizacion
se insertará con el nivel 1

Se vuelve a cargar una bolsa de puntos y en total se le asigna 3 puntos, y con la operacion anterior
ya acumula 6 puntos en total, por lo tanto cliente_nivel_fidelizacion se actualiza y pasara a visualizarse
a nivel 2 con el mismo cliente
