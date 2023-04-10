fetch('<https://scholar.google.com/schhp?hl=en&as_sdt=0,22>')
	.then(response => response.text())
	.then(text => {
		const entries = text.split('@').slice(1);
		const journalArticles = entries.filter(entry => entry.includes('article')).map(parseEntry);
		const conferenceProceedings = entries.filter(entry => entry.includes('inproceedings')).map(parseEntry);

		const journalArticlesList = document.getElementById('journal-articles');
		journalArticles.forEach(entry => {
			const li = document.createElement('li');
			li.innerHTML = `${entry.authors}. (${entry.year}). <a href="${entry.url}">${entry.title}</a>. <cite>${entry.journal}</cite>, ${entry.volume}(${entry.number}), ${entry.pages}.`;
			journalArticlesList.appendChild(li);
		});

		const conferenceProceedingsList = document.getElementById('conference-proceedings');
		conferenceProceedings.forEach(entry => {
			const li = document.createElement('li');
			li.innerHTML = `${entry.authors}. (${entry.year}). ${entry.title}. In <cite>${entry.booktitle}</cite> (pp. ${entry.pages}). ${entry.address}: ${entry.publisher}.`;
			conferenceProceedingsList.appendChild(li);
		});
	})
	.catch(error => console.error(error));

function parseEntry(entry) {
	const fields = entry
