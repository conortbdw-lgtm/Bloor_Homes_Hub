$(function () {

	// Get checklist percentage functions (shared with index.html)
	// Status text helpers for Testing - Externals
	function getChecklistStatusText(percent) {
    	if (percent === 0) return 'Not started';
    	if (percent === 100) return 'Complete';
    	return 'In Progress';
  	}
	
  	function updateTestingExternalsStatus() {
    	const percent = getChecklistPercentage5();
    	const status = getChecklistStatusText(percent);
    	const titleEl = document.getElementById('testing-externals-status');
    	if (titleEl) {
      		titleEl.textContent = status;
		}
	}

  	function updateSceneFileSpinStatus() {
    	const percent = getChecklistPercentage4();
    	const status = getChecklistStatusText(percent);
    	const titleEl = document.getElementById('scene-file-spin-status');
    	if (titleEl) {
      		titleEl.textContent = status;
    	}
  	}
	
	function updateBricscadStatus() {
  		const percent = getChecklistPercentage2(); // BricsCAD
  		const status = getChecklistStatusText(percent);
  		const titleEl = document.getElementById('bricscad-status');
  		if (titleEl) {
    		titleEl.textContent = status;
  		}
	}

	function updateMaxStatus() {
  		const percent = getChecklistPercentage(); // 3DS Max
  		const status = getChecklistStatusText(percent);
  		const titleEl = document.getElementById('max-status');
  		if (titleEl) {
    		titleEl.textContent = status;
  		}
	}

	function updateQc1Status() {
  		const percent = getChecklistPercentage3(); // QC1
  		const status = getChecklistStatusText(percent);
  		const titleEl = document.getElementById('qc1-status');
  		if (titleEl) {
    		titleEl.textContent = status;
  		}
	}
	
 	updateTestingExternalsStatus();
	updateSceneFileSpinStatus();
	updateBricscadStatus();
	updateMaxStatus();
	updateQc1Status();
	
  	function getChecklistPercentage(slot = null) {
    	const key = slot ? `checklist3dsMaxState${slot}` : 'checklist3dsMaxState';
    	const saved = localStorage.getItem(key);
    	if (saved) {
      		const state = JSON.parse(saved);
      		return state.percentage || 0;
    	}
    	return 0;
  	}

  	function getChecklistPercentage2(slot = null) {
    	const key = slot ? `checklistBricscadState${slot}` : 'checklistBricscadState';
    	const saved = localStorage.getItem(key);
    	if (saved) {
      		const state = JSON.parse(saved);
      		return state.percentage || 0;
    	}
    	return 0;
  	}

  	function getChecklistPercentage3(slot = null) {
    	const key = slot ? `checklistQC1State${slot}` : 'checklistQC1State';
    	const saved = localStorage.getItem(key);
    	if (saved) {
      		const state = JSON.parse(saved);
      		return state.percentage || 0;
    	}
    	return 0;
  	}

	function getChecklistPercentage4(slot = null) {
    		const key = slot ? `checklistSFSpin${slot}` : 'checklistSFSpin';
    		const saved = localStorage.getItem(key);
    		if (saved) {
      			const state = JSON.parse(saved);
      			return state.percentage || 0;
    		}
    	return 0;
  	}

  	function getChecklistPercentage5(slot = null) {
    	const key = slot ? `checklistTestExternals${slot}` : 'checklistTestExternals';
    	const saved = localStorage.getItem(key);
    	if (saved) {
      		const state = JSON.parse(saved);
      		return state.percentage || 0;
    	}
    	return 0;
  	}
	
  	// Breakup1 (BricsCAD) - Dynamic from checklist
	const initialPercentage1 = getChecklistPercentage2();
	var breakup1 = {
		series: [initialPercentage1],  // Loads saved checklist %
    	labels: ["BricsCAD"],
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
	window.breakup1Chart = new ApexCharts(document.querySelector("#breakup1"), breakup1);  // Global for updates
  	window.breakup1Chart.render();
	
  	// Auto-update when checklist saves (cross-tab)
	window.addEventListener('storage', (e) => {
		if (e.key && e.key.startsWith('checklistBricscadState')) {
  			const perc = getChecklistPercentage2();
  			window.breakup1Chart.updateOptions({ series: [perc] });
  			updateBricscadStatus();
		}
	});
	
  	// Breakup2 (3DS Max) - Dynamic from checklist
	const initialPercentage2 = getChecklistPercentage();
	var breakup2 = {
		series: [initialPercentage2],  // Loads saved checklist %
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
  			updateMaxStatus();
		}
	});
	
  	// Breakup3 (QC1) - Dynamic from checklist
	const initialPercentage3 = getChecklistPercentage3();
	var breakup3 = {
		series: [initialPercentage3],  // Loads saved checklist %
    	labels: ["Quality Control"],
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
  	window.breakup3Chart = new ApexCharts(document.querySelector("#breakup3"), breakup3);  // Global for updates
  	window.breakup3Chart.render();
	
  	// Auto-update when checklist saves (cross-tab)
  	window.addEventListener('storage', (e) => {
		if (e.key && e.key.startsWith('checklistQC1State')) {
  			const perc = getChecklistPercentage3();
  			window.breakup3Chart.updateOptions({ series: [perc] });
  			updateQc1Status();
		}
	});
	
  	// Breakup4 (Scene File - Spin) - Dynamic from checklist
	const initialPercentage4 = getChecklistPercentage4();
	var breakup4 = {
		series: [initialPercentage4],  // Loads saved checklist %
    	labels: ["Scene File - Spin"],
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
	window.breakup4Chart = new ApexCharts(document.querySelector("#breakup4"), breakup4);  // Global for updates
  	window.breakup4Chart.render();
	
  	// Auto-update when checklist saves (cross-tab)
  	window.addEventListener('storage', (e) => {
		if (e.key && e.key.startsWith('checklistSFSpin')) {
  			const perc = getChecklistPercentage4();
      		window.breakup4Chart.updateOptions({ series: [perc] });
    	}
	});
	window.addEventListener('storage', (e) => {
  		if (e.key && e.key.startsWith('checklist-sf-spin-status')) {
    		const perc = getChecklistPercentage4();
    		window.breakup4Chart.updateOptions({ series: [perc] });
    		updateTestingExternalsStatus();
  		}
	});
	
  	// Breakup5 (Testing - Externals) - Dynamic from checklist
	const initialPercentage5 = getChecklistPercentage5();
	var breakup5 = {
		series: [initialPercentage5],  // Loads saved checklist %
    	labels: ["Testing - Externals"],
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
	window.breakup5Chart = new ApexCharts(document.querySelector("#breakup5"), breakup5);  // Global for updates
  	window.breakup5Chart.render();
	
  	// Auto-update when checklist saves (cross-tab)
	window.addEventListener('storage', (e) => {
  		if (e.key && e.key.startsWith('checklistTestExternals')) {
    		const perc = getChecklistPercentage5();
    		window.breakup5Chart.updateOptions({ series: [perc] });
    		updateTestingExternalsStatus();
  		}
	});
})