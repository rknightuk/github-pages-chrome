chrome.runtime.onInstalled.addListener(function() {
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { urlContains: '.github.io' }
				})
				],
				actions: [ new chrome.declarativeContent.ShowPageAction() ]
			}
		]);
	});
});

chrome.pageAction.onClicked.addListener(function(tab){
	var url = generateGithubUrl(tab.url);
	chrome.tabs.create({ url: url });
});

var generateGithubUrl = function(currentUrl) {
	var username = currentUrl.split('//')[1];
	username = username.split('.')[0];
	var repo = currentUrl.split('io/')[1];
	repo = repo.split('/')[0]
	return githubUrl = 'https://github.com/' + username + '/' + repo + '/';
}