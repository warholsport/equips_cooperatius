# Grups heterogenis per al seminari

Pàgina per a 60 participants: escala d'experiència de l'1 al 5, assignació immediata a 10 grups de 6. Un Google Sheet compartit registra les assignacions. El bloqueig d'Apps Script evita col·lisions entre respostes simultànies. La mateixa persona conserva el grup si repeteix l'enviament des del mateix navegador. Per a més de 60 persones, cal ajustar `CAPACITY` i l'aforament indicat a la pàgina.

## Posada en marxa

1. Crea un **Google Sheet buit** dins del compte de l'organització. Copia l'identificador de la seva URL (text entre `/d/` i `/edit`). El full és privat; no el comparteixis amb els participants.
2. Al full, obre **Extensions → Apps Script**. Substitueix `Code.gs` pel contingut d'aquest projecte i canvia `SHEET_ID` per l'identificador. Afegeix un fitxer HTML anomenat exactament `Participant` i copia-hi `Participant.html`.
3. Desa. A **Desplega → Desplegament nou → Aplicació web**, configura **Executa com: jo** i **Qui té accés: qualsevol persona**. Autoritza els permisos. Copia l'URL que acaba en `/exec`. Si l'organització impedeix l'accés públic d'Apps Script, cal un altre compte o una altra plataforma per al registre.
4. A `index.html`, substitueix `ENGANXA_AQUI_L_URL_DE_L_APP_SCRIPT` per l'URL `/exec` exacta. Publica aquesta carpeta al repositori GitHub Pages i comprova l'enllaç final en un mòbil.
5. Fes **una prova** amb un navegador, revisa que aparegui una fila a `Assignacions` i, abans del seminari, esborra les files de prova deixant la capçalera. Per a una prova repetida des del mateix navegador, esborra la dada local `seminari-grups-participant-v1` o utilitza una finestra privada nova.

En el full hi ha data, identificador aleatori, nivell i grup; no es demana nom. Mostra els números de grup a les taules. Si els participants responen des de navegadors o dispositius diferents, cada navegador compta com una persona. Un grup només pot rebre sis assignacions.

**Limitació de l'equilibri:** l'assignació és immediata. Amb les respostes encara desconegudes, cap algoritme pot garantir una barreja perfecta al final si els nivells arriben en un ordre desfavorable. Aquest algoritme manté els grups de mida similar i, entre grups de la mateixa mida, prefereix el que té menys persones del nivell indicat.

Si una persona canvia de nivell després de rebre grup o cal moure-la, fes el canvi al full manualment abans de continuar. No publiquis el full ni l'enllaç d'edició.
