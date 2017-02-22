/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2017-01-02");
  var datStr = ''
  for (var i = 1; i < 91; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  currSelectCity: '-select a city-',
  currGraTime: "day"
}

/**渲染图表**/
function renderChart() {
  var graphTitle = document.querySelector('h1.graph-title');
  var text = "Please Select a City";
  var barWidth, barInterval;
  if (pageState.currSelectCity !== '-select a city-'){
    switch(pageState.currGraTime){
      case("day"): {
        text = "Daily";
        barWidth = 10;
        offset = 50;
        break;
      }
      case("week"): {
        text = "Weekly";
        barWidth = 50;
        offset = 150;
        break;
      }
      case("month"): {
        text = "Monthly";
        barWidth = 200;
        offset = 100;
        break;
      }
    };
    text += " Air Quality in " + pageState.currSelectCity;
  }
  graphTitle.innerHTML = text;

  var myCanvas = document.querySelector("div.aqi-chart-wrap");
  var content = "";
  var index = 0;
  for (var aqiData in chartData){
    var randomColor = color = '#' + (0xFF0000 + Math.floor(Math.random() * 0x00FFFF)).toString(16);

    content += '<div title="Air quality on ' + aqiData + ': ' + chartData[aqiData] +'" class="bar" style="background-color: ' + randomColor + '; height: ' + chartData[aqiData] + 'px; width: ' + barWidth + 'px; left:' + (offset + index*barWidth) + 'px"></div>';
    index += 1;
  }
  myCanvas.innerHTML = content;
}

/**日、周、月的radio事件点击时的处理函数**/
function graTimeChange() {
  // 确定是否选项发生了变化 
  var currntTime = this.value;
  // 设置对应数据
  if (pageState.currGraTime !== currntTime){
    pageState.currGraTime = currntTime;
  }
  console.log(pageState);
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**select发生变化时的处理函数**/
function citySelectChange() {
  // 确定是否选项发生了变化 
  var currentCity = this.value;
  // 设置对应数据
  if (pageState.currSelectCity !== currentCity){
    pageState.currSelectCity = currentCity;
  }
  console.log(pageState);
  // 调用图表渲染函数
  initAqiChartData();
  renderChart();
}

/**初始化日、周、月的radio事件，当点击时，调用函数graTimeChange**/
function initGraTimeForm() {
  var timeRadio = document.getElementById('form-gra-time').getElementsByTagName('input');
  for (var i = 0; i < timeRadio.length; ++i){
    timeRadio[i].addEventListener('click', graTimeChange, false);
  }
}

/**初始化城市Select下拉选择框中的选项**/
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelector = document.getElementById('city-select');
  var cityOptions = '<option data-city="-1">-Select a city-</option>';

  for (var aqiCity in aqiSourceData){
    cityOptions += '<option data-city="' + aqiCity + '">' + aqiCity + '</option>';
  }

  citySelector.innerHTML = cityOptions;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  citySelector.addEventListener('change', citySelectChange);
}

/**初始化图表需要的数据格式**/
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData中
  var cityData = {};

  //First select city
  if (pageState.currSelectCity === '-select a city-'){
    cityData = {}; //Because no city is selected when initializing.  
  }else{
    for (var city in aqiSourceData){
      if (city === pageState.currSelectCity){
        cityData = aqiSourceData[city];
      }
    }
  }


  //Then adjust data into proper type according to timeRadio
  switch(pageState.currGraTime){

    case 'day': {
      chartData = cityData;
      break;
    }

    case 'week':{
      chartData = {};

      var aqiSum = 0, days = 0, week = 0;
      for (var dateStr in cityData){
        aqiSum += cityData[dateStr];
        days += 1;
        if ((new Date(dateStr)).getDay() == 6){
          week += 1;
          chartData['Week ' + week] = Math.floor(aqiSum / days);
          aqiSum = 0;
          days = 0;
        }
      }
      if (days != 0){
        week = week + 1;
        chartData['Week ' + week] = aqiSum / days;
      }
      break;
    }

    case 'month':{
      
      chartData = {};

      //create hashmap to store month info{month: {aqiSum: xxx, days: xxx }};
      for (var dateStr in cityData){
        var currentDate = new Date(dateStr);
        
        
        currMonth = currentDate.getMonth() + 1;

        if (chartData['Month ' + currMonth] === undefined){
          chartData['Month ' + currMonth] = {days: 1, aqiSum: cityData[dateStr]};
        }else{
          var monthObj = chartData['Month ' + currMonth];
          monthObj.days += 1;
          monthObj.aqiSum += cityData[dateStr];
        }
      }

      for (var month in chartData){
        var monthObj = chartData[month];
        chartData[month] = Math.floor(monthObj.aqiSum / monthObj.days);
      }

      break;
    }

  } 
  console.log(chartData);
}

/**初始化函数**/
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

window.onload = function(){
  init();
}
