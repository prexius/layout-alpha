"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChangeFontsPage() {
	return (
		<div className="space-y-6">
			<div className="space-y-3">
				<h1 id="changing-fonts" className="scroll-m-20 text-3xl font-semibold tracking-tight">
					Changing Fonts
				</h1>
				<p className="text-xl text-muted-foreground">
					Learn how to customize the typography of your Expenzo application.
				</p>
			</div>

			<div className="space-y-4">
				<h2 id="overview" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-4">
					Overview
				</h2>
				<p>
					Expenzo uses Tailwind CSS for styling, including typography. You can customize the fonts by modifying the{" "}
					<code>tailwind.config.js</code> file and adding font imports to your <code>globals.css</code> file.
				</p>

				<h2 id="current-fonts" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6">
					Current Font Configuration
				</h2>
				<p>
					By default, Expenzo uses the system font stack, which provides a native look and feel on different
					operating systems. Here's how to check and modify the current font configuration:
				</p>

				<h2 id="customization-options" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6">
					Customization Options
				</h2>

				<Tabs defaultValue="google-fonts">
					<TabsList className="grid w-full grid-cols-3">
						<TabsTrigger value="google-fonts">Google Fonts</TabsTrigger>
						<TabsTrigger value="local-fonts">Local Fonts</TabsTrigger>
						<TabsTrigger value="variable-fonts">Variable Fonts</TabsTrigger>
					</TabsList>

					<TabsContent value="google-fonts" className="space-y-4 mt-4">
						<h3 id="google-fonts" className="scroll-m-20 text-xl font-semibold tracking-tight">
							Using Google Fonts
						</h3>
						<p>
							Google Fonts is a popular and easy way to add custom fonts to your application. Here's how to add and use
							Google Fonts in Expenzo:
						</p>

						<h4 className="text-lg font-medium mt-4">Step 1: Import the Font in globals.css</h4>
						<p>First, import the font from Google Fonts in your globals.css file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/* In globals.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

/* Rest of your CSS */`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 2: Add the Font to Tailwind Config</h4>
						<p>Next, add the font to your tailwind.config.js file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // ... other theme extensions
    },
  },
  // ... other config
}`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 3: Use the Font in Your Components</h4>
						<p>Now you can use the font in your components:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`// For the default sans font (Inter)
<p className="font-sans">This text uses the Inter font.</p>

// For the heading font (Poppins)
<h1 className="font-heading">This heading uses the Poppins font.</h1>`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 4: Apply Font to the Entire Application</h4>
						<p>
							If you want to apply the font to the entire application, you can add it to the <code>html</code> or{" "}
							<code>body</code> element in your layout component:
						</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`// In app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}`}</code>
							</pre>
						</div>
					</TabsContent>

					<TabsContent value="local-fonts" className="space-y-4 mt-4">
						<h3 id="local-fonts" className="scroll-m-20 text-xl font-semibold tracking-tight">
							Using Local Fonts
						</h3>
						<p>
							For better performance and to avoid relying on external services, you can use local fonts. Here's how to
							add and use local fonts in Expenzo:
						</p>

						<h4 className="text-lg font-medium mt-4">Step 1: Add Font Files to Your Project</h4>
						<p>First, add your font files to the public directory of your project:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`public/
  fonts/
    Montserrat-Regular.woff2
    Montserrat-Medium.woff2
    Montserrat-SemiBold.woff2
    Montserrat-Bold.woff2`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 2: Define Font Faces in globals.css</h4>
						<p>Next, define the font faces in your globals.css file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/* In globals.css */
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* Rest of your CSS */`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 3: Add the Font to Tailwind Config</h4>
						<p>Add the font to your tailwind.config.js file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // ... other theme extensions
    },
  },
  // ... other config
}`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 4: Use the Font in Your Components</h4>
						<p>Now you can use the font in your components:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`<p className="font-sans font-normal">Regular text</p>
<p className="font-sans font-medium">Medium text</p>
<p className="font-sans font-semibold">Semi-bold text</p>
<p className="font-sans font-semibold">Bold text</p>`}</code>
							</pre>
						</div>
					</TabsContent>

					<TabsContent value="variable-fonts" className="space-y-4 mt-4">
						<h3 id="variable-fonts" className="scroll-m-20 text-xl font-semibold tracking-tight">
							Using Variable Fonts
						</h3>
						<p>
							Variable fonts provide multiple variations of a typeface in a single font file, which can improve
							performance and flexibility. Here's how to use variable fonts in Expenzo:
						</p>

						<h4 className="text-lg font-medium mt-4">Step 1: Add the Variable Font to Your Project</h4>
						<p>First, add your variable font file to the public directory:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`public/
  fonts/
    Inter-Variable.woff2`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 2: Define the Font Face in globals.css</h4>
						<p>Next, define the font face in your globals.css file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/* In globals.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Rest of your CSS */`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 3: Add the Font to Tailwind Config</h4>
						<p>Add the font to your tailwind.config.js file:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      // ... other theme extensions
    },
  },
  // ... other config
}`}</code>
							</pre>
						</div>

						<h4 className="text-lg font-medium mt-4">Step 4: Use the Font with Different Weights</h4>
						<p>Now you can use the font with different weights in your components:</p>

						<div className="relative my-4 rounded-md bg-muted p-4">
							<pre className="text-sm font-mono">
								<code>{`<p className="font-sans font-thin">Thin text (weight 100)</p>
<p className="font-sans font-light">Light text (weight 300)</p>
<p className="font-sans font-normal">Regular text (weight 400)</p>
<p className="font-sans font-medium">Medium text (weight 500)</p>
<p className="font-sans font-semibold">Semi-bold text (weight 600)</p>
<p className="font-sans font-semibold">Bold text (weight 700)</p>
<p className="font-sans font-extrabold">Extra-bold text (weight 800)</p>
<p className="font-sans font-black">Black text (weight 900)</p>`}</code>
							</pre>
						</div>
					</TabsContent>
				</Tabs>

				<h2 id="complete-example" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6">
					Complete Example
				</h2>
				<p>Here's a complete example of customizing the fonts in Expenzo:</p>

				<div className="relative my-6 rounded-md bg-muted p-4 overflow-x-auto">
					<pre className="text-sm font-mono">
						<code>{`/* In globals.css */
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

/* Rest of your CSS */

/* In tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      // ... other theme extensions
    },
  },
  // ... other config
}

/* In app/layout.jsx */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

/* In a component */
export function Typography() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold font-sans">Heading in Raleway</h1>
      <p className="text-lg font-serif">This paragraph uses Merriweather, a serif font.</p>
      <p className="text-base font-sans">This paragraph uses Raleway, a sans-serif font.</p>
      <p className="text-sm font-sans font-medium">This is medium weight Raleway.</p>
      <p className="text-sm font-sans font-semibold">This is semi-bold Raleway.</p>
      <p className="text-sm font-sans font-semibold">This is bold Raleway.</p>
    </div>
  )
}`}</code>
					</pre>
					<Button
						variant="ghost"
						size="icon"
						className="absolute right-2 top-2"
						onClick={() => {
							navigator.clipboard.writeText(`/* In globals.css */
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

/* Rest of your CSS */

/* In tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  // ... other config
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      // ... other theme extensions
    },
  },
  // ... other config
}

/* In app/layout.jsx */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}

/* In a component */
export function Typography() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-semibold font-sans">Heading in Raleway</h1>
      <p className="text-lg font-serif">This paragraph uses Merriweather, a serif font.</p>
      <p className="text-base font-sans">This paragraph uses Raleway, a sans-serif font.</p>
      <p className="text-sm font-sans font-medium">This is medium weight Raleway.</p>
      <p className="text-sm font-sans font-semibold">This is semi-bold Raleway.</p>
      <p className="text-sm font-sans font-semibold">This is bold Raleway.</p>
    </div>
  )
}`)
						}}
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 15 15"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="h-4 w-4"
						>
							<path
								d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
								fill="currentColor"
								fillRule="evenodd"
								clipRule="evenodd"
							></path>
						</svg>
						<span className="sr-only">Copy code</span>
					</Button>
				</div>

				<h2 id="best-practices" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6">
					Best Practices
				</h2>
				<ul className="list-disc pl-6 space-y-2 my-4">
					<li>
						<strong>Performance</strong> - Use font subsetting to include only the characters you need, and consider
						using variable fonts to reduce the number of font files.
					</li>
					<li>
						<strong>Font Loading</strong> - Use <code>font-display: swap</code> to ensure text is visible while fonts
						are loading.
					</li>
					<li>
						<strong>Consistency</strong> - Limit the number of font families to 2-3 for a clean, consistent design.
					</li>
					<li>
						<strong>Fallbacks</strong> - Always include appropriate fallback fonts in your font stack.
					</li>
					<li>
						<strong>Accessibility</strong> - Choose fonts that are legible and have good readability at different sizes.
					</li>
				</ul>

				<h2 id="font-resources" className="scroll-m-20 text-2xl font-semibold tracking-tight pt-6">
					Useful Font Resources
				</h2>
				<ul className="list-disc pl-6 space-y-2 my-4">
					<li>
						<a
							href="https://fonts.google.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline"
						>
							Google Fonts
						</a>{" "}
						- A library of free licensed font families.
					</li>
					<li>
						<a href="https://fontpair.co/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
							Font Pair
						</a>{" "}
						- Suggestions for font pairings that work well together.
					</li>
					<li>
						<a href="https://v-fonts.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
							V-Fonts
						</a>{" "}
						- A resource for finding and trying variable fonts.
					</li>
					<li>
						<a
							href="https://type-scale.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary underline"
						>
							Type Scale
						</a>{" "}
						- A visual calculator to help create a harmonious type scale.
					</li>
				</ul>
			</div>
		</div>
	)
}
