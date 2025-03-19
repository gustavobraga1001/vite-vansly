import React, { Component } from "react"
import Chart from "react-apexcharts"

class Donut extends Component {
  constructor(props) {
    super(props)

    const total = props.data.MANHA + props.data.TARDE + props.data.NOITE

    this.state = {
      options: {
        colors: ["rgba(0, 102, 204, 1)", "rgba(0, 59, 109, 1)", "rgba(147, 147, 147, 1)"],
        labels: ["Manhã", "Tarde", "Noite"],
        legend: {
          position: "bottom",
          horizontalAlign: "center",
          floating: false,
          markers: {
            radius: 12,
          },
        },
        dataLabels: {
          formatter: function (val) {
            return val.toFixed(1) + "%"
          },
        },
        plotOptions: {
          pie: {
            customScale: 1,
            donut: {
              size: "65%",
              labels: {
                show: true,
                total: {
                  show: true,
                  showAlways: true,
                  formatter: () => {
                    return `R$ ${total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
                  }
                }
              }
            }
          }
        }
      },
      series: [props.data.MANHA, props.data.TARDE, props.data.NOITE]
    }
  }

  render() {
    const total = this.state.series.reduce((acc, value) => acc + value, 0)

    return (
      <div className="donut-chart-container">
        {total === 0 ? (
          <div className="empty-message">
            <p>Nenhum dado disponível para exibir.</p>
          </div>
        ) : (
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            width="380"
          />
        )}
      </div>
    )
  }
}

export default Donut
