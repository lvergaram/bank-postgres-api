DROP TABLE IF EXISTS transferencias;
DROP TABLE IF EXISTS cuentas;


CREATE TABLE cuentas (
	id INT PRIMARY KEY, 
	saldo DECIMAL CHECK (saldo >= 0) 
);

CREATE TABLE transferencias(
	ID SERIAL PRIMARY KEY,
	descripcion varchar(50), 
	fecha DATE DEFAULT CURRENT_DATE, 
	monto DECIMAL,
	cuenta_origen INT,
	cuenta_destino INT,
	FOREIGN KEY(cuenta_origen) REFERENCES cuentas(id) ON DELETE CASCADE,
	FOREIGN KEY(cuenta_destino) REFERENCES cuentas(id) ON DELETE CASCADE
	
); 


INSERT INTO cuentas values 
	(1, 20000),
	(2, 10000);

SELECT * FROM cuentas;

-- Transaccion

BEGIN;

UPDATE CUENTAS
SET SALDO = SALDO -1000
WHERE ID = 1;

UPDATE CUENTAS
SET SALDO = SALDO +1000
WHERE ID = 2;

INSERT INTO TRANSFERENCIAS(descripcion,monto,cuenta_origen,cuenta_destino) VALUES
	('TRANFIERE 100',100,1,2);

COMMIT;

SELECT * FROM CUENTAS;
SELECT * FROM TRANSFERENCIAS;