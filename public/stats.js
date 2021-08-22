function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}

function getResistanceExerciseNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      if (exercise.type === "resistance") {
        workouts.push(exercise.name);
      }
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

function getExerciseDurations(data, names) {
  const durations = new Array(names.length).fill(0);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].exercises.length; j++) {
      const index = names.indexOf(data[i].exercises[j].name);
      if (index >= 0) {
        durations[index] += data[i].exercises[j].duration;
      }
    }
  }
  return durations;
}

function calculateExerciseWeight(data, names) {
  const weight = new Array(names.length).fill(0);

  const getData = [];

  data.forEach((d) => {
    d.exercises.forEach((exer) => {
      if (exer.type === "resistance") {
        getData.push(exer);
      }
    });
  });

  for (let i = 0; i < getData.length; i++) {
    const index = names.indexOf(getData[i].name);
    if (index >= 0) {
      weight[index] += getData[i].weight;
    }
  }

  return weight;
}

function populateChart(data) {
  let durations = data.map(({ totalDuration }) => totalDuration);
  let pounds = calculateTotalWeight(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  const exerciseDurations = getExerciseDurations(data, workouts);
  const resistanceExerciseNames = getResistanceExerciseNames(data);

  const pounds2 = calculateExerciseWeight(data, resistanceExerciseNames);

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const labels = data.map(({ day }) => {
    const date = new Date(day);
    return daysOfWeek[date.getDay()];
  });

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: exerciseDurations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: resistanceExerciseNames,
      datasets: [
        {
          label: "Exercises Performed",
          backgroundColor: colors,
          data: pounds2,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercises Performed",
      },
    },
  });
}

function calculateTotalWeight(data) {
  let totals = [];

  data.forEach((workout) => {
    const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
      if (type === "resistance") {
        return total + weight;
      } else {
        return total;
      }
    }, 0);

    totals.push(workoutTotal);
  });

  return totals;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(workouts)];
}

// get all workout data from back-end
API.getWorkoutsInRange().then(populateChart);
