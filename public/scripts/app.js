var currRepo = {};  //current repo
var source;         //source tag id for snippet template
var template;       //handlebars compiler
var currSnippetId;  //_id of current snippet to edit/delete
var snippetIndex;   //index of current snippet in document and currRepo.snippets

//BEGIN document.ready
$(function(){

  //store handlebars Snippet template
  source = $('#repo-template').html();
  template = Handlebars.compile(source);

  //Repo Login Submit
  $('#login-btn').on('click', function(){
      $.ajax({
      method: 'GET',
      url: '/api/repos/'+ $("#repo-login").val(),
      success: firstGet
    });
  });

  $('#new-repo-lnk').on('click', function(){
    $(".jumbotron div.hidden").removeClass("hidden");
    $("#new-repo-lnk").addClass("hidden");
    });


  //CREATE New Repo
  $('#new-repo-btn').on('click', function(){
      $.ajax({
      method: 'POST',
      url: '/api/repos',
      data: $("#repo-create").serialize(),
      success: firstGet,
      error: handleError
    });
  });

  //----------Modal Buttons----------
  //UPDATE Repo -- PUT /api/repos/:id
  $('#saveRepo').on('click', function(){
    $.ajax({
      method: 'PUT',
      url: '/api/repos/' + currRepo._id,
      data: {name: $('#repoInput').val()},
      success: updateRepoName,
      error: handleError
    });
    $('#rn-modal').modal('hide');
  });

  //DELETE Repo
  $('#delete-repo').on('click', function(){
    $.ajax({
      method: 'DELETE',
      url: '/api/repos/' + currRepo._id,
      success: logout,
      error: handleError
    });
    $('#del-repo-modal').modal('hide');
  });

  //UPDATE Snippet
  $('#save-snippet').on('click', function(){
    $.ajax({
      method: 'PUT',
      url: "/api/repos/" + currRepo._id + "/snippets/" + currSnippetId,
      success: updateSnippet,
      data: $('#update-snippet').serialize(),
      error: handleError
    });
    //hide modal and clear form
    $('#upd-snippet-modal').modal('hide');
    $('#update-snippet')[0].reset();
  });

  //DELETE snippet
  $('#delete-snippet').on('click', function(){
    $.ajax({
      method: 'DELETE',
      url: "/api/repos/" + currRepo._id + "/snippets/" + currSnippetId,
      success: deleteSnippet,
      error: handleError
    });
    //hide modal and clear form
    $('#upd-snippet-modal').modal('hide');
    $('#update-snippet')[0].reset();
  });

});// END document.ready

function handleError(err){
  console.log("Error: " + err);
}

// Handles first GET request to populate page and global variables for this repo
function firstGet(repo){
  currRepo = repo;
  $('#id-name').text("Repo ID: "+ currRepo._id);
  currRepo.snippets = repo.snippets;
  renderRepo();
  togglePages();
}

function logout(){
  togglePages();
  $("#repo-page").empty();
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
  $('#repo-name').text(currRepo.name);
}

//updates local snippet list from ajax response and re-renders page
function updateSnippet(updatedSnippet){
  currRepo.snippets[snippetIndex] = updatedSnippet;
  renderRepo();
}

function addSnippet(newSnippet){
  currRepo.snippets.unshift(newSnippet);
  renderRepo();
}

function deleteSnippet(){
  currRepo.snippets.splice(snippetIndex, 1);
  renderRepo();
}

//renders currRepo.snippets to handlebars (clears all elements and repopulates)
function renderRepo(){
  $("#repo-page").empty();
  var snippetHtml = template(currRepo);
  $("#repo-page").prepend(snippetHtml);

  //Initialize Highlight.js (syntax highlighting)
  $('pre code').each(function(i, e) {
    hljs.highlightBlock(e);
  });

  //REPO PAGE EVENT LISTENERS
  //Header menu listeners:
  $('#edit-repo-name').on('click', function editRepoName(){
    $('#rn-modal').modal('show');
  });

  $('#logout').on('click', function logout(){
    togglePages();
    $("#repo-page").empty();
  });

  $('#del-repo').on('click', function del(){
    $('#del-repo-modal').modal('show');
  });

  $('#new-snippet').on('click', function del(){
    $.ajax({
    method: 'POST',
    url: '/api/repos/' + currRepo._id + '/snippets',
    success: addSnippet,
    error: handleError
  });
});

  //Update snippet edit button clicked
  $('a.snp-update').on('click', function updateSnippet(){
    //pull uniqe _id from button
    currSnippetId = $(this).data('id');
    // get index of current panel from matching snippet _id assigned as an ID
    snippetIndex = $( '#'+currSnippetId ).index(".snippet-panel");
    //populate modal fields from repo.snippets[index]
    var currSnippet = currRepo.snippets[snippetIndex];
    $("#snippetTitle").attr("value", currSnippet.title);
    $("#snippetDesc").attr("value", currSnippet.desc);
    $("#snippetCode").val(currSnippet.code);
    $('#upd-snippet-modal').modal('show');
  });

}//render repo
