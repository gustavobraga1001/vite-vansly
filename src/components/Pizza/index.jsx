import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        colors: ["rgba(0, 102, 204, 1)", "rgba(0, 59, 109, 1)", "rgba(147, 147, 147, 1)"], // Cores baseadas na imagem
        labels: ["Manhã", "Tarde", "Noite"], // Labels para a legenda
        legend: {
          position: "bottom", // Posição da legenda
          horizontalAlign: "center", // Alinhamento padrão central
          floating: false, // Para evitar comportamento flutuante
          markers: {
            radius: 12, // Tamanho dos círculos das legendas
          },
        },
        dataLabels: {
          formatter: function (val) {
            return val.toFixed(1) + "%";
          },
        },
      },
      series: [26.5, 26.5, 47], // Valores do gráfico
    };
  }

  render() {
    return (
      <div className="donut-chart-container">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width="380"
        />
      </div>
    );
  }
}

export default Donut;
