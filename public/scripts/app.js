
//HARDCODED SEED DATA
var repoName = "Morgan's Repo"; //hard coded
var snippetList = [];
//End hard coded data


  var source;
  var template;
  var currentRepo_id;

//document on ready
$(function(){
  console.log('app.js loaded');

  //store handlebars Snippet template
  source = $('#snippet-template').html();
  template = Handlebars.compile(source);

  //REPO LOGIN SUBMISSIONS
  $('#login-btn').on('click', function(){
    // console.log('clicked submit: ', $(this).serialize());
    console.log('REPO LOGIN BTN Clicked! with:'+ $("#repo-login").val() );
      $.ajax({
      method: 'GET',
      url: '/api/repos/'+ $("#repo-login").val(),
      success: firstGet
    });
  });

  $('#new-repo-lnk').on('click', function(){
    console.log('new repo link clicked!');
    $("div.hidden").removeClass("hidden");
    $("#new-repo-lnk").addClass("hidden");
    });


  //CREATE NEW REPO
  $('#new-repo-btn').on('click', function(){
    // console.log('clicked submit: ', $(this).serialize());
    console.log('CREATE NEW REPO BTN Clicked! with:'+ $("#new-repo-btn").val());
    console.log('sending: ' + $("#repo-create").serialize());
      $.ajax({
      method: 'POST',
      url: '/api/repos',
      data: $("#repo-create").serialize(),
      success: firstGet
    });
  });


// TEMPORARY vvvvvvv
  renderSnippets();
  updateRepoName(repoName);
//TEMP       ^^^^^^^


});// END document on ready




// Handles first GET request
function firstGet(repo){
  updateRepoName(repo.name);
  currentRepo_id = repo._id;
  snippetList = repo.snippets;
  console.log("snippets:", repo.snippets);
  renderSnippets();
  togglePages();
}



// Toggles visibility of repo and hero pages
function togglePages(){
  if($("#hero-page").hasClass("hidden")){
    $("#hero-page").removeClass("hidden");
    $("#repo-page").addClass("hidden");
  }else{
    $("#hero-page").addClass("hidden");
    $("#repo-page").removeClass("hidden");
  }
}

// Updates the header of the repo nav bar
function updateRepoName(newName){
  repoName = newName;
  $('#repo-name h1').empty();
  $('#repo-name h1').append(repoName);
}

//renders snippetList to handlebars (clears all elements and repopulates)
function renderSnippets(){
  console.log("**now rendering snippets**");
  $("#snippet-target").empty();
  snippetList.forEach(function(snippet){
    var snippetHtml = template(snippet);
    console.log('adding snippet:'+snippet);
    $("#snippet-target").prepend(snippetHtml);
  });
}


// render(snippetSource, snippetTemplate);
