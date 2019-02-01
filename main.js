const setContactEmailAddress = function () {
  const emailElement = document.querySelector('#email-link')
  const obfuscatedEmailAddress = 'abcdtabcdanabcdayabcdseabcdveabcdn@gmail.com'
  emailElement.innerHTML = obfuscatedEmailAddress.replace(/abcd/g, '')
  emailElement.setAttribute('href', 'mailto:'+obfuscatedEmailAddress.replace(/abcd/g, ''))
}
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  const sideNavOptions = {};
  const sideNavInstances = M.Sidenav.init(elems, sideNavOptions);
  var elems = document.querySelectorAll('.collapsible');
  const collapsibleOptions = {accordion: true};
  const collapsibleInstances = M.Collapsible.init(elems, collapsibleOptions)
  setContactEmailAddress();
});
