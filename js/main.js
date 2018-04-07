// entry point
function main() {

	// declare variables
	let repos = [
		'eslint/eslint',
		'oakwood/front-end-questions',
		'babel/babel',
		'webpack/webpack',
		'storybooks/storybook',
		'facebook/react',
		'reactjs/redux',
		'expressjs/express'
	];

	// get references to elements
	const btnDecrement = document.querySelector('#btn-decrement');
	const btnIncrement = document.querySelector('#btn-increment');
	const btnOpenLogin = document.querySelector('#btn-open-login');
	const btnCloseLogin = document.querySelector('#btn-authorize-form-close');
	const btnLogin = document.querySelector('#btn-login');
	const overlay = document.querySelector('#overlay');
	const loginPopup = document.querySelector('#authorize-popup');

	// create an instance of Counter
	let counter = new Counter(0, repos.length - 1, '#counter');

	// create an instance of RepoInformation
	let repoInformation = new RepoInformation(repos, '#repo-name', '#repo-description', '#repo-stars');

	// add event listeners
	btnDecrement.addEventListener('click', counter.decrement.bind(counter));
	btnIncrement.addEventListener('click', counter.increment.bind(counter));
	btnOpenLogin.addEventListener('click', showLoginPopup);
	btnCloseLogin.addEventListener('click', closeLoginPopup);
	btnLogin.addEventListener('click', authorize);

	// update repo information whenever counter changes
	counter.onUpdate = repoInformation.update.bind(repoInformation);

	// show login button if repo info failed to fetch because of too many unauthorized requests
	repoInformation.onReachedRequestLimit = showLoginButton;

	// this shows the login button when user needs to log in to continue
	function showLoginButton() {
		btnOpenLogin.style.display = 'block';
	}

	function hideLoginButton() {
		btnOpenLogin.style.display = 'none';
	}

	// show login popup
	function showLoginPopup() {
		loginPopup.style.display = 'block';
		overlay.style.display = 'block';
	}

	// close login popup
	function closeLoginPopup() {
		loginPopup.style.display = 'none';
		overlay.style.display = 'none';
	}

	// simple authorization against github
	function authorize() {
		let username = document.forms[0].elements[0].value;
		let password = document.forms[0].elements[1].value;
		repoInformation.authorize.call(repoInformation, username, password);
		closeLoginPopup();
		hideLoginButton();
	}
}