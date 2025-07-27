const input = document.getElementById('commandInput');
const output = document.getElementById('output');

// Mobile detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const commands = {
    help: `Available commands:
    help       - Show available commands
    about      - Learn more about me
    social     - View my social links
    projects   - See my work
    clear      - Clear the terminal
    welcome    - Return to the welcome screen
    exit       - Say goodbye`,
  
    welcome: `

      ______ __ __ __           ________  $        $            
      |  _   |__|  |__.-----.   |   _   |__.-----|__.--.--.----.
      |  1___|  |  |  |  _  |   |   1___|  |     |  |  |  |   _|
      |  __) |__|__|__|   __|   |____   |__|__|__|  |_____|__|  
      |  |            |__|      |   1   |       |___|           
      |  |                      |       |                       
      \`--'                      \`-------'                       

  Welcome to my terminal portfolio. (Version 1.0.0)  
  ----  
  This project's source code can be found on  
  <a href="https://github.com/yourusername" target="_blank" rel="noopener">GitHub repo</a>  
  ----  
  Type help to see available commands.`,
  
    about: `Hi, I'm a developer focused on security, UI/UX, and automation scripting.`,
  
    social: `Instagram: 
  GitHub: https://github.com/filip90
  LinkedIn: https://linkedin.com/in/yourusername`,
  
    projects: `• Terminal-Portfolio
  • IOS app for runners in SwiftUI
  • harmless Virus in Python
  • Co-founder of a website (find it through the link in my bio)
  All that can be found on git Hub link up there.`,
  
    exit: `Session closed. Have a good day! 👋`,
  };
  

let history = [];
let histIndex = -1;

// Mobile-friendly input handling
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    executeCommand(cmd);
    history.unshift(cmd);
    histIndex = -1;
    input.value = '';
    // Keep focus on mobile
    if (isMobile) {
      setTimeout(() => input.focus(), 100);
    }
  } else if (e.key === 'ArrowUp') {
    if (histIndex < history.length - 1) {
      histIndex++;
      input.value = history[histIndex];
    }
  } else if (e.key === 'ArrowDown') {
    if (histIndex > 0) {
      histIndex--;
      input.value = history[histIndex];
    } else {
      input.value = '';
      histIndex = -1;
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    autocomplete(input.value);
  }
});

// Mobile touch improvements
if (isMobile) {
  // Add touch-friendly command buttons for mobile
  const mobileCommands = document.createElement('div');
  mobileCommands.className = 'mobile-commands';
  mobileCommands.innerHTML = `
    <div class="mobile-command-btn" data-cmd="help">help</div>
    <div class="mobile-command-btn" data-cmd="about">about</div>
    <div class="mobile-command-btn" data-cmd="social">social</div>
    <div class="mobile-command-btn" data-cmd="projects">projects</div>
    <div class="mobile-command-btn" data-cmd="clear">clear</div>
  `;
  
  // Insert before the input line
  const inputLine = document.querySelector('.input-line');
  inputLine.parentNode.insertBefore(mobileCommands, inputLine);
  
  // Add event listeners for mobile command buttons
  document.querySelectorAll('.mobile-command-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
      history.unshift(cmd);
      histIndex = -1;
      input.focus();
    });
  });
  
  // Prevent zoom on double tap
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Improve input focus on mobile
  document.addEventListener('touchstart', () => {
    if (document.activeElement !== input) {
      input.focus();
    }
  });
}

function executeCommand(cmdRaw) {
  const cmd = cmdRaw.toLowerCase();
  printLine(`you@portfolio:~$ ${cmdRaw}`, 'prompt');

  if (cmd === 'clear') {
    output.innerHTML = '';
    return;
  }

  if (commands[cmd]) {
    typeText(commands[cmd]);
  } else {
    typeText(`Command not found: ${cmd}. Try 'help'`);
  }
}

function printLine(text, cls = '') {
  const line = document.createElement('div');
  line.className = 'output-line ' + cls;
  line.textContent = text;
  output.appendChild(line);
  scrollToBottom();
}

function typeText(text, speed = 12) {
  const line = document.createElement('div');
  line.className = 'output-line';
  output.appendChild(line);
  let i = 0;
  (function type() {
    if (i < text.length) {
      line.textContent += text[i++];
      scrollToBottom();
      setTimeout(type, speed);
    }
  })();
}

function scrollToBottom() {
  output.scrollTop = output.scrollHeight;
}

function autocomplete(inputVal) {
  const val = inputVal.toLowerCase();
  const matches = Object.keys(commands).filter(cmd => cmd.startsWith(val));
  if (matches.length === 1) {
    input.value = matches[0];
  } else if (matches.length > 1) {
    printLine(matches.join('    '));
  }
}
