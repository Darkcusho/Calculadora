const history = [];

function appendNumber(number) 
{
    document.getElementById('display').value += number;
}

function appendOperator(operator) 
{
    const display = document.getElementById('display');
    const lastChar = display.value[display.value.length - 1];
    if ('+-*/^%'.includes(lastChar)) 
    {
        display.value = display.value.slice(0, -1) + operator;
    } 
    else 
    {
        display.value += operator;
    }
}

function appendFunction(func) 
{
    const display = document.getElementById('display');
    display.value += func + '(';
}

function clearDisplay() 
{
    const display = document.getElementById('display');
    if (display.value.trim() === '') 
    {
        // Si el display está vacío, borrar el historial
        history.length = 0;
        document.getElementById('history').innerHTML = '';
    } 
    else 
    {
        // Si el display no está vacío, limpiar el display
        display.value = '';
    }
}

function backspace() 
{
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() 
{
    try 
    {
        const display = document.getElementById('display');
        const expression = display.value.replace(/\^/g, '**');
        const result = eval(expression);

        // Agregar al historial
        addToHistory(`${display.value} = ${result}`);

        // Mostrar el resultado
        display.value = result;
    } 
    catch (error) 
    {
        display.value = 'Error';
    }
}

function addToHistory(entry) 
{
    if (history.length >= 5) 
    {
        history.shift();  // Elimina el elemento más antiguo si hay más de 5 elementos
    }
    history.push(entry);

    // Actualiza el historial en el HTML
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = history.join('<br>');
}