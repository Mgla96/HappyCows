/*I'm not entirely sure how any of these functions work as I copypastaed a good 99.89% of this.
there may be copious amounts of commenting as i try to figure out what was copied
Apologies to the poor soul who gets to maintain this spaghetti */
//$(function() esuivalent to $(document)
$(function() {
    /*jquery syntax. $(selector to find html elem).action() 
    .name = action on class of that name #name = action on element with id*/
    $('#exampleModal').on('show.bs.modal', function(e) {
      $('.modalTextInput').val('');
      let btn = $(e.relatedTarget); // e.related here is the element that opened the modal, specifically the row button
      let id = btn.data('id'); // this is how you get the of any `data` attribute of an element
      $('.saveEdit').data('id', id); // then pass it to the button inside the modal
    })
  
    $('.saveEdit').on('click', function() {
      let id = $(this).data('id'); // the rest is just the same
      saveNote(id);
      $('#exampleModal').modal('toggle'); // this is to close the modal after clicking the modal button
    })
  })
  function saveNote(id) {
    let text = $('.modalTextInput').val();
    $('.recentNote').data('note', text);
    console.log($('.recentNote').data('note'));
    console.log(text + ' --> ' + id);
  }

 //This $(document).ready outside is to prevent any jQuery code from running before the document is finished loading (is ready)
  $(document).ready(function () {
    var counter =0;
    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<td><input type="text" class="form-control" id="Num"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Name"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Perm"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Email"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Cows"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Health"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Money"'+counter+'/></td>';
        cols += '<td><input type="text" class="form-control" id="Other"'+counter+'/></td>';
        cols += '<td><input type="button" class="ibtnDel btn btn-danger btn-sm"  value="X"></td>';
        newRow.append(cols);
        $("table.table-bordered").append(newRow);
        counter++;
    });

    $("table.table-bordered").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter -= 1;
    });
});