
var currRepo = {};
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

  //modal button-> RENAME Repo -- PUT /api/repos/:id
  $('#saveRepo').on('click', function(){
    console.log('post new repo name link clicked!');
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

  //modal button-> DELETE Repo -- DELETE /api/repos/:id
  $('#delete-repo').on('click', function(){
    console.log('post new repo name link clicked!');
    $.ajax({
      method: 'DELETE',
      url: '/api/repos/' + currRepo._id,
      success: logout,
      error: handleError
    });
    $('#del-repo-modal').modal('hide');
  });

});// END document on ready


function handleError(err){
  console.log("Error: " + err);
}

// Handles first GET request to populate page and global variables for this repo
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
  $('a#edit-repo-name').on('click', function editRepoName(){
    console.log('RENAME repo link clicked!');
    // $('#rn-modal').data('currRepo._id');
    $('#rn-modal').modal('show');
    });

  $('a#logout').on('click', function logout(){
    console.log('LOGOUT link clicked!');
    togglePages();
    $("#repo-page").empty();
  });

  $('a#del-repo').on('click', function del(){
    console.log('DELETE repo link clicked!');
    $('#del-repo-modal').modal('show');
  });

  $('a#snp-update').on('click', function updateSnippet(){
    console.log("this.data.id:", $(this).data('id'));
    $('#update-snippet').data($(this).data());
    console.log('DELETE repo link clicked!');
    $('#upd-snippet-modal').modal('show');
  });



} // end firstGet

function logout(){
  togglePages();
  $("#repo-page").empty();
}

// Toggles visibility of repo and hero pages
function togglePages(){
  if($("#hero-page").hasClass("hidden")){
    console.log("hero ON && repo OFF");
    $("#hero-page").removeClass("hidden");
    $("#repo-page").addClass("hidden");
  }else{
    console.log("hero OFF && repo ON");
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
  $("#repo-page").empty();
  // currRepo.snippets.forEach(function(snippet){
    var snippetHtml = template(currRepo);
    // console.log('adding snippet:'+snippet);
    $("#repo-page").prepend(snippetHtml);
  // });
}


// render(snippetSource, snippetTemplate);
