const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches) {
	document.documentElement.classList.add('motion-ready');

	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
	);

	document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((element) => {
		revealObserver.observe(element);
	});

	document.querySelectorAll<HTMLElement>('[data-depth]').forEach((element) => {
		element.addEventListener('pointermove', (event) => {
			const bounds = element.getBoundingClientRect();
			const x = (event.clientX - bounds.left) / bounds.width - 0.5;
			const y = (event.clientY - bounds.top) / bounds.height - 0.5;
			element.style.setProperty('--pointer-x', x.toFixed(3));
			element.style.setProperty('--pointer-y', y.toFixed(3));
		});

		element.addEventListener('pointerleave', () => {
			element.style.removeProperty('--pointer-x');
			element.style.removeProperty('--pointer-y');
		});
	});
}
