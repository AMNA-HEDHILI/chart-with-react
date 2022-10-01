import React from 'react';
import Highcharts from "highcharts/highstock";
import PieChart from "highcharts-react-official";
import UserFunctions from './UserFunctions.js'
// Load Highcharts modules
import HighchartsData from 'highcharts/modules/data';
import HighchartsExporting from 'highcharts/modules/exporting';

HighchartsData(Highcharts);
HighchartsExporting(Highcharts);



export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options : {
        chart: {
          type: "pie"
        },
        title: {
          text: "Gender statistics"
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: false
          }
        },
        series: [
          {
            name: "Gender",
            colorByPoint: true,
            data: [
              {
                name:'male',
                y: 0,
                sliced: true
              },
              {
                name:'female',
                y: 0,
                sliced: true
              }
            ]
          }
        ]
      }
    }
    this.getChart = this.getChart.bind(this);
    
}


getChart(event){
  if(event.target.value==="Gender"){
    UserFunctions.get_Gender().then((res) => {
      console.log(res.data)
      if (res.data == null) {
          this.props.history.push('/');
          
      } 
      let male=res.data[0]['male'];
      let female=res.data[0]['female'];
      let total=res.data[0]['total'];
      this.setState({ 
      options:{
        title: {
          text: "Gender statistics"
        },
        series:{
          name: "Gender",
          data: [
          {
            y: (male/total)*100
          },
          {
            y: (female/total)*100
          }
        ]
        }
      }});
      
  });
  }else{
    UserFunctions.get_Product_Line().then((res) => {
      console.log(res.data)
      if (res.data == null) {
          this.props.history.push('/');
          
      }
      let total=res.data[0]['total'];
      let newData=[];
      for (let i = 0; i < res.data.length; i++) {
        let name=res.data[i]['name'];
        let count=res.data[i]['som'];
        newData.push({
          name:name,
          y:(count/total)*100
        });
      }
      console.log(newData);
      this.setState({ 
      options:{
        title: {
              text: "Product_Line statistics"
            },
        series:{
          name: "Product Line",
          data: newData
        }
      }});
      
    });
  }
  

}

componentDidMount() {
  UserFunctions.get_Gender().then((res) => {
        console.log(res.data)
        if (res.data == null) {
            this.props.history.push('/');
            
        } 
        let male=res.data[0]['male'];
        let female=res.data[0]['female'];
        let total=res.data[0]['total'];
        this.setState({ 
        options:{
          series:{
            data: [
            {
              y: (male/total)*100
            },
            {
              y: (female/total)*100
            }
          ]
          }
        }});

        
    });
}


  render() {
    const mystyle1 = {
      color: "cornflowerblue",
      fontSize: "20px"
    };

    const mystyle = {
      position:"relative",
      left: "100px",
      fontSize: "15px"
    };

    return (
      <div>
        <div style={mystyle}>
        <h3 style={mystyle1}> Change attribut</h3>
        <select  id="attribut" onChange={this.getChart} value={this.state.value}>
          <option value="Gender">Gender</option>
          <option value="Product">Product Line</option>
        </select>
        </div>
        <PieChart highcharts={Highcharts} options={this.state.options} />
      </div>
    );
  }
}