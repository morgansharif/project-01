
var currRepo = {};
var source;
var template;
var currSnippetId;
var snippetIndex;

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
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

  //modal button clicked-> DELETE Repo -- DELETE /api/repos/:id
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

  //modal button-> UPDATE Repo
  //form is update-snippet
  $('#save-snippet').on('click', function(){
    console.log('Save snippet link clicked!');
    console.log("sending: ", $('#update-snippet').serialize());
    $.ajax({
      method: 'PUT',
      url: "/api/repos/" + currRepo._id + "/snippets/" + currSnippetId,
      success: updateSnippet,
      data: $('#update-snippet').serialize(),
      error: handleError
    });
    $('#upd-snippet-modal').modal('hide');
  });



});// END document on ready


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////




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







} // end firstGet ////////////////////////////////////////////////////////////


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

function updateSnippet(updatedSnippet){
  console.log("updating snippet: "+currRepo.snippets[snippetIndex].title + " with: "+ updatedSnippet);
  currRepo.snippets[snippetIndex] = updatedSnippet;
  renderRepo();
}


//renders currRepo.snippets to handlebars (clears all elements and repopulates)
function renderRepo(){
  console.log("**now rendering snippets**");
  $("#repo-page").empty();
  var snippetHtml = template(currRepo);
  $("#repo-page").prepend(snippetHtml);

  //REPO PAGE EVENT LISTENERS

  //dropdown menu listeners:
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

  //snippet panel listeners
  $('a#snp-update').on('click', function updateSnippet(){
    console.log('UPDATE repo link clicked!');
    //pull uniqe repo.snippet._id from item
    currSnippetId = $(this).data('id');
    // get index val of panel (to pull data from repo.snippets[index])
    snippetIndex = $( '#'+currSnippetId ).index(".snippet-panel");
    console.log("snipped index =: "+ snippetIndex);
    //populate modal fields from repo.snippets[index]
    var currSnippet = currRepo.snippets[snippetIndex];
    $("#snippetTitle").attr("value", currSnippet.title);
    $("#snippetDesc").attr("value", currSnippet.desc);
    $("#snippetCode").val(currSnippet.code);
    //display modal
    $('#upd-snippet-modal').modal('show');
  });

}


// render(snippetSource, snippetTemplate);
