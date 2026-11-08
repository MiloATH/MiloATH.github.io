document.addEventListener('DOMContentLoaded', () => {
	// Anti-spam email obfuscation
	const domain = ['m', 'o', 'c', '.', 'l', 'i', 'a', 'm', 'g'].reverse().join('');
	const user = ['e', 'o', 's', 't', 'r', 'a', 'h', 'o', 'l', 'i', 'm'].reverse().join('');
	const mailto = `mailto:${user}@${domain}`;

	['antispam', 'antispam-hero'].forEach((id) => {
		const el = document.getElementById(id);
		if (el) {
			el.setAttribute('href', mailto);
		}
	});

	// Dynamic copyright year
	const yearEl = document.getElementById('year');
	if (yearEl) {
		yearEl.textContent = new Date().getFullYear();
	}

	// Theme toggle (Light / Dark mode)
	const toggleBtn = document.getElementById('theme-toggle');
	const root = document.documentElement;

	if (toggleBtn) {
		toggleBtn.addEventListener('click', () => {
			const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
			const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
			root.setAttribute('data-theme', nextTheme);
			localStorage.setItem('theme', nextTheme);
		});
	}

	// Respect OS theme changes if user hasn't explicitly set a preference
	const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
	mediaQuery.addEventListener('change', (e) => {
		if (!localStorage.getItem('theme')) {
			root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
		}
	});
});
