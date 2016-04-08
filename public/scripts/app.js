
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

  //Repo Login Submit
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


  //Create New Repo
  $('#new-repo-btn').on('click', function(){
    // console.log('clicked submit: ', $(this).serialize());
    console.log('CREATE NEW REPO BTN Clicked! with:'+ $("#new-repo-btn").val());
    console.log('sending: ' + $("#repo-create").serialize());
      $.ajax({
      method: 'POST',
      url: '/api/repos',
      data: $("#repo-create").serialize(),
      success: firstGet,
      error: handleError
    });
  });

  //Rename Repo -- Modal Popup
  $('a#edit-repo-name').on('click', function(){
    console.log('rename repo link clicked!');
    $('#rn-modal').data('currentRepo_id');
    $('#rn-modal').modal('show');
    });

  //Rename Repo -- PUT /api/repos/
  $('#saveRepo').on('click', function(){
    console.log('post new repo name link clicked!');
    $('#rn-modal').data('currentRepo_id');
    console.log("sending: "+ $('#repoInput').val());
    $.ajax({
      method: 'PUT',
      url: '/api/repos/' + currentRepo_id,
      data: {name: $('#repoInput').val()},
      success: updateRepoName,
      error: handleError
    });
    $('#rn-modal').modal('hide');
    });


// TEMPORARY vvvvvvv
  renderSnippets();
  updateRepoName(repoName);
//TEMP       ^^^^^^^


});// END document on ready


function handleError(err){
  console.log("Error: " + err);
}



// Handles first GET request
function firstGet(repo){
  updateRepoName(repo.name);
  currentRepo_id = repo._id;
  $('#id-name').text("Repo ID: "+ currentRepo_id);
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
  $('#repo-name h1').text(repoName);
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
