/*!
 * CalculatorDoIskailer
 * Calcula o valor total multiplicando qtde_horas por valor_hora na tabela especificada.
 * https://github.com/iskailer/TimeSheetCalculator
 */

(function() {
    'use strict';

    // Função que adiciona o cabeçalho "valor total"
    function addTotalColumnHeader(totalSum) {
        const tableHeader = document.querySelector('.ReactVirtualized__Table__headerRow');
        if (!tableHeader) {
            console.log('Table header not found!');
            return;
        }

        // Create the new header column
        const newHeaderColumn = document.createElement('div');
        newHeaderColumn.className = 'ReactVirtualized__Table__headerColumn header-column';
        newHeaderColumn.style.flex = '0 1 150px';
        newHeaderColumn.style.minWidth = '150px';
        newHeaderColumn.setAttribute('role', 'columnheader');
        newHeaderColumn.setAttribute('aria-label', 'valor total');

        const headerCell = document.createElement('div');
        headerCell.className = 'header-cell';
        headerCell.setAttribute('data-client-type', 'ghc-1');
        headerCell.setAttribute('data-filter-applied', 'false');

        const headerText = document.createElement('p');
        headerText.className = 'ReactVirtualized__Table__headerTruncatedText';
        headerText.setAttribute('data-client-id', 'gri-2');
        headerText.setAttribute('title', `valor total [${totalSum.toFixed(2)}]`);
        headerText.innerText = `valor total [${totalSum.toFixed(2)}]`;

        headerCell.appendChild(headerText);
        newHeaderColumn.appendChild(headerCell);
        tableHeader.appendChild(newHeaderColumn);
    }

    // Function to calculate the total hourly value and add it to each row
    function calculateTotalHourlyValue() {
        // Find the table with aria-label="grid"
        const table = document.querySelector('[aria-label="grid"]');
        if (!table) {
            console.log('Table not found!');
            return;
        }

        // // Add the "valor total" column header
        // addTotalColumnHeader();
        let totalSum = 0; // Variable to keep track of the total sum

        // Iterate over each row in the table
        const rows = table.querySelectorAll('[aria-label="row"]');
        rows.forEach(row => {
            try {
                // Get the quantity of hours and hourly rate cells
                const qtdeHorasCell = row.querySelector('[aria-colindex="14"]');
                const qtdeHrExtrasCell = row.querySelector('[aria-colindex="15"]');
                const qtdeHrSobreavisoCell = row.querySelector('[aria-colindex="16"]');
                const valorHoraCell = row.querySelector('[aria-colindex="10"]');

                if (qtdeHorasCell && valorHoraCell) {

                    // Extract the values and convert to numbers
                    let qtdeHoras = parseFloat(qtdeHorasCell.textContent.replace(',', '.'));
                    const valorHora = parseFloat(valorHoraCell.textContent.replace(',', '.'));
					//verifica hora extra e soma a hora total para calcular
					if (qtdeHrExtrasCell) {
						const qtdeHrExtras = parseFloat(qtdeHrExtrasCell.textContent.replace(',', '.'));
						if (!isNaN(qtdeHrExtras)) {
                            if (qtdeHrExtras>0) {
                                qtdeHrExtrasCell.style.backgroundColor = 'orange';
                                qtdeHrExtrasCell.style.color = 'white';
                                qtdeHoras = qtdeHoras +(qtdeHrExtras*2);
                            }
						}
					}
					//verifica hora de sobreaviso e soma a hora total para calcular
					if (qtdeHrSobreavisoCell) {
						const qtdeHrSobreaviso = parseFloat(qtdeHrSobreavisoCell.textContent.replace(',', '.'));
						if (!isNaN(qtdeHrSobreaviso)) {
                            if (qtdeHrSobreaviso>0) {
                                qtdeHrSobreavisoCell.style.backgroundColor = 'yellow';
                                qtdeHoras = qtdeHoras +(qtdeHrSobreaviso/3);
                            }
						}
					}

                    if (!isNaN(qtdeHoras) && !isNaN(valorHora)) {
                        if (qtdeHoras>0) {
                            // Highlight the qtde_horas cell in green
                            qtdeHorasCell.style.backgroundColor = 'green';
                            qtdeHorasCell.style.color = 'white';
                        }
                        // Calculate the total value
                        const totalValue = qtdeHoras * valorHora;

                        // Add to total sum
                        totalSum += totalValue;

                        // Create a new cell for the total value
                        const newCell = document.createElement('div');
                        newCell.className = 'ReactVirtualized__Table__rowColumn outer-cell';
                        newCell.setAttribute('role', 'gridcell');
                        newCell.style.flex = '0 1 150px';
                        newCell.style.minWidth = '150px';

                        const cellContent = document.createElement('div');
                        cellContent.className = 'cell-content';

                        const dataCell = document.createElement('div');
                        dataCell.className = 'data-cell bold';
                        dataCell.setAttribute('data-client-type', 'grc-1');
                        dataCell.setAttribute('title', totalValue.toFixed(2));
                        dataCell.style.backgroundColor = 'aquamarine';

                        const span = document.createElement('span');
                        span.innerText = totalValue.toFixed(2);

                        dataCell.appendChild(span);
                        cellContent.appendChild(dataCell);
                        newCell.appendChild(cellContent);

                        // Append the new cell to the row
                        row.appendChild(newCell);
                    }
                }
            } catch (error) {
                console.error('Error processing row: ', error);
            }
        });
        // Add the "valor total" column header with the total sum
        addTotalColumnHeader(totalSum);
    }

    // Create a button to manually trigger the script
    function createManualTriggerButton() {
        const button = document.createElement('button');
        button.innerText = 'Calcular Total';
        button.style.position = 'fixed';
        button.style.top = '5px';
        button.style.right = '10px';
        button.style.zIndex = 1000;
        button.style.padding = '10px';
        button.style.backgroundColor = 'red';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', calculateTotalHourlyValue);
        document.body.appendChild(button);
    }

    // Wait for the document to be fully loaded
    window.addEventListener('load', createManualTriggerButton);
})();
