// Clock Functionality
function updateTime() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
  
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Extract the day, month, and year
    const day = now.toLocaleString('default', { weekday: 'long' });
    const month = now.toLocaleString('default', { month: 'short' });
    const date = now.getDate();
    const year = now.getFullYear();
  
    // Set the content for time and date
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${day} | ${date} ${month}' ${year}`;
  }
  
  setInterval(updateTime, 1000);
  
  // Toggle Popup Functionality
  function togglePopup(containerId) {
    document.getElementById(containerId).classList.toggle('hidden');
  }
  
  // Theme Button Functionality
  document.getElementById('theme-btn').addEventListener('click', () => {
    togglePopup('theme-container');
  });
  
  // Theme Selection Functionality
  const themeButtons = document.querySelectorAll('.theme-button');
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const videoPath = button.getAttribute('data-video');
      changeBackgroundVideo(videoPath);
      togglePopup('theme-container'); // Close the popup after selecting a theme
    });
  });
  
  function changeBackgroundVideo(videoPath) {
    const backgroundVideo = document.getElementById('background-video');
    const sourceElement = backgroundVideo.querySelector('source');
    sourceElement.src = videoPath;
    backgroundVideo.load();
    backgroundVideo.play();
  }
  
  // Music Button Functionality
  document.getElementById('music-btn').addEventListener('click', () => {
    togglePopup('music-container');
  });
  
  // Music Player Functionality
  const audioPlayer = document.getElementById('audio-player');
  const musicButtons = document.querySelectorAll('#music-list button');
  musicButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const musicSrc = event.target.getAttribute('data-src');
      audioPlayer.src = musicSrc;
      audioPlayer.play();
    });
  });
  
  // Pomodoro Timer Functionality
  let pomodoroTimer;
  let pomodoroTime = 25 * 60; // 25 minutes in seconds
  let isTimerRunning = false;
  
  document.getElementById('pomodoro-btn').addEventListener('click', () => {
    togglePopup('pomodoro-container');
  });
  
  document.getElementById('start-timer-btn').addEventListener('click', () => {
    if (!isTimerRunning) {
      pomodoroTimer = setInterval(updatePomodoroTimer, 1000);
      isTimerRunning = true;
      document.getElementById('start-timer-btn').textContent = 'Pause'; // Change button text to Pause
    } else {
      clearInterval(pomodoroTimer); // Clear the interval (pause)
      isTimerRunning = false;
      document.getElementById('start-timer-btn').textContent = 'Resume'; // Change button text to Resume
    }
  });
  
  document.getElementById('reset-timer-btn').addEventListener('click', () => {
    clearInterval(pomodoroTimer); // Stop the timer
    isTimerRunning = false;
    pomodoroTime = 25 * 60; // Reset to 25 minutes
    document.getElementById('timer-display').textContent = formatTime(pomodoroTime); // Reset display
    document.getElementById('start-timer-btn').textContent = 'Start'; // Change text back to Start
  });
  
  function updatePomodoroTimer() {
    if (pomodoroTime > 0) {
      pomodoroTime--; // Decrease the time
      document.getElementById('timer-display').textContent = formatTime(pomodoroTime); // Update display
    } else {
      clearInterval(pomodoroTimer); // Stop the timer when time is up
      alert("Pomodoro session is over!");
      isTimerRunning = false;
      document.getElementById('start-timer-btn').textContent = 'Start'; // Reset button to Start
    }
  }
  
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }
  
  // To-Do List Functionality
  document.getElementById('todo-btn').addEventListener('click', () => {
    togglePopup('todo-container');
  });
  
  document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('todo-input');
    if (taskInput.value) {
      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `${taskInput.value} <button class="delete-task-btn">X</button>`;
      document.getElementById('todo-list').appendChild(li);
      taskInput.value = '';
  
      li.querySelector('.delete-task-btn').addEventListener('click', () => {
        li.remove();
      });
    }
  });