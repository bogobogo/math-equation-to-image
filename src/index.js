const d3 = require('d3') ;
const html2canvas = require('html2canvas') ;

window.d3 = d3;

const functionPlot = require('function-plot');

const root = document.querySelector('#root');
const mathEquation = '1/x';
const equationInputField = document.getElementById('equation_input')
const downloadButton = document.getElementById('download');


console.log(equationInputField)
equationInputField.oninput = e => {
  try {
    createPlotAndImageDownload(e.target.value);
  } catch(e) {
    console.log('Looks like this is not a valid function');
  }
}

function createPlotAndImageDownload(equation) {
  functionPlot({
    target: root,
    yAxis: { domain: [-10, 10] },
    xAxis: { domain: [-10, 10] },
    tip: {
      renderer: function() {}
    },
    grid: true,
    data: [
      {
        fn: equation
      }
    ]
  });

  html2canvas(document.querySelector('svg')).then(canvas => {
      const image = canvas.toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
        console.log(image)
        downloadButton.download = equation + '.png';
      downloadButton.setAttribute('href', image )
    });
}

createPlotAndImageDownload(mathEquation)