$(function () {


  // Get checklist percentage function (shared with index.html)
  	function getChecklistPercentage(slot = null) {
    	const key = slot ? `checklist3dsMaxState${slot}` : 'checklist3dsMaxState';
    	const saved = localStorage.getItem(key);
    	if (saved) {
      		const state = JSON.parse(saved);
      		return state.percentage || 0;
    	}
    	return 0;
  	}
// =====================================
// Breakup (BricsCAD Progress)
// =====================================


// =====================================
  // Breakup2 (3DS Max) - Dynamic from checklist
  // =====================================
	const initialPercentage = getChecklistPercentage();
	var breakup2 = {
		series: [initialPercentage],  // Loads saved checklist %
    	labels: ["3DS Max"],
    	chart: {
      		height: 260,
      		type: "radialBar",
      		fontFamily: "Plus Jakarta Sans', sans-serif",
      		foreColor: "#adb0bb",
    	},
    	plotOptions: {
      		radialBar: {
        		hollow: { size: "70%" },
        		track: { background: "#ecf2ff" },
        		dataLabels: {
          			name: { show: true, fontSize: "14px" },
          			value: {
            			show: true,
            			fontSize: "18px",
            			formatter: function (val) { return Math.round(val) + "%"; }
          			},
          			total: { show: false }
        		}
      		}
    	},
    	colors: ["#5D87FF"],
    	stroke: { lineCap: "round" }
  	};
  	window.breakup2Chart = new ApexCharts(document.querySelector("#breakup2"), breakup2);  // Global for updates
  	window.breakup2Chart.render();
  	// Auto-update when checklist saves (cross-tab)
  	window.addEventListener('storage', (e) => {
		if (e.key && e.key.startsWith('checklist3dsMaxState')) {
  			const perc = getChecklistPercentage();
      		window.breakup2Chart.updateOptions({ series: [perc] });
    	}
  	});
  // =====================================
  // Earning
  // =====================================
  var earning = {
    chart: {
      id: "sparkline3",
      type: "area",
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
      fontFamily: "Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
    },
    series: [
      {
        name: "Earnings",
        color: "#49BEFF",
        data: [25, 66, 20, 40, 12, 58, 20],
      },
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      colors: ["#f3feff"],
      type: "solid",
      opacity: 0.05,
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: "dark",
      fixed: {
        enabled: true,
        position: "right",
      },
      x: {
        show: false,
      },
    },
  };
  new ApexCharts(document.querySelector("#earning"), earning).render();
})