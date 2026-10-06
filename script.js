document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('palindrome-form');
  const textInput = document.getElementById('text-input');
  const clearBtn = document.getElementById('clear-btn');
  const resultBox = document.getElementById('result-box');
  const resultStatus = document.getElementById('result-status');
  const cleanedTextSpan = document.getElementById('cleaned-text');
  const reversedTextSpan = document.getElementById('reversed-text');
  const longestSpan = document.getElementById('longest-palindrome');
  const presetBtns = document.querySelectorAll('.preset-btn');

  // Input listener for clearing text
  textInput.addEventListener('input', () => {
    if (textInput.value.length > 0) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  });

  clearBtn.addEventListener('click', () => {
    textInput.value = '';
    clearBtn.classList.add('hidden');
    resultBox.classList.add('hidden');
    textInput.focus();
  });

  // Stretch Feature Algorithm: Find the longest palindrome inside a string
  function findLongestPalindromeSubstring(str) {
    if (!str || str.length === 0) return "";
    
    let longest = "";

    function expandFromCenter(left, right) {
      while (left >= 0 && right < str.length && str[left] === str[right]) {
        const current = str.substring(left, right + 1);
        if (current.length > longest.length) {
          longest = current;
        }
        left--;
        right++;
      }
    }

    for (let i = 0; i < str.length; i++) {
      expandFromCenter(i, i);     // Odd length center
      expandFromCenter(i, i + 1); // Even length center
    }

    return longest;
  }

  // Main Palindrome Check Logic
  function evaluateInput(rawText) {
    const input = rawText.trim();
    if (!input) {
      alert('Please enter some text to check.');
      return;
    }

    // Step 1: Normalize string (remove non-alphanumeric chars & convert to lowercase)
    const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
    const reversed = cleaned.split('').reverse().join('');
    
    // Step 2: Check if entire input is a palindrome
    const isPalindrome = cleaned.length > 0 && cleaned === reversed;

    // Step 3: Find the longest palindromic substring (Stretch Goal)
    const longestSub = findLongestPalindromeSubstring(cleaned);

    // Step 4: Render results to DOM
    cleanedTextSpan.textContent = cleaned || '(no alphanumeric characters)';
    reversedTextSpan.textContent = reversed || '(no alphanumeric characters)';
    
    resultBox.classList.remove('hidden', 'success', 'fail');

    if (isPalindrome) {
      resultBox.classList.add('success');
      resultStatus.textContent = `✅ "${input}" is a palindrome!`;
    } else {
      resultBox.classList.add('fail');
      resultStatus.textContent = `❌ "${input}" is NOT a palindrome.`;
    }

    // Display longest substring stretch result
    if (longestSub && longestSub.length >= 2) {
      longestSpan.textContent = `"${longestSub}" (${longestSub.length} characters)`;
    } else {
      longestSpan.textContent = 'None found (minimum 2 chars)';
    }
  }

  // Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    evaluateInput(textInput.value);
  });

  // Example Buttons Handlers (5 Presets)
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const exampleText = btn.getAttribute('data-text');
      textInput.value = exampleText;
      clearBtn.classList.remove('hidden');
      evaluateInput(exampleText);
    });
  });
});
