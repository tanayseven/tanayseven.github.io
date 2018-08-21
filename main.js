document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  const sideNavOptions = {};
  const sideNavInstances = M.Sidenav.init(elems, sideNavOptions);
  var elems = document.querySelectorAll('.collapsible');
  const collapsibleOptions = {accordion: true};
  const collapsibleInstances = M.Collapsible.init(elems, collapsibleOptions)
  const contact_form_request=new XMLHttpRequest();
  contact_form_request.open('get','/contact_form.txt');
  contact_form_request.send();
  contact_form_request.onload=function(){document.getElementById('contact').innerHTML=contact_form_request.responseText}
});
