// Retrieve all elements with inline styles
const elements = document.querySelectorAll('[style]');

// Generate unique class names
let counter = 1;

// Store CSS rules and corresponding class names
const cssRules = {};

elements.forEach((element) => {
  // Extract inline styles
  const inlineStyles = element.getAttribute('style');

  // Check if a class with the same styles already exists
  const existingClass = Object.keys(cssRules).find((className) => cssRules[className] === inlineStyles);

  if (existingClass) {
    // Reuse existing class
    element.classList.add(existingClass);
  } else {
    // Generate a unique class name
    const className = `class-${counter}`;

    // Apply the unique class to the element
    element.classList.add(className);

    // Store the CSS rule in the object
    cssRules[className] = inlineStyles;

    // Increment the counter for the next element
    counter++;
  }
});

// Generate CSS code from the cssRules object
const cssCode = Object.entries(cssRules)
  .map(([className, rule]) => `.${className} { ${rule} }`)
  .join('\n');

// Create a Blob with the CSS code
const blob = new Blob([cssCode], { type: 'text/css' });

// Create a temporary URL for the Blob
const url = URL.createObjectURL(blob);

// Create a temporary link element
const link = document.createElement('a');
link.href = url;
link.download = 'styles.css';

// Programmatically trigger a click event on the link element
link.click();

// Clean up the temporary URL object
URL.revokeObjectURL(url);
