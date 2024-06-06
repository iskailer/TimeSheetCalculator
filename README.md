## Instalar Tampermonkey

Instale a extensão Tampermonkey no Chrome
https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-BR&utm_source=ext_sidebar

## Configurar o script de calculadora

- Com o Tampermonkey instalado, apague o texto padrão e substitua pelo texto abaixo

  '''js
// ==UserScript==
// @name         CalculatorDoIskailer
// @version      1.0
// @description  Calcula o valor total multiplicando qtde_horas por valor_hora na tabela especificada.
// @author       Iskailer
// @source       https://github.com/iskailer/TimeSheetCalculator
// @match        https://dynamicview.smartsheet.com/views/2fe96013-cc75-4d6b-a526-a01475e098fc
// @require      https://raw.githubusercontent.com/iskailer/TimeSheetCalculator/main/test.js
// @grant        none
// ==/UserScript==
  ''' 
