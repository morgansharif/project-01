
//HARDCODED SEED DATA
var currRepo = {};
//End hard coded data

  var source;
  var template;

//document on ready
$(function(){
  console.log('app.js loaded');

  //store handlebars Snippet template
  source = $('#repo-template').html();
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
    $(".jumbotron div.hidden").removeClass("hidden");
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

  //MODAL Rename Repo -- PUT /api/repos/
  $('#saveRepo').on('click', function(){
    console.log('post new repo name link clicked!');
    $('#rn-modal').data('currRepo._id');
    console.log("sending: "+ $('#repoInput').val());
    $.ajax({
      method: 'PUT',
      url: '/api/repos/' + currRepo._id,
      data: {name: $('#repoInput').val()},
      success: updateRepoName,
      error: handleError
    });
    $('#rn-modal').modal('hide');
    });


// TEMPORARY vvvvvvv
  // renderRepo();
  // updateRepoName(repoName);
//TEMP       ^^^^^^^


});// END document on ready


function handleError(err){
  console.log("Error: " + err);
}

// Handles first GET request to populate page and global variables
function firstGet(repo){
  currRepo = repo;
  // updateRepoName(repo.name);
  $('#id-name').text("Repo ID: "+ currRepo._id);
  currRepo.snippets = repo.snippets;
  console.log("snippets:", repo.snippets);
  renderRepo();
  togglePages();



//REPO PAGE EVENT LISTENERS

  //Rename Repo -- Modal Popup
  $('a#edit-repo-name').on('click', function(){
    console.log('rename repo link clicked!');
    // $('#rn-modal').data('currRepo._id');
    $('#rn-modal').modal('show');
    });







} // REPO LISTENERS

function logout(){
  togglePanes();
  $("#repo-target").empty();
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
  currRepo.name = newName;
  $('#repo-name h1').text(currRepo.name);
}

//renders currRepo.snippets to handlebars (clears all elements and repopulates)
function renderRepo(){
  console.log("**now rendering snippets**");
  $("#repo-target").empty();
  // currRepo.snippets.forEach(function(snippet){
    var snippetHtml = template(currRepo);
    // console.log('adding snippet:'+snippet);
    $("#repo-page").prepend(snippetHtml);
  // });
}


// render(snippetSource, snippetTemplate);
